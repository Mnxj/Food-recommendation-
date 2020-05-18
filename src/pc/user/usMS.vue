<template>
<div> 
    <div class="center">
      <button class="button"  @click="getRelease(1)">美食</button>
      <!-- <button class="button" @click="release.rtype='店铺'"></button> -->
      <button class="button" @click="getRelease(2)">景点</button>
    </div>

    <div class="usMs" >
       <!-- 店铺信息遍历 -->
       <span v-if="Object.keys(this.listrelease).length==0">
         <p>该地区暂时没有数据</p>
           <p>&nbsp;</p>
         <p>&nbsp;</p>
           <p>&nbsp;</p>
         <p>&nbsp;</p>
          <p>👇</p>
           <p>&nbsp;</p>
         <p>&nbsp;</p>
           <p>&nbsp;</p>
         <p>&nbsp;</p>
         <p>请调节距离或者进入fourn</p>
        </span>
         
        <span v-else>
          <div v-for="(item, i) in listrelease" :key="item.rid">
            <span v-if="i%4==0"><div v-html="html2"></div></span>
              <el-tooltip :content="item.rname" placement="bottom" effect="light">
                <i class="el-icon-loading"></i>
                <el-col :span="6"><div class="grid-content bg-purple">
                  <img :src="item.rurl" class="image" @click="getridRelesase(i)">
                </div></el-col>
              </el-tooltip>
           <span v-if="(i+1)%4==0||i==(conut-1)"><div v-html="html1"></div></span>
          </div>
          
       </span>
   </div>
   <div class="usbottom">
         <p>&nbsp;</p>
         <p>&nbsp;</p>
           <el-pagination   @current-change="handleCurrentChange" :page-size="8" :total="conut" layout="prev, pager, next"> </el-pagination>
         <p>&nbsp;</p>
         <p class="usvideo">“分享吃喝玩乐，记录美好生活，让生活充满仪式感。”</p>
         <p>👇</p>
         <p>🌹&nbsp;&nbsp;&nbsp;vlog&nbsp;&nbsp;&nbsp;🌹</p>
         <userVideo  v-bind:message="radname"></userVideo>
       <!-- 精选根据位置推送的文章 -->
       <div class="text">
         <p>“处处打卡，攻略各地必去！”</p>
         <p>👇</p>
         <p>攻略&nbsp;🌹&nbsp;打开&nbsp;🌹&nbsp;美文</p>
         <usertext  v-bind:message="radname"></usertext>
       </div>
    </div>
        <!-- 修改距离标签 -->
    <div class="usmssum">
     <el-input class="input-new-tag"
             v-if="inputVisible"
             v-model="inputValue" 
             ref="saveTagInput" 
             size="small"  
             @keyup.enter.native="handleInputConfirm" 
             @blur="handleInputConfirm">
      </el-input>
    <el-button v-else  class="button-new-tag" size="small" @click="showInput">+ New 距离</el-button>
    </div>
</div>
</template>

<script>
import usertext from './usertext'
import userVideo from './userVideo'
export default {
  data(){
    return{
      inputVisible: false,
      inputValue: '1000',
      html1:"</el-row>",
      html2:"<el-row style='width:100%;'>",
      index:8,//初始表的长度按8，之后换页就加8
      list:[],//存储全部
      listrelease:[],
      conut:0,//分页长度
      ipLocation:'',
      release:{
          rlong:116.991885,
          rlat:35.592788,
          m:500,//多少范围内的
          rtype:'餐饮服务',
      },
      radname:'曲阜市'
    }
  },
  created(){
    this.getRelease(1)
  },
  methods: {
    getSum(){
       this.postRequest('/release/SelcetReleaseCont',this.release).then(req=>{
                var data=req.data;
                if(data.code=='0'){
                  this.conut=data.data;

                }
       })
    },
    getRelease(num,i){
      this.getSum()
      this.ipLocation=localStorage.getItem('ipLocation')
      if(this.ipLocation!=''&&this.ipLocation!='undefined'&&this.ipLocation!=null){
         var ip=this.ipLocation.split(',');
         this.release.rlong=ip[0];
         this.release.rlat=ip[1];
       }
      if(num==1){
        this.release.rtype='餐饮服务'
      }else if(num==2){
        this.release.rtype='风景名胜'
      }
      this.postRequest('/release/selectRelease',this.release).then(resp=>{
        var data=resp.data;
        if(data.code=='0'){
          this.$notify({
          title: '获取成功',
          type: 'success'
        });
          this.listrelease=[]
          this.list=data.data;
          if(this.conut<=8){
            this.listrelease=data.data;
          }else{
            for(var i=0;i<8;i++){
              this.listrelease.push(this.list[i])
            }
          }
          if(this.list[0].radname!=''&&this.list[0].radname!='undefined'&&this.list[0].radname!=null){
            this.radname=this.list[0].radname;
            localStorage.setItem('radcode',JSON.stringify(this.list[0].radcode))
            localStorage.setItem('radname',JSON.stringify(this.list[0].radname))
          }
        }else{
         this.$notify.error({
             title: '获取失败'
          });
        }
      })
    }, 
    handleCurrentChange(val){
       this.getselectRelease(val)
    },
    getselectRelease(val){
      this.listrelease=[]
      for(var i=(val-1)*8;i<val*8;i++){
           if(i<=(this.conut-1)){
              this.listrelease.push(this.list[i])
           }
           
      }           
    },
    //设置距离
    showInput() {
        this.inputVisible = true;
        // this.$nextTick(_ => {
        //   this.$refs.saveTagInput.$refs.input.focus();
        // });
      },
    handleInputConfirm() {
        let inputValue = this.inputValue;
        if (inputValue) {
          this.release.m=inputValue;
          if(this.release.m>3001){
            this.$message({
                message: '请输入10000以内的距离',
              type: 'warning'
            });
          }else{
            
          this.getSum();
          this.listrelease=[]
          this.postRequest('/release/selectRelease',this.release).then(resp=>{
            var data=resp.data;
              if(data.code=='0'){
               this.$notify({
                 title: '获取成功',
                  type: 'success'
                });
                 
                this.list=data.data;
                if(this.conut<=8){
                  this.listrelease=data.data;
                }else{
                  for(var i=0;i<8;i++){
                   this.listrelease.push(this.list[i])
                  }
                }
              }else{
                this.$notify.error({
                  title: '获取失败'
                });
               }
            })
          }
        }
        this.inputVisible = false;
    },
    getridRelesase(num){
        var list1=this.list[num]
        this.$router.push({name:'release'});
        localStorage.setItem('release',JSON.stringify(list1))
    },
  },
  computed:{

  },
  props:['releasename'],
  components:{
    userVideo,
    usertext
  }
   
  
}
</script>

<style lang="scss" scoped>
 .center{
    margin-left: 10px;
    .button{
      background-color: #ffffff00;
      margin: 10px;
      color: #33CC66;
      width: 100px;
      height: 40px;
      border: 1px solid #33CC66;
    }
   .button:focus{
      background-color: #33CC66;
      color:#fff;
    }
}
//jul
.usmssum{
  position: fixed;
  left: 10%;
  top:30%;
}
//底部
.usbottom{
  margin-top: 100px;
  width: 1024px;
   margin: auto;
  .text{
    width: 100%;
     padding-top: 40px;
  }
  .usvideo{
    letter-spacing:7px;
  }
}

.usMs{
  width: 1024px;
  margin: auto;
  margin-bottom: 300px;
  .word{
    float: left;
    padding-left: 20px;
  }
   img{
     width: auto;
     height: auto;
     max-width: 100%;
     max-height: 100%;
   }
   .image{
     width: 180px;
     height: 180px;
     margin-left: 12px;
     margin-top: 12px;
     cursor: pointer;
   }
}
</style>
