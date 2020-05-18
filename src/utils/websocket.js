
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
    state: {
        websock: null,
        eventlist:new Map(),
        userdata:[],
        tolist:[],
        userlist:[],//用户列表
        userflag:{
            text:'有来自好友的消息',
            flag:false
        },//存放好友聊天消息提示，和红点
        toflag:{
            text:'有新的通知',
            flag:false
        },//存放提示系统通知
        flag:true
        
    },
    getters: {
        getUserdata(state) {                                
            return function () {      
                if (state.userdata.length > 0) {                                              
                    return state.userdata;
                }
                return null;
            }
        },
        getUserlist(state) {                                
            return function () {      
                if (state.userlist.length > 0) {          
                                
                    return state.userlist;
                }
                return null;
            }
        },
        getUserflag(state) {
            return function () {                                         
                    return state.userflag;
            }                
        },
        getToflag(state) {     
            return function () {                                         
                return state.toflag;
            }                                           
       },
        getTolist(state){
            return function () {      
                if (state.tolist.length > 0) {                                                       
                    return JSON.stringify(state.tolist);
                }
                return null;
            }
        },
        
    },
    mutations: {
        WEBSOCKET_INIT(state,url) {
            state.websock = new WebSocket(url);
            state.websock.onopen = function () {
                console.log("连接成功！");
            }
            state.websock.onmessage = function (callBack) {
                console.log("ws接收！");
                //解析传过来的数据
                var data=callBack.data
                var len=data.length;
                if(data.startsWith("#102:")&&data.endsWith("#")){
                    var to=data.substring(5, len-1)
                    var sum=to.split("#,#")
                    var t={
                        menu:sum[0],
                        meg:sum[1],
                        text:sum[2],
                        type:sum[3],
                        id:sum[4],
                        date:sum[5],
                        url:sum[6],
                    }
                    state.tolist.push(t)
                    state.toflag.flag=true
                }
                if(data.startsWith("#101:")&&data.endsWith("#")){
                    var to=data.substring(5, len-1)
                    var sum=to.split("#,#")
                    var t={
                        message:sum[0],
                        id:sum[1],
                        id2:sum[2],
                        date:sum[3],
                        url1:sum[4],
                        url2:sum[5],
                    }
                   state.userdata.push(t)
                   state.eventlist.set(t.id2,state.userdata);
                   state.userflag.flag=true
                }
                if(data.startsWith("#103:")&&data.endsWith("#")){
                    var to=data.substring(5, len-1)
                    var sum=to.split("#,#")
                    var t={
                        name:sum[0],
                        id:sum[1],
                        src:sum[2],
                        newsfalg:sum[3]=='false'?false:true,
                        userflag:sum[4]=='false'?false:true,
                    }
                    state.userlist.push(t)
                }
                if(data.startsWith("#104:")&&data.endsWith("#")){
                    var to=data.substring(5, len-1)
                    var sum=to.split("#,#")
                    var t={
                        name:sum[0],
                        id:sum[1],
                        src:sum[2],
                        newsfalg:sum[3]=='false'?false:true,
                        userflag:sum[4]=='false'?false:true,
                    }
                    //如果添加了新好友的依据
                    var num=0;
                    for(var i=0;i<state.userlist.length;i++){
                        if(state.userlist[i].id=t.id){
                            state.userlist[i].userflag=t.userflag;
                            num=1;
                        }
                    }
                    if(num==0){
                        state.userlist.push(t)
                    }
                   
                }
            }
            state.websock.οnerrοr=function(e) { //错误
                console.log("ws错误!");
                console.log(e);
            }
            state.websock.onclose=function(e) { //关闭
                console.log("ws关闭！");
                state.flag=false;
            }
            state.websock.binaryType = "arraybuffer";
            // //发送心跳包获取好羞
           if(state.flag){
            setInterval(function() {
                console.log("ws发送心跳！");
                   state.websock.send(JSON.stringify(
                       112233
                     ));
           }, 30000)
           }
           
           
        },
        Remove(state,i){
            state.tolist.splice(i,1);
        },
        getEventlist(state,num){
            var mapIter = state.eventlist;
            for(var [key, val] of mapIter.entries()) {
                if(key==num){
                    state.userdata=val
                }
            }
        },
        //把自己发送的消息页存入缓存用来显示在消息列表
        adduserdata(state,data){
            state.userdata.push(data)
        },
        setUserFlag(state){
            state.userflag.flag=false
        },
        setToFlag(state){
            state.toflag.flag=false
        }
        
    },
    actions: {
        WEBSOCKET_INIT({commit},url) {
            commit('WEBSOCKET_INIT',url)
        },
        Remove({commit},i){
            commit('Remove',i)
        },
        getEventlist({commit},num){
            commit('getEventlist',num)
        },
        adduserdata({commit},data){
            commit('adduserdata',data)
        },
        setUserFlag({commit}){
            commit('setUserFlag')
        },
        setToFlag({commit}){
            commit('setToFlag')
        }
    }
})