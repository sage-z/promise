import Store = require('electron-store');

// const bookSchema: JSONSchema = {
//     type: "array",
//     items: {
//         "type": "object"
//     }
//  }

export const globalConfig = new Store({
    encryptionKey: 'promise',
});

export const repositoryConfig = new Store({
    name:'repository',
    encryptionKey: 'promise',
});