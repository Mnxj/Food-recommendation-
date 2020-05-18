<template>
<div class="pindex">
  <div class="pcindex">
   <!-- 首页 -->
    <transition name="my">
      <h1 class="wow" v-show="flag">Welcome to <span style=" font-weight: bold;color:#FFD700">LITM</span></h1>
    </transition>
    <transition name="dier">
     <h3 class="dier" v-show="flag">Living in<span style="color:#FFD700"> the moment</span> Cherish<span style="color:#FFD700"> the </span> present!</h3>
   </transition> 
  <!-- 按钮 -->
    <div class="button">
          <transition name="b1">
               <button class="b1" v-show="flag" @click="getLogin">Let's begin</button>
          </transition>
          <transition name="b2">
               <button class="b2" v-show="flag" @click="dialogVisible = true">Notify me!</button>
          </transition>
    </div>
    <!-- modal -->
    <div class="fubiaoti"  v-if="dialogVisible">
      <div class="modal-popup">
        <div class="modal-header">
          <button type="button" class="close" @click="dialogVisible = false"><span>&times;</span></button>
          <h2 class="modal-title">联系我们</h2>
        </div>
          <input v-model="ruleForm.name" type="text" class="form-control" id="fullname" placeholder="Full Name">
          <input v-model="ruleForm.email" type="text" class="form-control" id="email" placeholder="Email Address" @change="keyPressy()">
          <input  v-model="ruleForm.text" type="text" class="form-control" id="email" placeholder="请输入来意。。。">
          <button name="submit"  class="tijiao" id="submit" @click="submit" value="发 送"></button>
         <p>Thank you for your visiting!</p>
      </div>
    </div>
  </div>
</div>
   <!-- 联系我们 -->
</template>

<script>
export default {
      data() {
            return {
                  flag:false,
                   dialogVisible: false,
                    ruleForm:{
                        name: '',//名称
                        email:'',//类型
                        text: '',//介绍
                    }
            }
      },
      created(){
            this.getLocation()
            clearTimeout(this.timer);  //清除延迟执行 
            this.timer = setTimeout(()=>{   //设置延迟执行 
                  this.flag = !this.flag;
            },100);
             
      },
      methods: {
            getLogin(){
                  //先获取有没有数据，没有就跳转登录界面
                  var user=this.$store.getters.getUser;
                  if(user!="undefined"&&user!=null&&user!=""){
                       // this.$router.push({name:'ulogin'});
                   this.$router.push({name:'u_Home'});
                  }else{
                    this.$router.push({name:'ulogin'});
                  }
                  
            },
            submit(){
                   this.postRequest('/Mail/upload',this.ruleForm).then(req=>{
                      var data=req.data;
                      this.ruleForm.name='';
                       this.ruleForm.email='';
                        this.ruleForm.text='';
                        
                      this.dialogVisible=false;
                      if(data.data==1){
                             this.$notify({
                              title: '成功',
                              message: '发送成功',
                              type: 'success'
                              });
                      }
                })
            },
            keyPressy(){
            var y=this.ruleForm.email;
              var r = y.match(/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/);
               if(r == null){
                   alert("请按规则重新输入");
                   this.ruleForm.email="";
               }
            },
           getLocation() {
                  console.log('开始定位')
                  const self = this
                  AMap.plugin('AMap.Geolocation', function () {
                        var geolocation = new AMap.Geolocation({
                        // 是否使用高精度定位，默认：true
                        enableHighAccuracy: true,
                        // 设置定位超时时间，默认：无穷大
                        timeout: 10000,
                        })
                        geolocation.getCurrentPosition()
                        AMap.event.addListener(geolocation, 'complete', onComplete)
                        AMap.event.addListener(geolocation, 'error', onError)
                        function onComplete(data) {
                              // data是具体的定位信息
                              console.log('定位成功信息：', data)
                              //储存定位信息
                              localStorage.setItem('ipLocation',data.position)
                        }
                        function onError(data) {
                              // 定位出错
                              console.log('定位失败错误：', data)
                              
                        }
                  })
            },
         
      },
}
</script>
<style lang="scss" scoped>
.my-enter-active {
  transition: all 0.5s ease;
}
.my-enter
{
  transform: translateY(205px);
  opacity: 0;
}
.dier-enter-active {
  transition: all 0.7s ease;
}
.dier-enter
{
  transform: translateY(238px);
  opacity: 0;
}
.b1-enter-active {
  transition: all 1s ease;
}
.b1-enter
{
  transform: translateY(255px);
  opacity: 0;
}
.b2-enter-active {
  transition: all 1.2s ease;
 
}
.b2-enter
{
  transform: translateY(255px);
  opacity: 0;
}

.pcindex{
      position: absolute;
      width: 100%;
      height: 100%;
      padding-top: 20%;
      text-align: center;
      color: #fff;
      background: url(../../static/images/slide-1.jpg) no-repeat;
      animation: fateimg 15s linear infinite;
      @keyframes fateimg{
            0%{background: url(../../static/images/slide-1.jpg) no-repeat;background-size: 120%;}
            20%{background: url(../../static/images/slide-1.jpg) no-repeat;background-size: 100%;}
            40%{background: url(../../static/images/slide-1.jpg) no-repeat;background-size: 100%;}
            60%{background: url(../../static/images/slide-2.jpg) no-repeat;background-size: 120%;}
            80%{background: url(../../static/images/slide-2.jpg) no-repeat;background-size: 100%;}
            100%{background: url(../../static/images/slide-2.jpg) no-repeat;background-size: 100%;}
      }
      .wow{
            letter-spacing:7px; 
      }
      .dier{
            padding-top: 30px;
            letter-spacing:5px;
      }
      .fubiaoti{
            position: absolute;
            top:20%;
            left:35%;
            width:400px;
            height: 500px;
            background: url(../../static/images/modal-bg.jpg) no-repeat;
            z-index: 99999;
            .modal-popup{
                  margin:40px;
                  .modal-header{
                        margin: 30px;
                        .close{
                              background-color: #ffffff00;
                              border-radius: 50%;
                              color: #FFD700;
                              text-align: right;
                        }
                        .modal-title{
                              padding-top: 30px;
                              padding-bottom: 10px;
                              letter-spacing:3px;
                        }
                  }
                  .form-control{
                        height: 50px;
                        width: 330px;
                        background-color: #ffffff00;
                        border: 2px solid #fff;
                        
                  }
                  .tijiao{
                        height: 50px;
                        width: 330px;
                        background-color: #fff;     
                        color: #000;
                  }
            }
      }
      .button{
            padding-top: 50px;
            font-size: 24px;
            .b1{
                  margin-right: 20px;
                  border: 3px solid #ffffff;
                  background-color: #ffffff00;
                  width: 150px;
                  height: 60px;
                  color: #fff;
                  font-weight: bold;
            }
            .b1:hover{
                  border: 3px solid #FFD700;
                  background-color: #FFD700;
            }
            .b2{
                  border: 3px solid #ffffff;
                  width: 150px;
                  height: 60px;
                  font-weight: bold;
            }
            .b2:active{
                  border: 3px solid #FFD700;
                  background-color: #FFD700;
            }
      }
}


</style>

