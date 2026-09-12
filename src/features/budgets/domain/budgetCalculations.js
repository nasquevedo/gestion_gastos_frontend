export function calculateBudgetSummary(budget) {
  const salary = Number(budget?.basics?.salary ?? 0);
  const savings = Number(budget?.basics?.save ?? 0);
  const additionalIncome = Number(budget?.basics?.additionalIncome ?? 0);
  const cash = Number(budget?.basics?.cash ?? 0);
  const fixedExpenses = sumAmounts(budget?.expenses, 'amount');
  const additionalExpenses = sumAmounts(budget?.additionals, 'amount');
  const income = salary + additionalIncome;
  const available = income - savings - cash - fixedExpenses - additionalExpenses;

  return {
    income,
    savings,
    fixedExpenses,
    additionalExpenses,
    available,
    cash
  };
}

export function calculateBudgetSummaryTotals(budgets) {
  return budgets.reduce((totals, budget) => {
    const summary = calculateBudgetSummary(budget);
    totals.income += summary.income;
    totals.savings += summary.savings;
    totals.fixedExpenses += summary.fixedExpenses;
    totals.additionalExpenses += summary.additionalExpenses;
    totals.available += summary.available;
    totals.cash = summary.cash;
    return totals;
  }, { income: 0, savings: 0, fixedExpenses: 0, cash: 0, additionalExpenses: 0, available: 0 });
}

export function chartSegments(budget) {
  const summary = calculateBudgetSummary(budget);
  const parts = [
    { label: 'Disponible', value: Math.max(summary.available, 0), color: 'var(--color-secondary)' },
    { label: 'Ahorro', value: summary.savings, color: 'var(--color-primary)' },
    { label: 'Gastos fijos', value: summary.fixedExpenses, color: 'var(--color-tertiary)' },
    { label: 'Adicionales', value: summary.additionalExpenses, color: 'var(--color-outline)' },
  ].filter((part) => part.value > 0);

  const total = parts.reduce((sum, part) => sum + part.value, 0) || 1;
  let cursor = 0;

  return parts.map((part) => {
    const percent = (part.value / total) * 100;
    const segment = { ...part, percent, start: cursor, end: cursor + percent };
    cursor += percent;
    return segment;
  });
}

function sumAmounts(items = [], key) {
  return items.reduce((sum, item) => sum + Number(item?.[key] ?? 0), 0);
}
