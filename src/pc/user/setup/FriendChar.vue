<template>
    <div class="Fchar1">
        <utop></utop>
        <div class="FrienadChar">
            <!-- 上部分 -->
            <span style=" font-size:19px;color: #000;">聊天中心 &nbsp;\ &nbsp;</span><span style="color:#5D5D5D;">好友</span>
            <hr>
            <!-- 中间 -->
            <div class="Fccenter">
                 <userdata></userdata>
            </div>
        </div>
    </div>
</template>

<script>
import userdata from '../components/userdata'
import utop from '../relesase/utop'
export default {
    components: {
      utop,
      userdata
  }

}
</script>
<style lang="scss" scoped>
.Fchar1{
    height: 750px; background:url(../../../imgas/liaotian.jpg);
    margin: auto;
    .FrienadChar{
        width: 950px;
        height: 600px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        margin: auto;
        margin-top: 30px;
        background-color: #ffffff70;
        padding-left: 10px;
         padding-top: 15px;
        .Fccenter{
           padding-top: 15px;
            padding-top: 10px;
           
        }
    }
}
</style>
