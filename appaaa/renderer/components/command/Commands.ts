
export interface Command {
    name: string
    action: Function
    paramDesc? :string
    shortcutKey?: string
    describe? : string
}

class Commands extends Map<string, Map<string, Command>> {


    registered(model:string, command: Command[]){
        let m = new Map<string, Command>()
        for (let i = 0; i < command.length; i++) {
            const element = command[i];
            m.set(element.name, element)
        }
        this.set(model, m)
    }

    getList(){
        let list = []
        this.forEach((value, key )=> {
            value.forEach((val) => {
                list.push({
                    command: `${key} ${val.name}`,
                    shortcutKey: val.shortcutKey,
                    paramDesc: val.paramDesc,
                    describe: val.describe
                })
            })
        });
        return list
    }

    async exec(command:string, ...arg){
        let l = command.trim().replace(/\s+/g, ' ').split(' ')
        if (!this.has(l[0])) throw "There is no such module"

        if (!this.get(l[0]).has(l[1])) throw "There is no such order"

        this.get(l[0]).get(l[1]).action(...l.slice(2))
        
        
    }
}

export default Commands