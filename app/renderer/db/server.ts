// import { createRxDatabase, addRxPlugin, RxDatabase } from "rxdb/plugins/core"
// import { is } from 'electron-util'
// import bookSchema from './books'
// import * as PouchdbAdapterLeveldb from 'pouchdb-adapter-leveldb';
// addRxPlugin(PouchdbAdapterLeveldb);
// // import { RxDBServerPlugin } from 'rxdb/plugins/server';
// // addRxPlugin(RxDBServerPlugin);
// import { RxDBQueryBuilderPlugin } from 'rxdb/plugins/query-builder';
// addRxPlugin(RxDBQueryBuilderPlugin);
// import { RxDBEncryptionPlugin } from 'rxdb/plugins/encryption';
// addRxPlugin(RxDBEncryptionPlugin);

// import { RxDBNoValidatePlugin } from 'rxdb/plugins/no-validate';
// // import { RxDBReplicationPlugin } from 'rxdb/plugins/replication';s

// import { RxDBDevModePlugin } from 'rxdb/plugins/dev-mode'
// import { RxDBValidatePlugin } from 'rxdb/plugins/validate'

//     // addRxPlugin(RxDBReplicationPlugin);


// if (is.development) {

//         // add dev-mode plugin
//         // which does many checks and add full error-messages
//         addRxPlugin(RxDBDevModePlugin)

//         // we use the schema-validation only in dev-mode
//         // this validates each document if it is matching the jsonschema
//         addRxPlugin(RxDBValidatePlugin)
// } else {
//     // in production we use the no-validate module instead of the schema-validation
//     // to reduce the build-size
//     addRxPlugin(RxDBNoValidatePlugin);
// }

// export async function createServerDatabase() {
//     try {
        
//         const leveldown = require('leveldown');
//         const db = await createRxDatabase({
//             name: 'data/promise',
//             adapter: leveldown,
//             password: 'myLongAndStupidPassword'
//         });
//         await db.addCollections({
//             books: { schema: bookSchema }
//         });
    
        
//   const res = await db.books.insert({
//     name: new Date().toISOString(),
//     color: '#032c33',
//     open: 0
// });
    
//             // console.log('res', db.books)
//         // db.server({
//         //     path: '/db',
//         //     port: 10102,
//         //     cors: true,
//         //     startServer: true, // (optional), start express server
//         //     // options of the pouchdb express server
//         //     // pouchdbExpressOptions: {
//         //     //     inMemoryConfig: true, // do not write a config.json
//         //     //     logPath: '/tmp/rxdb-angular-server-log.txt' // save logs in tmp folder
//         //     // }
//         // });
//         return db;
//     } catch (error) {
//         console.log('error', error)
//     }

// }


// let _getDatabase: Promise<RxDatabase>;
// export function getDatabase() {
//     if (!_getDatabase) _getDatabase = createServerDatabase();
//     return _getDatabase;
// }