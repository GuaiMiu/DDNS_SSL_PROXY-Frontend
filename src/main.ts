// import './assets/main.css'
import 'normalize.css/normalize.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'



const whiteList = ['/login']
router.beforeEach((to, from, next) => {
    if (whiteList.includes(to.path) || localStorage.getItem('token')) {
        next()
    } else {
        next('/login')
    }
})


const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.use(router)
app.use(ElementPlus)
app.mount('#app')


