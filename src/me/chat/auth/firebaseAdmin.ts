import * as firebase from 'firebase-admin';
import * as fs from 'fs';
import * as path from 'path';

const serviceAccount: any = JSON.parse(
  fs.readFileSync(path.resolve('serviceAccountKey.json'), 'utf-8'),
);

const firebase_params = {
  type: serviceAccount.type,
  projectId: serviceAccount.project_id,
  privateKeyId: serviceAccount.private_key_id,
  privateKey: serviceAccount.private_key,
  clientEmail: serviceAccount.client_email,
  clientId: serviceAccount.client_id,
  authUri: serviceAccount.auth_uri,
  tokenUri: serviceAccount.token_uri,
  authProviderX509CertUrl: serviceAccount.auth_provider_x509_cert_url,
  clientC509CertUrl: serviceAccount.client_x509_cert_url,
};

const defaultApp = firebase.initializeApp({
  credential: firebase.credential.cert(firebase_params),
  databaseURL: 'https://bartr-v1-default-rtdb.firebaseio.com',
});

export { defaultApp };
