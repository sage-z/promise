
import { getDatabase } from './database';
import render from './view/App';

import '../public/css/font.css'

(async function run() {

    // 获取初始化配置
    const bookname = await api.getProjectName();

    // 初始化数据库
    await getDatabase( bookname?bookname:'common' );

    // 初始化插件


    render()
})();
