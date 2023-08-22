<template>
    <div class="ssl">
        <div class="ssl-header">
            <h1>SSL</h1>
            <el-button type="primary"  style="margin-left: auto;margin-right: 10px;">新建配置</el-button>
        </div>
    </div>
</template>
    
<script setup lang='ts'>
import { ref, reactive } from 'vue'

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
</style>