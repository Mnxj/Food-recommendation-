<template>
    <!-- 首页 -->
    <div class="ushoye">
        <!-- 介绍 -->
        
        <div class="title">
            <h1 class="titleh1">Welcome to LITM</h1>
            <p>“Living in the moment，Cherish the present”<br>
                希望小站能化作你青春中的一抹，
                懂你所思，想你所想！保证为你推荐最优的方案。
                <br>
                下面是我们的热门推荐</p>
        </div>
        <!-- 按钮 -->
        <usMs>
        </usMs>
        
    </div>
</template>
<script>
import usMs from '../user/usMS.vue'
export default {
    data(){
        return{
           
        }
    },
    components:{
        usMs
    }
}
</script>
<style lang="scss" scoped>
.ushoye{
    margin-top: -5px;
    background-color: #FFF;
    text-align: center;
    padding-top: 80px;
    .title{
      letter-spacing:7px;
      padding-bottom: 40px;
      .titleh1{
          padding-bottom: 40px;
      }
    }
   
  
}
</style>
