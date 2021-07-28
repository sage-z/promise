// repository
// 暂时

export default {
    name: 'repository',
    command: [
        {
            name: 'create',
            action: (name) => {
                console.log(name)
            },
            paramDesc: '[name]',
            shortcutKey: 'string',
            describe: "创建一个新库"
        }
    ]
}