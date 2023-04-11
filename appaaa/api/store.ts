import Store = require('electron-store');

// const bookSchema: JSONSchema = {
//     type: "array",
//     items: {
//         "type": "object"
//     }
//  }

export const userConfig = new Store({
});

export const repositoryConfig = new Store({
    name:'repository',
    encryptionKey: 'promise',
});