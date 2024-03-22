<template>
  <div class="auth">
    <img class="iconimg" :src="iconimg" />
    <label class="tips-label">{{ tips }}</label>
  </div>
</template>

<script setup>
// import develop_icon from "@/assets/no-data-icon/loading-html.svg";
// import error_icon from "@/assets/no-data-icon/no-permission.svg";
// import { codeLogin } from "@/request/admin";
const iconimg = ref("");
</script>

<style lang="less" scoped>
.auth {
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.iconimg {
  height: 275px;
  width: 275px;
}

.tips-label {
  font-size: 24px;
  margin-top: 0.5rem;
  color: #d6d6d6;
}
</style>
