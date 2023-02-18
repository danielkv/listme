import adminApp from 'firebase-admin'
import { getApps } from 'firebase-admin/app'

if (!getApps().length) {
    adminApp.initializeApp({
        credential: adminApp.credential.cert({
            projectId: process.env.FB_PROJECT_JD,
            privateKey: process.env.FB_PRIVATE_KEY,
            clientEmail: process.env.FB_CLIENT_EMAIL,
        }),
    })
}

export const db = adminApp.firestore()
export const admin = adminApp
