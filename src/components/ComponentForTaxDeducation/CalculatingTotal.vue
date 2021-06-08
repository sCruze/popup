<template>
  <div
    class="models__deposit-funds"
  >
    <p class="title__deposit">Итого можете внести в качестве досрочных:</p>
    <div >
      <div
        v-for="(item, key) in showAllDeduction" :key=key.toString()
        class="models__deposit"
      >
        <input type="checkbox" class="custom-checkbox" :id="`checked-payment-` + key" />
        <label :for="`checked-payment-` + key"></label>
        <p>{{item}} рублей <span class="text-grey">в {{key + 1}}-йы год</span></p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "CalculatingTotal",
  computed: {
    ...mapGetters(["showAllDeduction"])
  }
};
</script>

<style lang="scss" scoped>
@import "../../style/ModalTaxDeduction";
</style>