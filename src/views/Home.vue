<template>
    <div class="common-layout">
        <el-container style="height: 100vh;">
            <el-header>
                <Menu></Menu>
            </el-header>
            <el-container>
                <!-- element aside侧边线百分之百 -->
                <el-aside width="200px">
                    <Aside @on-click="getList"></Aside>
                </el-aside>
                <el-container>
                    <el-main>
                        <component :is="tab[comId].comName"></component>
                    </el-main>
                    <el-footer>别看看就是没有</el-footer>
                </el-container>
            </el-container>
        </el-container>
    </div>
</template>

<script setup lang='ts'>
import { ref, reactive, markRaw } from 'vue'
import Menu from '@/components/menu.vue';
import Aside from '@/components/aside.vue';
import ddns from '@/components/ddns.vue';
import ssl from '@/components/ssl.vue';
import proxy from '@/components/proxy.vue';
import settings  from '@/components/settings.vue';
import type { Ref } from 'vue'
const comId = ref(0)

const tab = reactive([
    {
    name: "ddns",
    comName: markRaw(ddns)
    }, 
    {
    name: "ssl",
    comName: markRaw(ssl)
    },
    {
    name: "proxy",
    comName: markRaw(proxy)
    },
    {
    name: "settings",
    comName: markRaw(settings)
    }

])

const getList = (activeShow:Ref) => {
    if(activeShow.value == "ddns"){
        comId.value = 0
    }else if(activeShow.value == "ssl"){
        comId.value = 1
    }else if(activeShow.value == "proxy"){
        comId.value = 2
    }else if(activeShow.value == "settings"){
        comId.value = 3
    }
}
</script>

<style scoped>.common-layout {
    height: 100%;
}</style>