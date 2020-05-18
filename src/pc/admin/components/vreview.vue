<template>
    <div class="vreview">
         <div class="panel panel-primary">
            <div class="panel-heading">
                <h3 class="panel-title">vlog审核</h3>
            </div>
         </div>
        <table class="table table-bordered table-hover table-striped">
            <thead>
                <tr>
                    <th>
                        <p>标题</p>  
                    </th>
                    <th>
                        <p>作者</p>  
                     </th>
                    <th>
                        <p>图片</p>
                    </th>
                    <th>
                        <p>描述</p>
                    </th>
                    <th>
                        <p>创建时间</p>
                    </th>
                    <th>
                        <p>播放</p>
                    </th>
                    <th><p>操作</p>
                    </th>
                </tr>
            </thead>
        <tbody>
            <tr v-for="(item,i) in vstickey" :key="item.videoid">
                <td>{{item.videotitle}}</td>
                <td>{{item.name}}</td>
                <td>  <img :src="item.videourl" alt="" style="width: 40px;height: 40px;border-radius: 50px;"></td>
                <td> <p>{{item.videosource}}</p> </td>
                <td>{{item.videotime}}</td>
                <td><i class="el-icon-video-play" @click="play(i)" style="font-size:30px;cursor: pointer; "></i></td>
                <td>
                    <el-button @click="updatVreview(i,1)" type="success" icon="el-icon-check" circle></el-button>
                    <el-button  @click="updatVreview(i,2)" type="danger" icon="el-icon-delete" circle></el-button>
                </td>
            </tr>
       </tbody>
      </table>
      <div class="Fye">
           <el-pagination   @current-change="handleCurrentChange" :page-size="7" :total="sum" layout="prev, pager, next"> </el-pagination>
        </div>
        <transition >
            <div class='demo' v-if="dialogVisible">
                    <video-player class="video-player vjs-custom-skin"
                      ref="videoPlayer"
                      :playsinline="true"
                      :options="playerOptions" muted>
                    </video-player>
            </div>
        </transition>
    </div>
</template>

<script>

export default {
    data(){
       return{
           vstickey:[],
           sum:0,
           count:1,
           playerOptions:{},//存放播放器的配置文件
           dialogVisible:false,
       }   
    },
    created(){
        this.getVsticky();
        this.getCount();
    },
    methods:{
        getCount(){
            this.postRequest('/video/selcetCount',{n:2}).then(
             resp=>{
                 var data=resp.data;
                 this.sum=data.data;
             })
        },
        getVsticky(){
            this.postRequest('/video/selecetAllV',{pag:1}).then(resp=>{
                var data=resp.data
                if(data.code==0){
                this.vstickey=data.data
                }
            })
        },
        handleCurrentChange(val){
            this.count=val
            this.postRequest('/video/selecetAllV',{pag:val}).then(resp=>{
                 var data=resp.data;
                  if(data.code==0){
                    this.vstickey=data.data
                }
            })
        },
        updatVreview(i,num2){
             this.postRequest('/video/updatVreview',{src:this.vstickey[i].videourl,url:this.vstickey[i].videocontent,videoid:this.vstickey[i].videoid,n:num2}).then(resp=>{
                 var data=resp.data;
                  if(data.code==0){
                   this.$notify({
                     title: '成功',
                     type: 'success'
                     
                   });
                   var text;
                   if(data.data==2){
                       var text='你的vlog'+this.vstickey[i].videotitle+'通过了审核'
                   }
                   if(data.data==1){
                       var text='你的vlog'+this.vstickey[i].videotitle+'没有通过审核'
                   }
                    this.postRequest('/api/ws/sendOne',{
                       type:5,
                       message:text,
                       id2:this.vstickey[i].id,
                       url1:this.vstickey[i].videourl
                    }).then(req=>{})
                   this.handleCurrentChange(this.count)
                }else{
                     this.$notify.error({
                      title: '失败',
                      message: data.msg
                    });
                }
            })
        },
         //设置视频播放插件
        onLive(onM3u8,onCover){
			this. playerOptions =  {
			  //播放速度
                    playbackRates: [0.5, 1.0, 1.5, 2.0], 
                    //如果true,浏览器准备好时开始回放。
                    autoplay: false, 
                    // 默认情况下将会消除任何音频。
                    muted: false, 
                    // 导致视频一结束就重新开始。
                    loop: false, 
                    // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
                    preload: 'auto', 
                    language: 'zh-CN',
                     // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
                    aspectRatio: '16:9',
                     // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
                    fluid: true,
                    sources: [{
                        //类型
                        type: "video/mp4",
                        //url地址
                        src: onM3u8
                    }],
                    //你的封面地址
                    poster: onCover, 
                     //允许覆盖Video.js无法播放媒体源时显示的默认信息。
                    notSupportedMessage: '此视频暂无法播放，请稍后再试',
                    controlBar: {
                        timeDivider: true,
                        durationDisplay: true,
                        remainingTimeDisplay: false,
                        //全屏按钮
                        fullscreenToggle: true  
                 }
				            
			}
        },
        play(i){
            this.dialogVisible=!this.dialogVisible;
            if(this.dialogVisible){
                this.onLive(this.vstickey[i].videocontent,this.vstickey[i].videourl)
            }
        }
    }

}
</script>
<style lang="scss" scoped>
.v-enter-active,
.v-leave-active {
  transition: all 1s ease;
}
.v-enter,.v-leave-to
{
  transform: translatex(100%);
  opacity: 0;
}
.a-enter-active,
.a-leave-active {
  transition: all 1s ease;
}
.a-enter,.v-leave-to
{
  transform: translatey(100%);
  opacity: 0;
}
.vreview{
    
    height: 750px;
    .Fye{
        padding-top: 30px;
        margin-left: 300px;
        
    }
    .demo{
            position: fixed;
            top:20%;
            left:20%;
            z-index: 99999;
            display: inline-block;
            width: 600px;
            height: 338px;
            text-align: center;
            line-height: 100px;
            border: 1px solid transparent;
            border-radius: 4px;
            overflow: hidden;
             background: #fff;
             box-shadow: 0 1px 1px rgba(0, 0, 0, .2);
             margin-right: 4px;
         }
        .demo:hover{
            display: block;
        }
}
</style>

