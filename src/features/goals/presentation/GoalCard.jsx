import { Icon, Plus, Trash2 } from "lucide-react";


const money=new Intl.NumberFormat('es-CO',{style:'currency',currency:'COP',maximumFractionDigits:0});

export const GoalCard = ({ name, date, target }) => {
    const tone = "green";
    const current = 0;
    const percent = 0;

    return  (
        <article className="goal-card" key={name}>
            <div className={`goal-icon goal-icon--${tone}`}>
                {/*<Icon size={22}/>*/}</div><div className="goal-card__top">
                <div>
                    <h3>{name}</h3>
                    <p>Fecha objetivo: {date}</p>
                </div>
                {/*<button className="icon-button icon-button--neutral" aria-label={`Eliminar ${name}`}><Trash2 size={17}/></button>*/}
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
                {/*<button className="goal-add"><Plus size={15}/> Añadir ahorro</button>*/}
            </div>
        </article>
    )
}