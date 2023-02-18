import 'rsuite/dist/rsuite.min.css'

import { AppHeader } from './../components/AppHeader/index'
import './globals.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head />
            <body>
                <div id="container">
                    <AppHeader />
                    {children}
                </div>
            </body>
        </html>
    )
}
