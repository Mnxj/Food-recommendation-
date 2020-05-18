<template>
    <div class="m_help">
        <!-- 头部 -->
        <mtop></mtop>
        <div class="center-nr">
        <p class="font">请输入内容:</p>
        <!-- 内容 -->
        <textarea placeholder="120字以内" maxlength="120" class="text"></textarea>
        <mt-button type="primary" size="large">提交</mt-button>
        </div>
    </div>
</template>
<script>
import mtop from './m_top.vue'
export default {
    data() {
        return {
           
        }
    },
    created(){
        
    },
    methods: {
        
    },
    components:{
        mtop
    }
}
</script>
<style lang="scss" scoped>
.m_help{
    .center-nr{
        padding-top: 10px;
        margin: 0 10px;
        .font{
            font-weight: bold;
            font: 14px;
        }
        .text{
            height: 100px;
        }
    }
}
</style>
