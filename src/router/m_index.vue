<template>
    <div class="m_index">
        <!-- 头部 -->
        <header id="header" class="mui-bar mui-bar-transparent">
			<h1 class="mui-title wetih">生活小馆</h1>
            <a id="menu" class="mui-action-menu mui-icon mui-icon-bars mui-pull-right" href="#topPopover"></a>
        </header>
		
        <!--轮播图 -->
     <div class="lunbutu">
	   <mt-swipe :auto="4000">
         <mt-swipe-item>
             <img src="../imgas/mmexport1572102109013.jpg" alt="">
         </mt-swipe-item>
          <mt-swipe-item>
               <img src="../imgas/mmexport1572102121839.jpg" alt="">
          </mt-swipe-item>
          <mt-swipe-item>
               <img src="../imgas/mmexport1572102116407.jpg" alt="">
          </mt-swipe-item>
       </mt-swipe>
     </div>
	 <!-- 中间伸缩框 -->
	 <div class="m_center-title">
		 
       <div class="mui-content rd">
		   <img class="content-title-font" src="../imgas/m_daohang.png">
		 <img src="../imgas/titlebowen.png" alt="">
			<div class="mui-card">
				<ul class="mui-table-view ">
					<li class="mui-table-view-cell mui-collapse lih">
						<a class="mui-navigate-right meishi" href="#" >[ 美食 ]</a>
						 <div class="mui-collapse-content">
							<p @click="Num(1)">推荐</p>
							<!-- <p>最受欢迎</p>
							<p>物超所值</p> -->
						</div>
					</li>
					<!-- <li class="mui-table-view-cell mui-collapse lih">
						<a class="mui-navigate-right chuxing" href="#">[ 出行 ]</a>
						<div class="mui-collapse-content">
							<router-link to="/m_index/dingwei">景点必去</router-link>
							<p>打车推荐</p>
							<p>曲园打卡点</p>
							 
						</div>
					</li> -->
					<li class="mui-table-view-cell mui-collapse lih">
						<a class="mui-navigate-right zhusu" href="#">[ 景点 ]</a>
						<div class="mui-collapse-content">
							<p @click="Num(2)">推荐</p>
							<!-- <p>舒适排行</p>
							<p>洁净排行</p> -->
						</div>
					</li>
				</ul>
			</div>
        </div>
	 </div>
     <!-- 三个组件切换下部 -->
     <div class="m-bon">
		<a href="" @click.prevent="flag=true" class="t1">
			<img src="../imgas/zuitext.png" width="70px" height="40px" alt="" class="zuitext">
		</a>
        <a href="" @click.prevent="flag=false ">
			<img src="../imgas/vlog.png" width="70px" height="40px" alt="" class="m_ivideo">
		</a>
        <mdaytext v-if="flag"></mdaytext>
        <mdayvide v-else></mdayvide>
	 </div>
     <!--右上角弹出菜单-->
		<div id="topPopover" class="mui-popover" >
			<div class="mui-popover-arrow"></div>
			<div class="mui-scroll-wrapper">
				<div class="mui-scroll">
					<ul class="mui-table-view">        
						<li class="mui-table-view-cell">
							<router-link :to="{name:'m_data',params:{user:this.$store.getters.getUser}}">账户信息</router-link>
						</li>
						<li class="mui-table-view-cell">
							<router-link to="/m_index/m_help">意见反馈</router-link>
						</li>
						<li class="mui-table-view-cell">
							<router-link to="/m_index/m_abourt">关于我们</router-link>
						</li>
					</ul>
				</div>
			</div>

		</div>

     <br>
	 <div>
		 <img src="../imgas/end.png" width="100%"  alt="">
	 </div>
</div>
</template>
<script>
import mdaytext from '../phone/utils/mdaytext.vue'
import mdayvide from '../phone/utils/mdayvide.vue'
export default {
	data() {
		return {
			flag:true
		}
	},
    methods: {
       Num(num){
		    this.$router.push({name:'m_sMS',params:{num:num}});
	   },
	},
	components:{
		mdayvide,
		mdaytext
	}
    
}
</script>


<style lang="scss" scoped>
.m_index{
	background-color: #fff;
.Textright{
 float:right;
 padding-top: 5px;
 .menu2{
     width: 30px;
 }
}
.wetih{
    color: #fff;
}
.lunbutu{
    height: 270px;
    img {
      width: 100%;
      height: 100%;
    }
}
.mui-plus .plus{
	display: inline;
}
.plus{
    display: none;
}
#topPopover {
	position: fixed;
	top: 16px;
	right: 6px;
}
#topPopover .mui-popover-arrow {
left: auto;
right: 6px;
}
p {
text-indent: 22px;
}
span.mui-icon {
font-size: 14px;
color: #007aff;
margin-left: -15px;
padding-right: 10px;
}
 .mui-popover {
 height: 250px;
 }
 .mui-content {
  padding: 10px;
 }
 //导航区块
 .m_center-title{
	margin: 20px;
	text-align: center;

   .rd{
	   border-radius: 15px;
	   border: 1px solid #A9A9A9;
	   //text-shadow:  3px 2px 1px #A9A9A9;
	   box-shadow: 4px -4px 8px  #DCDCDC;
	.content-title-font{
		width: 80px;
		height: 60px;
		padding-bottom:-2px ;
	}
   .lih{
    font-size: 20px;
	font-weight: 900;
	font-style: oblique;
	.meishi{
	padding-bottom: 10px;
	background:url(../imgas/P90525-135751.jpg);
	color: aqua;
	}
  	.zhusu{
	background: url(../imgas/P90528-190901.jpg);
	color:chartreuse;
	}
   }
   }
 }
}
.m-bon{
	margin: 10px;
	.t1{
		padding-left: 11px;
		
        .zuitext{
		margin-bottom: -16px;
		border: 1px  solid #999;
	  }
	}
	
	.m_ivideo{
		margin-bottom: -16px;
		border: 1px  solid #999;
	}
}
</style>
