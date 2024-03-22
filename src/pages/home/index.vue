<template>
    <div class="common-layout">
        <el-container>
            <el-header class="home_top">
                <Home_top></Home_top>
            </el-header>
            <el-container>
                <el-aside width="200px" class="home_left" >Aside</el-aside>
                <el-container>
                    <el-main class="home_main" >Main</el-main>
                </el-container>
            </el-container>
            <el-footer class="home_footer" >Footer</el-footer>
        </el-container>
    </div>
</template>
  

<script setup lang="ts">
import Home_top from './components/home_top.vue';

</script>

<style scoped lang="less">
.home_top{
    height: 70px;
    background-color: #EC4141;
}
.home_left{
    min-height: calc(100vh - 150px);
    border-right: 1px solid #E0E0E0;
}
.home_footer{
    height: 80px;
    border-top: 1px solid #E0E0E0;

}

</style>