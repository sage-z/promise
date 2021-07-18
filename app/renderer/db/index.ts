import { createRxDatabase, addRxPlugin, RxDatabase } from "rxdb/plugins/core"

import * as PouchdbAdapterIdb from 'pouchdb-adapter-idb';
addRxPlugin(PouchdbAdapterIdb);
import * as PouchdbAdapterHttp from 'pouchdb-adapter-http';
addRxPlugin(PouchdbAdapterHttp);
import { RxDBReplicationPlugin } from 'rxdb/plugins/replication';
addRxPlugin(RxDBReplicationPlugin);
import { RxDBLeaderElectionPlugin } from 'rxdb/plugins/leader-election';
addRxPlugin(RxDBLeaderElectionPlugin);

import { RxDBNoValidatePlugin } from 'rxdb/plugins/no-validate';
import { RxDBEncryptionPlugin } from 'rxdb/plugins/encryption';
addRxPlugin(RxDBEncryptionPlugin);
import { RxDBQueryBuilderPlugin } from 'rxdb/plugins/query-builder';
addRxPlugin(RxDBQueryBuilderPlugin);


import requestSchema from './request'


// dev

import { RxDBDevModePlugin } from 'rxdb/plugins/dev-mode'
// import { RxDBValidatePlugin } from 'rxdb/plugins/validate'
addRxPlugin(RxDBDevModePlugin)
// addRxPlugin(RxDBValidatePlugin)




async function createDatabase(name: string) {
    // then we also need the leader election

    const db = await createRxDatabase({
        name: 'promise_' + name,
        adapter: 'idb',
        password: 'myLongAndStupidPassword'
    });

    await db.addCollections({
        request: { schema: requestSchema }
    });
    return db;
}



let _getDatabase: Promise<RxDatabase>;
export function getDatabase(name?: string) {
    if (!_getDatabase) _getDatabase = createDatabase(name);
    return _getDatabase;
}