export default {
  actions: {},
  mutations: {
    // Прописываем мутацию, в которой обрабатываем логику налогового вычета
    calculationTaxDeduction(state, salary) {

      state.taxDeductionYear = []

      // Максимальный вычет
      // Определяем переменную с максимальной суммой вычета
      let maximumDeduction = 260000

      // Переменная, в которую записывается налоговый вычет за 1 год
      const deductionAmountYear = (salary * 12) * 0.13

      // Пока сумма максимального вычета больще 0, выполняем цикл
      while (maximumDeduction > 0) {
        // Если Максимальная сумма вычета, будет меньше чем вычет за год
        // тогда записываем остаток от максимального вычета в state
        if (maximumDeduction <= deductionAmountYear) {
          state.taxDeductionYear.push(maximumDeduction)
          return
        }

        // Добовляем вычет за год в state
        state.taxDeductionYear.push(deductionAmountYear)

        // Вычетаем из суммы максимального вычета, вычет за 1 год, каждый цикл
        maximumDeduction -= deductionAmountYear
      }
    }
  },
  state: {
    // Состояние в котором хранятся все годовые вычеты
    taxDeductionYear: []
  },
  getters: {
    // Обрабатываем state и передаем в компонент
    showAllDeduction(state) {
      return state.taxDeductionYear
    }
  }
}