<template>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      :ellipsis="false"
      @select="handleSelect"
    >
      <el-menu-item index="0">LOGO</el-menu-item>
      <div class="flex-grow" />
      <el-sub-menu index="2">
        <template #title>USERNAME</template>
        <el-menu-item index="2-1">设置</el-menu-item>
        <el-menu-item index="2-3" @click="logout">退出登录</el-menu-item>
      </el-sub-menu>
    </el-menu>
  </template>
  
  <script lang="ts" setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router';
  const Router = useRouter()
  const activeIndex = ref('1')
  const handleSelect = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
  }


  const logout = () => {
    localStorage.removeItem('token')
    Router.push({ name: 'Login' })
  }
  </script>
  
  <style>
  .flex-grow {
    flex-grow: 1;
  }
  
  </style>
  