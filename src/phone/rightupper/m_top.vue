<template>
    <div class="m_top">
      <slot></slot>
			<a class="mui-icon mui-icon-left-nav" @click="getBack"></a>
    </div>
</template>
<script>
export default {
    created(){
         $(".mui-backdrop.mui-active").css("opacity","0");
       $(".mui-backdrop").remove();
},
methods: {
     getBack(){
      this.$router.go(-1)
    }
},
}
</script>
<style lang="scss" scoped>
.m_top{
  padding-bottom: 20px;
}
</style>
