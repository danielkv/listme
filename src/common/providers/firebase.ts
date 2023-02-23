import adminApp from 'firebase-admin'
import { getApps } from 'firebase-admin/app'
import { getStorage } from 'firebase-admin/storage'

if (!getApps().length) {
    adminApp.initializeApp({
        credential: adminApp.credential.cert({
            projectId: process.env.FB_PROJECT_JD,
            privateKey: process.env.FB_PRIVATE_KEY,
            clientEmail: process.env.FB_CLIENT_EMAIL,
        }),
    })
}

export const storage = getStorage().bucket(process.env.FB_BUCKET_NAME)
export const db = adminApp.firestore()
export const admin = adminApp
