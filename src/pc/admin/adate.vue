<template>
       <el-calendar class="kun"  v-model="value">
       </el-calendar>
</template>

<script>
export default {
    data() {
      return {
        value: new Date()
      }
    }
}
</script>
<style lang="scss" scoped>
.kun{
  margin-left: 16%;
  width: 700px;
   height: 700px;
}

</style>

