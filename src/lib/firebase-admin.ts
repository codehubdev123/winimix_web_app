import "server-only";
import admin from "firebase-admin";
type FirebaseAdminAppParam = {
  projectId: string;
  clientEmail: string;
  storageBucket: string;
  privateKey: string;
};
if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      }),
      databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseio.com`,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    });
  } catch (error) {
    console.error("Firebase admin initialization error", error.stack);
  }
}

export const adminDb = admin.firestore();
export const adminAuth = admin.auth();
export default admin;
