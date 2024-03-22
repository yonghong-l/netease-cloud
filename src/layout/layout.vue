<template>
    <div class=" w-full box-border ">
      <router-view v-if="$route.meta.keepAlive" v-slot="{ Component }">
        <transition name="move" mode="out-in">
          <keep-alive>
            <component :is="Component"></component>
          </keep-alive>
        </transition>
      </router-view>

      <router-view v-if="!$route.meta.keepAlive" v-slot="{ Component }">
        <transition>
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
</template>
<script setup></script>
<style lang="less" scoped>
</style>
