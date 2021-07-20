
import { getDatabase } from './db';
import render from './view/App';

import './public/css/font.css'
import './public/css/antd.min.css'

(async function run() {

    // 获取初始化配置
    const bookname = await api.getProjectName();

    // 初始化数据库
    await getDatabase( bookname?bookname:'common' );

    // 初始化插件
    // api.Books.set("hhh","add")
    // console.log(api.Books.store)


    render()
})();
