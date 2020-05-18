<template>
    <div class="m_abourt">
        <div>
            <mtop></mtop>
            <div class="imgp">
            <img src="../../imgas/tubiao.png"  alt="">
            <p>这是一个测试项目</p>
            </div>
        </div>
    </div>
</template>
<script>
import mtop from '../rightupper/m_top.vue'
export default {
    created(){
    },
    components:{
        mtop
    }
}
</script>
<style lang="scss" scoped>
.imgp{
    padding-top: 50px;
    text-align: center;
    img{
        width: 200px;
        height: 180px;
    }
}
</style>
