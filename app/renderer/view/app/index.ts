import { getDatabase } from '../../db';
import renderApp from './App';

interface Module {
    name: string
    version: string
    editer
    module : {
        http: any
    }
    
}

export default async (name) => {
    // 初始化配置

    // 初始化数据库

    await getDatabase( name );

    // await addModules()
    // 初始化插件
    renderApp()
}


// 导航图标 全局任务  视图  持久化文件结构
const addModules = async (config, ) => {
    config.modules
    
}