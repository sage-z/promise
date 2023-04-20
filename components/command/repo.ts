// repository
// 暂时

import { getDatabase } from "@/db";

export default {
    name: 'repository',
    command: [
        {
            name: 'create',
            action: (name) => {
                if(!name) throw 'must have name'
                // if()
                getDatabase()
                .then(db => {
                    let tempDoc = db.hero.newDocument({
                        name: ''
                    });

                })
            },
            paramDesc: '[name]',
            shortcutKey: 'string',
            describe: "创建一个新库"
        }
    ]
}