import { updateGoal } from "../infrastructure/goalRepository";

export function calculateGoal(goals, budget, token) {
    const { basics, expenses } = budget;

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

export function calculateGoalByBudget(goal, budget, token) {
    const { basics, expenses } = budget[0];

    if (goal.type === 'saving') {
        const savings = basics.save;

        goal.current = savings;

        if (goal.value >= savings) {
            goal.status = 'completed';
        } else if (savings > 0) {
            goal.status = 'in_progress';
        } else {
            goal.status = 'pending';
        }
    }

    if (goal.type === 'budget') {
        const expense = expenses.filter((exp) => exp.expense === goal.subtype);
        if (expense.length > 0) {
            goal.current = expense[0].amount;
            if (expense[0].amount >=  goal.value) {
                goal.status = 'completed';
            } else if (expense[0].amount > 0) {
                goal.status = 'in_progress';
            } else {
                goal.status = 'pending';
            }
        }
    }

    updateGoal(token, goal);
}