import Store = require('electron-store');

// const bookSchema: JSONSchema = {
//     type: "array",
//     items: {
//         "type": "object"
//     }
//  }

export const Books = new Store({
    name: './sadfsfa/bookss',
    encryptionKey: 'promise',
    defaults: { books: []}
});       