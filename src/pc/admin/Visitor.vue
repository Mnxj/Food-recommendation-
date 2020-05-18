<template>
    
  <div class="Visitor">
    <ol class="breadcrumb" style="background-color:#fff;">
      <li class="active">首页</li>
      <li class="active">记录</li>
      <li class="active">访客记录</li>
    </ol>
    <div class="Visitorn">
     
    <br>
      <img src="../../imgas/fangke.png" alt="">
     <div class="Vistor1">
      <div class="char1" id="myChart" :style="{width: '300px', height: '300px'}"></div>
      <div class="char2" id="myChart2" :style="{width: '300px', height: '300px'}"></div>
     </div>
     <img src="../../imgas/duibi.png" alt="">
    <div class="Vistor2">
       <div class="char1" id="myChart3" :style="{width: '300px', height: '300px'}"></div>
       <div class="char2" id="myChart4" :style="{width: '300px', height: '300px'}"></div>
    </div>
    </div>
		<!-- <div id="myChart2" :style="{width: '300px', height: '300px'}"></div> -->
	</div>
</template>

<script>
export default {
	data() {
		return {
       dataCount:[
        // yesterday,//昨天
         //nowadays,//今天
         //sumCount,//总共
       ],
       visitCount:[
        //monday,//周一
      //  tuesday,//周二
      //  wednesday,//周三
       // thursday,//周四
       // friday,//周五
      //  saturday,//周六
       // sunday,//周日
       ]
		}
  },
  mounted(){
   
    this.drawLine();
  },
  methods: {
   		drawLine(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart'),'macarons')
          let myChart2 = this.$echarts.init(document.getElementById('myChart2'))
            let myChart3 = this.$echarts.init(document.getElementById('myChart3'))
              let myChart4 = this.$echarts.init(document.getElementById('myChart4'),'macarons') 
        // 绘制图表
        myChart.setOption({
            title: { text: "柱状图" },
            tooltip: {},
            xAxis: {
                data: ["昨天","今天","总记录"]
            },
            yAxis: {},
            series: [{
                name: '访客',
                type: 'bar',
                data:[]
            }]
          });
          myChart2.setOption({
             title: { text: "折线图" },
            tooltip: {},
            xAxis: {
                data: ["昨天","今天","总记录"]
            },
            yAxis: {},
            series: [{
                name: '访客',
                type: 'line',
                data: []
            }]
          });
          myChart3.setOption({
             title: { text: "柱形图"},
            tooltip: {},
            xAxis: {
                data: ["周一","周二","周三","周四","周五","周六","周日"]
            },
            yAxis: {},
            series: [{
                name: '访客',
                type: 'bar',
                data: []
            }]
	      	});

          myChart4.setOption({
             title: { text: "折线图"},
            tooltip: {},
            xAxis: {
                data: ["周一","周二","周三","周四","周五","周六","周日"]
            },
            yAxis: {},
            series: [{
                name: '访客',
                type: 'line',
                data: []
            }]
          });
          myChart.showLoading();    //数据加载完之前先显示一段简单的loading动画
           myChart2.showLoading();
           myChart3.showLoading();
           myChart4.showLoading();
          this.getRequest('/visit/selectall').then(
             resp=>{
                var data=resp.data.data;
               this.dataCount.push(data.yesterday);
               this.dataCount.push(data.nowadays);
               this.dataCount.push(data.sumCount);
               this.visitCount.push(data.monday);
               this.visitCount.push(data.tuesday);
                this.visitCount.push(data.wednesday);
               this.visitCount.push(data.thursday);
               this.visitCount.push(data.friday);
                this.visitCount.push(data.saturday);
                this.visitCount.push(data.sunday);
                myChart.hideLoading();    //隐藏加载动画
                myChart2.hideLoading();
                myChart3.hideLoading();
                myChart4.hideLoading();
                    myChart.setOption({        //加载数据图表
                        series: [{
                            // 根据名字对应到相应的系列
                             name: '访客',
                             data: this.dataCount
                        }]
                    });
                    myChart2.setOption({        //加载数据图表
                        series: [{
                            // 根据名字对应到相应的系列
                             name: '访客',
                             data: this.dataCount
                        }]
                    });
                     myChart3.setOption({        //加载数据图表
                        series: [{
                            // 根据名字对应到相应的系列
                             name: '访客',
                             data: this.visitCount
                        }]
                    });
                     myChart4.setOption({        //加载数据图表
                        series: [{
                            // 根据名字对应到相应的系列
                             name: '访客',
                             data: this.visitCount
                        }]
                    });
             })
    }
    
  }
}
</script>
<style lang="scss" scoped>
.Visitor{
	height: 1200px;
  .Visitorn{
    margin: 0 7%;
    height: 80%;
    box-shadow: 4px -4px 2px #888888;
    border: 1px solid #DDD;
     .Vistor1{
        margin: 3% 7%;
       .char1{
         padding-left: 3%;
         float: left;
       }
       .char2{
         float: right;

       }
    }
    .Vistor2{
      margin: 3% 7%;
      .char1{
         padding-left: 3%;
         float: left;
       }
       .char2{
         float: right;

       }
    }
    img{
       padding-left: 37%;
    }
  }
}
</style>
