<template>
  <div>
    <!-- 头部 -->
    <utop></utop>
    <div class="data">
        <!-- 时间戳表示更新的日志 -->
        <div class="block">
         <el-timeline>
           <el-timeline-item v-for="item in journal" :key="item.id" :timestamp="item.jdate" placement="top">
            <el-card>
            <h4>{{item.jtext}}</h4>
            <p>admin:{{item.jname}}&nbsp;&nbsp;提交于 {{item.jdate}}</p>
            </el-card>
           </el-timeline-item>
         </el-timeline>
         <div class="Fye">
           <el-pagination   @current-change="handleCurrentChange" :page-size="5" :total="sum" layout="prev, pager, next"> </el-pagination></div>
        </div>
    </div>
  </div>
</template>

<script>
import utop from '../relesase/utop'
export default {
   data(){
       return{
           journal:[],
           sum:0,
           
       }
   },
   created(){
    this.getJournl();
    this.getCount();
  },
  methods: {
    getCount(){
        this.getRequest('/journal/selcetCount').then(
             resp=>{
                 var data=resp.data;
                 this.sum=data.data;
             })
    },
    getJournl(){
        this.postRequest('/journal/SelectJ',{count:1}).then(
             resp=>{
                 var data=resp.data;
                 this.journal=data.data;

        })
    },
    handleCurrentChange(val){
       this.postRequest('/journal/SelectJ',{count:val}).then(
             resp=>{
                 var data=resp.data;
                 this.journal=data.data;

        })
    }
  },
  components: {
      utop
  }

}
</script>

<style lang="scss" scoped>
.data{
    background:url(../../../imgas/databeijing.jpg) no-repeat;
    width: 1024px;
    height: 1000px;
    margin: auto;
    .block{
        padding-top: 100px;
        background-color: #ffffff50;
        padding-right: 60px;
        margin: auto;
        width: 850px;
        height: 1000px;
        .Fye{
            padding-top: 30px;
            margin-left: 300px;
        }
    }
}
</style>
