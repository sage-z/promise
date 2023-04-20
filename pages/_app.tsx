import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { createRxDatabase } from 'rxdb';
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';

const myDatabase = await createRxDatabase({
  name: 'heroesdb',
  storage: getRxStorageDexie()
});

const GlobalDatabase = await createRxDatabase({
    name: 'globaldb',
    storage: getRxStorageDexie()
  });
  
//   const myCollections = await GlobalDatabase.addCollections({
//     humans: {
//       schema: GlobalDatabase
//     },
//   });

const myDatabae = await createRxDatabase({
    name: 'heroesdbdddddddd',
    storage: getRxStorageDexie()
  });
  
export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
