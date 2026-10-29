
import "server-only";

import {
  getApps,
  initializeApp,
  applicationDefault,
} from "firebase-admin/app";

import { getFirestore } from "firebase-admin/firestore";

const app = getApps()[0] ?? initializeApp({
  credential: applicationDefault(),
  projectId: process.env.GOOGLE_CLOUD_PROJECT,
});

export const db = getFirestore(app);