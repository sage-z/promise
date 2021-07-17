import Store = require('electron-store');

// const bookSchema: JSONSchema = {
//     type: "array",
//     items: {
//         "type": "object"
//     }
//  }

export const Books = new Store({
    name: 'books',
    encryptionKey: 'calends',
    defaults: { books: []}
});