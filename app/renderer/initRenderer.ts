import { getDatabase } from './db';
import renderApp from './view/App';
export default async (name) => {
    // 初始化配置

    // 初始化数据库

    await getDatabase( name );
    // 初始化插件
    renderApp()

}