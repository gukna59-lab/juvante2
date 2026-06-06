import 'dotenv/config';
import admin from 'firebase-admin';
import fs from 'fs';

const config = JSON.parse(fs.readFileSync('./firebase-applet-config.json', 'utf8'));

admin.initializeApp({
  projectId: config.projectId
});

import { getFirestore } from 'firebase-admin/firestore';

const db = getFirestore(admin.app(), config.firestoreDatabaseId);

async function test() {
  try {
    await db.collection('users').doc('admin_test').set({ hello: 'world' });
    console.log('Admin Success!');
    process.exit(0);
  } catch (e) {
    console.error('Admin Failure:', e);
    process.exit(1);
  }
}
test();
