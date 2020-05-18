<template>
  <div>
     <!-- 头部 -->
    <utop></utop>
    <div class="Fback">
        <div class="block">
            <p class="font1">意见反馈</p>
            <hr>
            <div class="text">
              <div style="margin: 20px 0;"></div>
              <el-input type="textarea" :rows="7" placeholder="请输入内容" v-model="ruleForm.textarea" maxlength="50" show-word-limit></el-input>
               
            </div>
            <el-button @click="sumbit" class="tijiao" type="primary">提交<i class="el-icon-upload el-icon--right"></i></el-button>

        </div>
    </div>
  </div>
</template>

<script>
import utop from '../relesase/utop'
export default {
     data() {
    return {
      ruleForm:{
        anumber:'',
        email:'',
        textarea: '',
      }
      
    }
    
  },
   methods: {
     sumbit(){
        this.ruleForm.anumber=this.$store.getters.getUser.anumber;
        this.ruleForm.email=this.$store.getters.getUser.emeil;
        this.postRequest('/Mail/feedback',this.ruleForm).then(
                resp=>{
                  console.log(resp)
                })
     }
   },
   components: {
      utop
  }

}
</script>

<style lang="scss" scoped>
.Fback{
     background:url(../../../imgas/databeijing.jpg) no-repeat;
    width: 1024px;
    height: 600px;
    margin: auto;
      .block{
        padding-top: 100px;
        background-color: #ffffff50;
        margin: auto;
        width: 850px;
        height: 600px;
        .font1{
            font-size: 30px;
            font-weight:500;
            color: #000;
            padding-left: 30px;
            
        }
        .text{
               width: 700px;
               margin: auto;
        }
        .tijiao{
            margin-top: 70px;
            margin-left: 330px;
        }
      }
}

</style>
