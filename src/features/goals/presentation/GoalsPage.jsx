import { ArrowLeft, CalendarDays, Check, Goal, Plus, PiggyBank, Plane, ShieldCheck, Target, Trash2 } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { PublicLayout } from '../../../shared/presentation/PublicLayout.jsx';
import { Button } from '../../../shared/presentation/Button.jsx';

const goals=[{name:'Viaje a Europa',icon:Plane,current:3400000,target:8000000,date:'Dic 2025',tone:'purple'},{name:'Fondo de emergencia',icon:ShieldCheck,current:1800000,target:5000000,date:'Ago 2025',tone:'green'},{name:'Nueva laptop',icon:Target,current:2200000,target:3500000,date:'Sep 2025',tone:'orange'}];

const money=new Intl.NumberFormat('es-CO',{style:'currency',currency:'COP',maximumFractionDigits:0});

export const GoalsPage = () => {
    const {userId} = useParams();
    return (
        <PublicLayout>
            <main className="goals-page">
                <div className="goals-heading">
                    <div>
                        <Link className="back-link" to={`/app/users/${userId}/dashboard`}><ArrowLeft size={16}/> Dashboard</Link>
                        <h1>Mis metas financieras</h1>
                        <p>Convierte tus planes en objetivos alcanzables.</p>
                    </div>
                    <Button type="button"><Plus size={18}/> Nueva meta</Button>
                </div>
                <section className="goals-summary">
                    <article>
                        <span><Goal size={18}/> Metas activas</span>
                        <strong>3</strong>
                        <small>2 en progreso</small>
                    </article>
                    <article>
                        <span><PiggyBank size={18}/> Ahorrado</span>
                        <strong>{money.format(7400000)}</strong>
                        <small>de {money.format(16500000)}</small>
                    </article>
                    <article>
                        <span><Check size={18}/> Completadas</span>
                        <strong>4</strong>
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
                    {goals.map(({name,icon:Icon,current,target,date,tone})=>{
                        const percent=Math.round(current/target*100);
                        return (
                            <article className="goal-card" key={name}>
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
                            </article>
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
        </PublicLayout>
    )
}