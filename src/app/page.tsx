'use client'

import Link from 'next/link'
import { Button } from 'rsuite'

export default function Home() {
    return (
        <main className="flex items-center flex-col gap-3 flex-1 justify-center">
            <Link href="/create-list">
                <Button
                    as="div"
                    appearance="primary"
                    style={{ backgroundColor: '#26bea6' }}
                    size="lg"
                >
                    Criar nova lista
                </Button>
            </Link>
        </main>
    )
}
