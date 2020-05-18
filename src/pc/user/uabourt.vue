<template>
    <div class="uabourt">
        <div class="title">
            <h1 class="titleh1">Welcome to LITM</h1>
            <p>“Living in the moment，Cherish the present”<br>
                这个网页的灵感来源于英剧《真相捕捉》，在电视剧中某一段剧情：<br>
                女警在抓捕嫌疑犯时，发现自己从监控中看到的和下属在现场看到的不服。<br>
                这是一个springboot+vue的项目,当然有很多jar,如websocket,mail,amp等<br>
                整个项目也是通过假期和课余时间所作，本着“活在当下，热爱生活”<br>
                让吃喝玩乐更方便一点,减少大家的踩坑之旅<br>
                也是对于我现今所学的总结,由于时间的问题,具体细节功能后期慢慢推进<br>
                当然后有很多细节优化<br>
                那么。。。请慢慢探索<br><br><br>
               </p>
            <h4> 下面是作者信息：</h4>
        </div>
        <div class="author">
            <img style="float:left;" src="../../imgas/123123.jpg" width="300px" height="300px" alt="">
            <div class="content">
                <p><span class="imga"><i class="el-icon-user-solid"></i>:  </span><span class="size">苏格兰大野驴</span></p>
                <p><span class="imga3"><i class="el-icon-s-custom"></i>:  </span><span class="size">在读大学生</span></p>
                <p><span class="mui-icon mui-icon-qq imag4">:  </span><span class="size">773178360</span></p>
                <p><span class="imga2"><i class="el-icon-message"></i>:  </span><span class="size">773178360@qq.com</span></p>
            </div>
        </div>
        
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="scss" scoped>
.uabourt{
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
    .author{
        height: 500px;
        padding-top: 3%;
        padding-left:10%;
        .content{
            text-align: left;
            line-height: 50px;
            margin-left: 32%;
            .imga{
                font-size: 40px;
                color: #DEB887;
            }
            .imga2{
                font-size: 40px;
                color: #48D1CC;
            }
            .imga3{
                font-size: 40px;
                color: #FF6347;
            }
            .imag4{
                font-size: 40px;
            }
            .size{
                font-size: 27px;
                font: bold;
            }
        }
    }
}
</style>
