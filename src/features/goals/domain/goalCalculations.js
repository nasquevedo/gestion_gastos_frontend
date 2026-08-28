import { updateGoal } from "../infrastructure/goalRepository";

export function calculateGoal(goals, budget, token) {
    const basics = budget?.basics;
    const expenses = budget?.expenses;

    for (let index in goals) {
        if (goals[index].type === 'saving') {
            const savings = basics.save;

            if (goals[index].current !== savings) {
                goals[index].current = savings;
                if (savings >= goals[index].value) {
                    goals[index].status = 'completed';
                } else if (savings > 0) {
                    goals[index].status = 'in_progress';
                } else {
                    goals[index].status = 'pending';
                }
                updateGoal(token, goals[index]);
            }
        }

        const expense = expenses.filter((exp) => exp.expense === goals[index].subtype);
        if (expense.length > 0) {
            if (expense[0].amount !== goals[index].current ) {
                goals[index].current = expense[0].amount;
                if (expense[0].amount >= goals[index].value) {
                    goals[index].status = 'completed';
                } else if (expense[0].amount > 0) {
                    goals[index].status = 'in_progress';
                } else {
                    goals[index].status = 'pending';
                }
                updateGoal(token, goals[index]);
            }
        }
    }
}