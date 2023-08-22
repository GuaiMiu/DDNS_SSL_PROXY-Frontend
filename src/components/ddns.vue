<template>
    <div class="ddns">
        <el-dialog v-model="isConfigDialog" title="新建配置">
            <el-form-item label="配置名">
                <el-input placeholder="请输入配置名" clearable v-model="Config.ID" />
            </el-form-item>
            <el-form-item label="域名:">
                <el-input placeholder="请输入主域名" clearable v-model="Config.DOMAIN" />
            </el-form-item>
            <el-form-item label="记录类型">
                <el-input placeholder="请输入记录类型" clearable v-model="Config.RECORD_TYPE" />
            </el-form-item>
            <el-form-item label="服务商:">
                <el-select v-model="Config.DNS" placeholder="请选择你的域名服务商" clearable @change="changeService" @clear="clear">
                    <el-option v-for="(item, index) in mockDns" :label="item.SERVICE_NAME" :value="index" />
                </el-select>
            </el-form-item>

            <div v-if="isKeyShow">
                <div v-for="(item, index) in mockDns[service].KEY">
                    <el-form-item :label="item">
                        <el-input :placeholder="`请输入${item}`" clearable v-model="Config[item]" />
                    </el-form-item>

                </div>
                <el-link type="primary" :href="helpurl" target="_blank">点我创建密钥</el-link>
            </div>
            <div class="dialog-footer">
                <el-button @click="test" style="margin-left: auto;">提交</el-button>
            </div>

        </el-dialog>

        <div class="ddns-header">
            <h1>DDNS</h1>
            <el-button type="primary" @click="openNewConfig" style="margin-left: auto;margin-right: 10px;">新建配置</el-button>
        </div>
        <div class="ddns-body">
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
import { InfoFilled } from '@element-plus/icons-vue'
import { ref, reactive, onMounted } from 'vue'
import { GetServiceConfig, POSTConfig, GetConfig, DELETEConfig } from '@/request/api'
import { ElMessage } from 'element-plus';
//获取密钥连接
const helpurl = ref('')
let mockDns = reactive([])
const tableData = ref([])
//获取配置和服务商所需要配置
onMounted(() => {
    GetServiceConfig({
        data: "GetServerConfig"
    }).then(res => {
        mockDns = reactive(res.data)
    }).catch(err => {
        ElMessage.error(err)
    })

    GetConfig({
        data: "GetConfig"
    }).then(res => {
        console.log(Object.values(res.data))
        tableData.value = Object.values(res.data)
    }).catch(err => {
        ElMessage.error(err)
    })

})

//编辑
const handleClick = (index: number) => {
    console.log(index)
}
//新建配置
//新建配置Dialog 默认隐藏
const isConfigDialog = ref(false)
//打开新建配置 默认腾讯云
const service = ref(0)
const isKeyShow = ref(false)
//打开dialog
const openNewConfig = () => {
    isConfigDialog.value = true
}
const Config = reactive({
})

//清空 配置项
const clear = () => {
    isKeyShow.value = false
}




const newConfig = () => {

}

//切换服务商
const changeService = (val: number) => {
    //除了domain,dns其他都清空
    for (const key in Config) {
        if (key != 'DOMAIN' && key != 'DNS' && key != 'ID' && key != 'RECORD_TYPE') {
            delete Config[key]
        }
    }

    //    console.log(typeof (val));
    //select 中的clear清除后为string 如果不判断 下面赋值url会报错
    if (typeof (val) == 'number') {
        isKeyShow.value = true
        service.value = val
        helpurl.value = mockDns[val].HELP_URL
    }

}

//提交
const test = () => {
    const reg = /^(?=^.{3,255}$)[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+$/;
    if (!reg.test(Config.DOMAIN)) {
        ElMessage.error('请输入正确的域名')
        return false
    }
    //将服务商名字赋值
    Config.DNS = mockDns[service.value].SERVICE_NAME
    //提起子域 和主域名
    const subdomains = Config.DOMAIN.split(".");
    const subdomain = subdomains.length > 2 ? subdomains[0] : "@";

    Config.SUB_DOMAIN = subdomain

    Config.DOMAIN = subdomains.slice(-2).join(".");


    //添加创建时间
    Config.CREATED_TIME = new Date().toLocaleString()
    //添加状态
    Config.STATUS = ''
    POSTConfig(Config).then(res => {
        console.log(res)
    })
    //提交成功后重新获取数据
    GetConfig({
        data: "GetConfig"
    }).then(res => {
        console.log(Object.values(res.data))
        tableData.value = Object.values(res.data)
    }).catch(err => {
        ElMessage.error(err)
    })
    //关闭Dialog
    isConfigDialog.value = false
}
//删除配置
const deleteConfig = (index: number) => {
    //删除配置

    console.log(tableData.value[index]);

    DELETEConfig({
        delid: tableData.value[index].ID,
    }).then(res => {
        console.log(res)
        tableData.value.splice(index, 1)
    })
}
</script>

<style scoped>
.ddns {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
}

.ddns .ddns-header {
    display: flex;
    width: 100%;
    align-items: center;
}

.ddns .ddns-body {
    width: 100%;
    border: 1px solid #ccc;
}


.dialog-footer {
    display: flex;
    margin-top: 10px;
}
</style>