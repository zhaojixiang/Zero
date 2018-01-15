<!-- 活动保障-list列表 -->
<template>
  <list :data='data' @deleteItem='deleteItem'></list>
</template>
<script>
import List from 'base/listDetail'

export default {
    props:{
        data:{
            type:Array,
            default:function() {
                return []
            }
        }
    },
    methods:{
        deleteItem(item) {
            this.$emit('deleteItem',item);
        }
    },
    components:{
        List
    }
}
</script>

