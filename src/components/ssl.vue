<template>
    <div class="ssl">
        <div class="ssl-header">
            <h1>SSL</h1>
            <el-button type="primary" style="margin-left: auto;margin-right: 10px;" @click="openNewConfig">新建配置</el-button>
        </div>
        <el-dialog v-model="isConfigDialog" title="新建配置">


        </el-dialog>
        <div class="ssl-body">

            <el-table :data="tableData" border style="width: 100%">
                <el-table-column prop="ID" label="配置名" width="120" />
                <el-table-column prop="CREATED_TIME" label="创建时间" width="180" />
                <el-table-column prop="DOMAIN" label="域名" width="180" />
                <el-table-column prop="DNS" label="服务商" width="180" />
                <el-table-column prop="STATUS" label="状态" />
                <el-table-column fixed="right" label="操作" width="120">
                    <template #default="scope">
                        <el-button link type="primary" size="small" @click="handleClick(scope.$index)">编辑</el-button>
                        <el-popconfirm title="确定删除配置？?" confirm-button-text="Yes" cancel-button-text="No" :icon="InfoFilled"
                            icon-color="#626AEF" @confirm="deleteConfig(scope.$index)">
                            <template #reference>
                                <el-button link type="primary" size="small">删除</el-button>
                            </template>
                        </el-popconfirm>

                    </template>
                </el-table-column>
            </el-table>



        </div>

    </div>
</template>
    
<script setup lang='ts'>
import { ref, reactive } from 'vue'
//新建配置Dialog 默认隐藏
const isConfigDialog = ref(false)x
//打开dialog
const openNewConfig = () => {
    isConfigDialog.value = true
}
</script>
    
<style scoped>
.ssl {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
}

.ssl .ssl-header {
    display: flex;
    width: 100%;
    align-items: center;
}


.ssl .ssl-body {
    width: 100%;
    border: 1px solid #ccc;
}

</style>