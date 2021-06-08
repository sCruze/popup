<template>
  <div class="home">
    <button class="home__tax-deduction-btn" @click="showModalTaxDeduction">
      Налоговый вычет
    </button>
    <ModalTaxDeduction
      @hideModalTaxDeduction="showModalTaxDeduction"
      v-show="tax_deduction"
    />
  </div>
</template>

<script>
// @ is an alias to /src
import ModalTaxDeduction from "@/components/ModalTaxDeduction.vue";

export default {
  name: "Home",
  data: () => ({
    tax_deduction: false,
  }),
  methods: {
    // Данный метод изменяет tax_deduction на противоположное значение
    // и срабатывает как по нажатию на кнопку "Налоговый вычет", так и на Х у модального окна
    showModalTaxDeduction() {
      this.tax_deduction = !this.tax_deduction;

      // Если tax_deduction = true, добвляем класс, который изменяет цветв background
      // иначе удаляет этот класс
      if (this.tax_deduction) {
        this.$el.classList.add("home__background-active-modal");
      } else {
        this.$el.classList.remove("home__background-active-modal");
      }
    },
  },
  components: {
    ModalTaxDeduction,
  },
};
</script>

<style lang="scss" scoped>
@import "../style/variables";

.home {
  display: flex;
  min-height: 100vh;
  background: $background-main-default;

  .home__tax-deduction-btn {
    position: fixed;
    width: $normal-width-button;
    height: $normal-height-button;
    background: transparent;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 16px 32px;
    top: 50%;
    margin-top: -($normal-height-button / 2);
    left: 50%;
    margin-left: -($normal-width-button / 2);
    border-radius: 6px;
    border: 1px solid #fff;
    color: #ffffff;
    cursor: pointer;
    transition: 0.3s ease-in-out;
  }

  .home__tax-deduction-btn:hover {
    background: #fff;
    color: #000;
  }
}

.home__background-active-modal {
  background: $background-active-modal;
}
</style>
