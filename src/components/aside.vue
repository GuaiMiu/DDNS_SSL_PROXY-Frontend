<template>
    <el-menu :default-active="activeShow" class="el-menu-vertical-demo" :collapse="isCollapse" style="margin-left: 0;">
        <h1 style="text-align: center;" @click="isCollapse = !isCollapse">该休息了</h1>
        <el-menu-item index="ddns" @click="Open('ddns')">
            <el-icon><icon-menu /></el-icon>
            <template #title>DDNS</template>
        </el-menu-item>
        <el-menu-item index="ssl" @click="Open('ssl')">
            <el-icon>
                <document />
            </el-icon>
            <template #title>SSL</template>
        </el-menu-item>
        <el-menu-item index="proxy" @click="Open('proxy')">
            <el-icon>
                <MapLocation />
            </el-icon>
            <template #title>Proxy</template>
        </el-menu-item>
        <el-menu-item index="settings" @click="Open('settings')">
            <el-icon>
                <setting />
            </el-icon>
            <template #title>Settings</template>
        </el-menu-item>
    </el-menu>
</template>

<script setup lang='ts'>
import { ref, reactive } from 'vue'
import {
    Document,
    Menu as IconMenu,
    MapLocation,
    Setting,
} from '@element-plus/icons-vue'
const isCollapse = ref(false)


const activeShow = ref('ddns')

const emit = defineEmits(['on-click'])

const Open = (comId:string) => {
    activeShow.value = comId
    emit('on-click', activeShow)
}
</script>

<style scoped></style>