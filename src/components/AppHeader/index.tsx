'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Button } from 'rsuite'

export function AppHeader({}) {
    return (
        <div className="bg-slate-800 p-6 flex justify-between items-center">
            <div>
                <Link href="/">
                    <Image alt="ListMe" src="/listme-logo.png" width={167} height={50} />
                </Link>
            </div>
            <div className="">
                <Link href={'/create-list'}>
                    <Button style={{ backgroundColor: '#26bea6' }} appearance="primary" as="div">
                        Criar nova lista
                    </Button>
                </Link>
            </div>
        </div>
    )
}
