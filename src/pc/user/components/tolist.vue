<template>
    <div class="tolist">
        <span v-if="getTolist=='undefined'||getTolist==''||getTolist==null">暂无通知</span>
        <span v-else>
         <!-- 这里的标签名称要和main.js文件中定义的组件名称保持一致 -->
        <happy-scroll color="rgba(0,0,0,0.5)" size="4">
             <div v-for="(item,i) in getTolist" :key="item.i" class="Tchar">
                <div @click="getT(i)">
                    <span v-if="item.type==1">
                         <i class="el-icon-share" style="font-size:24px;" ></i>
                    </span>
                    <span v-else-if="item.type==2">
                        <i class="el-icon-s-comment" style=" color:#33CC66; font-size:24px;" ></i>
                    </span>
                     <span v-else-if="item.type==3">
                        <i class="el-icon-user-solid" style=" color:#33CC33; font-size:24px;" ></i>
                    </span>
                    {{item.meg}}
               </div>
            </div>
        </happy-scroll>
        </span>
        <span v-if="list!=''">
           <div  class="Tchar2">
               <img :src="list.url" alt="">
               <span>{{list.meg}}</span>
               <hr>
               <p>{{list.text}}</p>
               <p>{{list.date}}</p>'
               <span v-if="list.type==1">
                 <el-button type="primary" @click="sumbit"><i class="el-icon-s-promotion"></i>&nbsp;点击进入</el-button>
               </span>
               <span v-if="list.type==3">
                 <el-button type="primary" @click="sumbitT"><i class="el-icon-success"></i>&nbsp;同意</el-button>
               </span>
               <span v-else>
                   <el-button type="primary" @click="sumbitR">&nbsp;确定</el-button>
               </span>
            </div>
        </span>
    </div>
</template>

<script>
export default {
  data(){
      return{
          list:'',
          count:0
      }
  },
 methods:{
     getT(i){
        this.list=this.getTolist[i];
        this.count=i;
     },
     sumbitR(){
          this.$websocket.dispatch('Remove',this.count)
          this.list=''
     },
     sumbit(){
         this.postRequest("/api/ws/SelectMenu",
         {menuid:this.list.id,menu:this.list.menu}).then(req=>{
           var data =req.data
           console.log(this.list)
           console.log(data)
           if(data.code==0){
               if(data.data.lx=='店铺'){
                   this.$router.push({name:'release',params:{list:data.data}});
               }else if(data.data.lx=='视频'){
                   this.$router.push({name:'readmorevideo',params:{video:data.data}});
               }else if(data.data.lx=='日志'){
                  this.$router.push({name:'readmoretext',params:{Text:data.data}});
               }
           }
         })
     },
     sumbitT(){
        var user=this.$store.getters.getUser;
        this.postRequest('/api/ws/addweb',{
                id1:user.id,
                id2:this.list.id,}).then(req=>{
                    var data=req.data
                   if(data.code==0){
                    console.log(data)
                    this.$notify({
                     title: '成功',
                     message:data.data,
                     type: 'success'
                   });
                    this.$websocket.dispatch('Remove',this.count);
                    this.postRequest('/api/ws/sendOne',{
                    id:user.id,
                    type:4,
                    message:'用户:'+user.name+',同意了您的请求。',
                    id2:this.list.id,
                    menu:'同意'
                    }).then(req=>{})
                 }else{
                    this.$notify.error({
                      title: '失败',
                      message: data.msg
                    });
                 }

        })
        
     }
 },
 computed:{     
        getTolist(){
            return JSON.parse(this.$websocket.getters.getTolist());
        },
 }
}
</script>

<style>
.tolist{
    width: 900px;
    height: 400px;
    border: 1px solid #ddd; 
    background-color: #ffffff70;
    border-radius: 10px;
    padding-left: 40px;
    padding-top: 20px;
}
.Tchar{
    padding-top: 20px;
    padding-left: 20px;
   width: 250px;
   height: 60px;
   box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.1);
   cursor: pointer;
}
.Tchar2{
    margin-top: -370px;
    float: right;
    width: 500px;
    height: 350px;
    box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.1);
    background-color: #ffffff70;
    margin-right: 40px;
    border-radius: 10px;
    padding-top: 10px;
    padding-left: 10px;
    
}
.Tchar2 img{
      width: 40px;
    height: 40px;
    border-radius: 50px;
}
.Tchar img{
    width: 40px;
    height: 40px;
    border-radius: 50px;
}
</style>
