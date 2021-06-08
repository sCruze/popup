<template>
  <div
    class="modal_wrapper"
    :class="{ showCalculatingTotal: showCalculatingTotal }"
  >
    <div class="modal_header">
      <h1>Налоговый вычет</h1>
      <span class="modal_close" @click="hideModalTaxDeduction"></span>
    </div>

    <p class="modal_description">
      Используйте налоговый вычет чтобы погасить ипотеку досрочно. Размер
      налогового вычета составляет не более 13% от своего официального годового
      дохода.
    </p>

    <div class="modal_form">
      <p class="modal_form-title">Ваша зарплата в месяц</p>
      <div class="input__block">
        <input
          type="text"
          placeholder="Введите данные"
          @blur="blurInput"
          @input="changeInput"
        />
      </div>
      <button
        @click="checkingFormCompletion"
      >
        Рассчитать
      </button>
    </div>

    <CalculatingTotal
      v-show="showCalculatingTotal"
    />

    <div class="modal_selector-tax">
      <p>Что уменьшаем?</p>
      <div class="modal_selector-tax-list-btn">
        <button class="btn-payment btn-active">Платеж</button>
        <button class="btn-term">Срок</button>
      </div>
    </div>

    <button class="modal_add-tax">Добавить</button>
  </div>
</template>

<script>
import CalculatingTotal from "./ComponentForTaxDeducation/CalculatingTotal";

import { mapGetters } from "vuex"

export default {
  name: "modal_tax-deduction",
  data: () => ({
    showCalculatingTotal: false
  }),
  methods: {
    // Прописываем метод со своим событием, которе передается в родительский компонент
    hideModalTaxDeduction() {
      this.$emit("hideModalTaxDeduction");
    },
    // Метод, который реагирует, если input стал не активен и если там есть тест, тогда добовлять inline стиль
    // color: #000000 - что значит цвет текста черный
    blurInput(e) {
      const target = e.target;

      // Если в input.value не пустая строка
      if (target.value !== "") {
        // Добовляем текущему элементу новый inline стиль
        target.style.color = "#000000";

        // Удаляем класс input__error у родительского блока
        target.parentElement.classList.remove("input__error");

        // Если в родительском элементе, дочерних элементов больше 1
        // удаляем последний дочерний элемент
        if (target.parentElement.children.length > 1) {
          target.parentElement.removeChild(target.parentElement.children[1]);
        }
      } else if (
        target.value == "" &&
        target.parentElement.children.length < 2
      ) {
        // Если в инпуте ничего нет, добовляем новый класс для input и новый элемент с сообщением
        const elementMessageError = document.createElement("span");

        // Добовляем нашему новому элементу inline стили
        elementMessageError.style.cssText = `
          font-style: normal;
          font-weight: normal;
          font-size: 10px;
          line-height: 12px;
          margin-top: -4px;
        `;

        // Добовляем родительскому элементу новый класс
        e.target.parentElement.classList.add("input__error");

        // Добовляем текст в наш созданный блок
        elementMessageError.textContent = "Поле обязательно для заполнения";

        // В родительский блок, добовляем наш созданный блок
        e.target.parentElement.append(elementMessageError);
      }
    },
    changeInput(e) {
      const target = e.target;
      target.parentElement.classList.remove("input__error");

      // Обрабатываем событие нажатие на клавиатуру, если не пустая строка и если нажата буква, то не добовлять в input
      // добовлять только цифры
      if (target.value !== "") {
        target.addEventListener("keyup", () => {
          target.value = `${target.value.replace(/[^\d]/g, "")}`;
        });
      }

      // Если дочерних элементов больше 1, то удалять последний дочерний элемент
      if (target.parentElement.children.length > 1) {
        target.parentElement.removeChild(target.parentElement.children[1]);
      }
    },
    // Метода проверки заполнности формы
    checkingFormCompletion() {
      // Находм компонент input, в который пользователь вводит зарплату для расчета
      const inputSalary = document.querySelector('.input__block').children[0]

      // Если форма не пуста, показывать блок с расчетом
      if (inputSalary.value !== '') {
        this.showCalculatingTotal = true

        // С помощью метода commit, вызываем мутацию и передаем в нее зарплату
        this.$store.commit('calculationTaxDeduction', inputSalary.value)

        // Переменная с путем до блока modal_wrapper
        const modalWindow = document.querySelector('.modal_wrapper')

        // Добовление нового класса модальному окну
        modalWindow.classList.add('modal_wrapper-min-height')

        // Узнаем количество полученных вычетов
        const numberDeductionBlocks = this.showAllDeduction.length

        // Добовляем новый inline стиль высоты блока модального окна
        modalWindow.style.height = `${476 + 34 + (numberDeductionBlocks * 57)}px`
      } else if (inputSalary.value === '') {
        // Переменная с путем до блока modal_wrapper
        const modalWindow = document.querySelector('.modal_wrapper')

        this.showCalculatingTotal = false

        modalWindow.style = ''
      }
    }
  },
  components: {
    CalculatingTotal
  },
  computed: {
    ...mapGetters(['showAllDeduction'])
  }
};
</script>

<style lang="scss" scoped>
@import "../style/ModalTaxDeduction";
</style>
