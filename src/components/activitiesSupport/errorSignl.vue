<!-- 异常信号提取 -->
<template>
  <list :data='errorInfo' :showTitle='showTitle'></list>
</template>
<script>
import List from "base/listDetail";

export default {
  props: {
    errorInfo: {
      type: Array
    }
  },
  components: {
    List
  },
  data() {
    return {
      showTitle: true
    };
  }
};
</script>

