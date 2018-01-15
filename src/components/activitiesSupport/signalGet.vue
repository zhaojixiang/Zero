<!-- 信号提取 -->
<template>
  <list :data='info'></list>
</template>
<script>
import List from "base/listDetail";

export default {
  props: {
    info: {
      type: Array
    }
  },
  components: {
    List
  }
};
</script>

