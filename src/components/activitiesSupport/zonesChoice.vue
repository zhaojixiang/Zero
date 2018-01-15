<!-- 区域选择 -->
<template>
  <list :data='zonesData' :isClick='isClick' @deleteItem='deleteItem' @edit_rate='edit_rate' @edit_part='edit_part'></list>
</template>
<script>
import List from "base/listDetail";

export default {
  props: {
    zonesData: {
      type: Array
    }
  },
  components: {
    List
  },
  methods:{
    deleteItem(item) {
      this.$emit('deleteItem',item)
    },
    edit_rate(item) {
      this.$emit('edit_rate',item)
    },
    edit_part(item) {
      this.$emit('edit_part',item)
    }
  },
  data() {
    return {
      isClick: true
    };
  }
};
</script>

