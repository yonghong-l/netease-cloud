<template>
    <div class="body_top">
        <div class="top_left">
            <h1 class="logo"></h1>
            <div class="left_content">
                <div class="back_up">
                    <img class="img" src="../../../assets//home/j_left.png" alt="">
                    <img class="img" src="../../../assets//home/j_reught.png" alt="">
                </div>

                <el-input v-model="a1" class="w-50 m-2 myinput" :border="false" placeholder="" :prefix-icon="Search" />
                <img class="ht" src="../../../assets/home/cg.png" alt="">
            </div>
        </div>
        <div class="top_reigth"></div>
    </div>
</template>

<script setup>
import { Search } from '@element-plus/icons-vue'
import { onMounted, ref } from 'vue';

const a1 = ref('')

</script>

<style scoped lang="less">
.body_top {
    display: flex;
    justify-content: space-between;

    .top_left {
        display: flex;

        .logo {
            width: 176px;
            height: 69px;
            background: url('../../../assets/home/topbar.png') no-repeat 0 9999px;
            background-position: 0 0;
            margin: 0;
            cursor: pointer;
        }

        .left_content {
            display: flex;

            .back_up {
                display: flex;
                width: 75px;
                justify-content: space-between;
                margin-top: 22px;
                margin-left: 90px;

                .img {
                    width: 20px;
                    height: 20px;
                    background-color: #D93C3C;
                    border-radius: 50%;
                    padding: 5px;
                    cursor: pointer;
                }
            }

            .myinput {
                height: 30px;
                // border: none;
                margin-top: 22px;
                margin-left: 30px;

                :deep(.el-input__wrapper) {
                    box-shadow: 0 0 0 0px var(--el-input-border-color, var(--el-border-color)) inset;
                    border-radius: 13px;
                    background-color: #E33E3E;
                    cursor: default;

                    .el-input__inner {
                        color: #fff;
                        cursor: default !important;
                    }
                }

            }

            .ht {
                width: 18px;
                height: 18px;
                margin-top: 22px;
                margin-left: 10px;
                background-color: #D93C3C;
                border-radius: 50%;
                padding: 6px;
                cursor: pointer;
            }
        }
    }
}

:deep(.el-icon) {
    color: #fff;
    font-size: 15px;
}
</style>