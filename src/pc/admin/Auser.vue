<template>
    <div class="Auser">
      <ol class="breadcrumb" style="background-color:#fff;">
        <li class="active">首页</li>
        <li class="active">记录</li>
        <li class="active">访客记录</li>
      </ol>
      <div class="Ausern">
         <img src="../../imgas/jiben.png" alt="">
          <div class="Vistor1">
	     	    <div class="char1" id="myChart" :style="{width: '300px', height: '300px'}"></div>
            <div class="char2" id="myChart2" :style="{width: '300px', height: '300px'}"></div>
           </div>
           <img src="../../imgas/zhuce.png" alt="">
           <div class="Vistor2">
            <div class="char1" id="myChart3" :style="{width: '300px', height: '300px'}"></div>
            <div class="char2" id="myChart4" :style="{width: '300px', height: '300px'}"></div>
          </div>
          
      </div>
     
	</div>
</template>

<script>
export default {
data() {
		return {
      gender:[],//性别总数
      dirthday:[],//生日
      listuser:[]//今天昨天总数
		}
  },
  mounted(){
    this.drawLine();
  },
  methods: {
   		drawLine(){
  
        var option={
           title : {
            text: '性别对比',
                x:'center'
            },
          tooltip: {
             trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
          },
         
           legend: {
               type: 'scroll',
               orient: 'vertical',
               right: 10,
               top: 20,
               bottom: 20,
           },
           series: [
        {
            name:'访问来源',
            type:'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
                normal: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    show: true,
                    textStyle: {
                        fontSize: '30',
                        fontWeight: 'bold'
                    }
                }
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            data:[ ]
        }
       ]}

        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart'))
        let myChart2 = this.$echarts.init(document.getElementById('myChart2'))
        let myChart3 = this.$echarts.init(document.getElementById('myChart3'))
        let myChart4 = this.$echarts.init(document.getElementById('myChart4'),'macarons') 
        myChart.setOption(option)
        // 绘制图表
          myChart2.setOption({
            title : {
            text: '出生年份对比',
                x:'center'
            },
            tooltip : {
            formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
             legend: {
               type: 'scroll',
               orient: 'vertical',
               right: 10,
               top: 20,
               bottom: 20,
           },
            series : [{
            name: '年份',
            type: 'pie',
            radius: '55%',
            data:[
            ]
             }]
          });
           myChart3.setOption({
             title: { text: "柱形图"},
            tooltip: {},
            xAxis: {
                data: ["昨天","今天","总数"]
            },
            yAxis: {},
            series: [{
                name: '注册',
                type: 'bar',
                data: []
            }]
	      	});

          myChart4.setOption({
             title: { text: "折线图"},
            tooltip: {},
            xAxis: {
               data: ["昨天","今天","总数"]
            },
            yAxis: {},
            series: [{
                name: '注册',
                type: 'line',
                data: []
            }]
          });
           myChart3.showLoading();
           myChart4.showLoading();
          this.getRequest('/user/listAll').then(
             resp=>{
                var data=resp.data.data;
               
              
               this.gender.push({"value": data.gender[1],"name":data.gender[0]},{"value": data.gender[3],"name":data.gender[2]});
               this.listuser.push(data.lianame);
               var map = data.birday;
               for(var i=0;i<map.length;i++){
                this.dirthday.push({"value": map[i+1],"name":map[i]+" 年"});
                 i++;
               }
               console.log(this.dirthday);
                myChart3.hideLoading();
                myChart4.hideLoading();
                myChart.setOption({
                  series:[{
                    name:'性别',
                    data: this.gender
                  }]
                })
                myChart2.setOption({
                  series:[{
                    name:'年份',
                    data: this.dirthday
                  }]
                })
                myChart3.setOption({        //加载数据图表
                        series: [{
                            // 根据名字对应到相应的系列
                             name: '注册',
                             data: this.listuser[0]
                        }]
                    });
                myChart4.setOption({        //加载数据图表
                        series: [{
                            // 根据名字对应到相应的系列
                             name: '注册',
                             data: this.listuser[0]
                        }]
                });
             })
    }
  }
}
</script>
<style lang="scss" scoped>
.Auser{
	height: 1200px;
  .Ausern{
    margin: 0 7%;
    height: 80%;
    box-shadow: 4px -4px 7px #D3D3D3;
    border: 1px solid #DDD;
     img{
       width: 60%;
       padding-left: 38%;
     }
    .Vistor1{
        margin: 5% 8%;
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
  }
}
</style>
