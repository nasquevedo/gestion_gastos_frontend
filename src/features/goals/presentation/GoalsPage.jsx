import { ArrowLeft, CalendarDays, Check, Goal, Plus, PiggyBank, Plane, ShieldCheck, Target, Trash2 } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { PublicLayout } from '../../../shared/presentation/PublicLayout.jsx';
import { Button } from '../../../shared/presentation/Button.jsx';
import { useEffect, useState } from 'react';
import * as goalRepository from '../infrastructure/goalRepository.js';
import { useAuth } from '../../auth/presentation/useAuth.js';
import { GoalFormModal } from './GoalFormModal.jsx';
import { useI18n } from '../../../shared/i18n/I18nProvider.jsx';
import { GoalCard } from './GoalCard.jsx';

const goals=[{name:'Viaje a Europa',icon:Plane,current:3400000,target:8000000,date:'Dic 2025',tone:'purple'},{name:'Fondo de emergencia',icon:ShieldCheck,current:1800000,target:5000000,date:'Ago 2025',tone:'green'},{name:'Nueva laptop',icon:Target,current:2200000,target:3500000,date:'Sep 2025',tone:'orange'}];

const money=new Intl.NumberFormat('es-CO',{style:'currency',currency:'COP',maximumFractionDigits:0});

export const GoalsPage = () => {
    const { userId } = useParams();
    const [ goals, setGoals] = useState([])
    const [ status, setStatus ] = useState({ loading: false, error: '' });
    const { token, user } = useAuth();
    const [ isModalOpen, setIsModalOpen ] = useState(false); 
    const { t } = useI18n();
    const [ savings, setSavings ] = useState({ target: 0, current: 0});
    const [ successed, setSuccessed ] = useState(0);
    const [ inProgress, setInProgress ] = useState(0); 

    const effectiveUserId = userId === 'me' ? user?.id : userId;

    const loadGoals = async () => {
        setStatus({ loading: true, error: '' });

        try {
            const [ goalsResponse ] = await Promise.all([
                goalRepository.getGoals(effectiveUserId, token)
            ]);

            const data = goalsResponse.goals;

            const saving = data.filter((goal) => goal.type === 'saving');
            const completed = data.filter((goal) => goal.status === 'completed');
            const progress = data.filter((goal) => goal.status === 'in_progress');


            savings.length === 0 && setSavings({current: saving[0].current, target: saving[0].value});
            setSuccessed(completed.length);
            setInProgress(progress.length);

            setGoals(data);
            setStatus({ loading: false, error: '' });
        } catch {
            setStatus({ loading: false, error: 'Error al obtener las metas' });
        }
    }

    useEffect(() => {
        loadGoals();
    }, [effectiveUserId, token]);

    const submitGoal = async (goal) => {
        await goalRepository.createGoal(token, goal);
        setIsModalOpen(false);
        await loadGoals();
    }

    return (
        <PublicLayout>
            <main className="goals-page">
                <div className="goals-heading">
                    <div>
                        <Link className="back-link" to={`/app/users/${userId}/dashboard`}><ArrowLeft size={16}/> Dashboard</Link>
                        <h1>{ t('goal.title')}</h1>
                        <p>{ t('goal.subtitle')}</p>
                    </div>
                    <Button type="button" onClick={() => setIsModalOpen(true)}><Plus size={18}/> Nueva meta</Button>
                </div>
                <section className="goals-summary">
                    <article>
                        <span><Goal size={18}/> Metas activas</span>
                        <strong>{ goals.length }</strong>
                        <small>{ inProgress } en progreso</small>
                    </article>
                    <article>
                        <span><PiggyBank size={18}/> Ahorrado</span>
                        <strong>{money.format(savings.current)}</strong>
                        <small>de {money.format(savings.target)}</small>
                    </article>
                    <article>
                        <span><Check size={18}/> Completadas</span>
                        <strong>{successed}</strong>
                        <small>Este año</small>
                    </article>
                </section>
                <div className="goals-toolbar">
                    <h2>Tus objetivos</h2>
                    <select>
                        <option>Todas las metas</option>
                        <option>En progreso</option>
                        <option>Completadas</option>
                    </select>
                </div>
                <section className="goals-grid">
                    {goals.map(({name,value,current,objective_date})=>{
                        const percent=Math.round(current/value*100);
                        return (
                            <GoalCard key={name} name={name} target={value} date={objective_date} current={current} percent={percent} />
                            /*<article className="goal-card" key={name}>
                                <div className={`goal-icon goal-icon--${tone}`}>
                                    <Icon size={22}/></div><div className="goal-card__top">
                                    <div>
                                        <h3>{name}</h3>
                                        <p>Fecha objetivo: {date}</p>
                                    </div>
                                    <button className="icon-button icon-button--neutral" aria-label={`Eliminar ${name}`}><Trash2 size={17}/></button>
                                </div>
                                <div className="goal-card__amount">
                                    <strong>{money.format(current)}</strong>
                                    <span>de {money.format(target)}</span>
                                </div>
                                <div className="progress progress--large">
                                    <span style={{width:`${percent}%`}}/>
                                </div>
                                <div className="goal-card__footer">
                                    <span>{percent}% completado</span>
                                    <button className="goal-add"><Plus size={15}/> Añadir ahorro</button>
                                </div>
                            </article>*/
                        )
                    })}
                </section>
                <section className="goals-tip">
                    <CalendarDays size={22}/>
                    <div>
                        <strong>Consejo de FinTrack</strong>
                        <p>Divide tus metas grandes en aportes mensuales automáticos para hacerlas más fáciles de alcanzar.</p>
                    </div>
                </section>
            </main>
            { isModalOpen && <GoalFormModal onClose={ () => setIsModalOpen(false) } onSubmit={submitGoal} />}
        </PublicLayout>
    )
}