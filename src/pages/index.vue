<script setup>
import { storeToRefs } from "pinia";
import { useUserStore } from "~/store/user";
import { ElMessage } from "element-plus";
import { grant_type, client_id, client_secret } from "~/config/sign";
const userStore = useUserStore();

const { count } = storeToRefs(userStore);

onMounted(() => {});

</script>

<template>
  <div class="h-screen w-full gap-5">
    <h1>Hello Start demo!</h1>

    <h2>
      Count:
      <span
        class="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600"
      >
        {{ count }}
      </span>
    </h2>
    <el-button type="primary" @click="() => userStore.setCount()"
      >add value
    </el-button>
    <!-- <UploadTest /> -->
    <UploadTestNew />
  </div>
</template>

<style lang="less" scoped></style>
