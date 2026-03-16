"use client"

import Link from "next/link"
import Button from "../Button/Button"
import { useEffect, useState } from "react"
import { createClient } from "@/app/auth/client"
import { signOut } from "@/app/actions/actions"
import { useRouter, usePathname } from "next/navigation"

export default function NavBar() {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const router = useRouter()
    const pathname = usePathname()

    useEffect(() => {
        const supabase = createClient()

        supabase.auth.getUser().then(({ data: { user } }) => {
            setUser(user)
            setLoading(false)
        })
    }, [pathname]) // ri-controlla l'auth ad ogni cambio pagina

    const handleSignOut = async () => {
        await signOut()
        setUser(null)
        router.push("/")
    }

    return (
        <nav className="flex items-center justify-between px-6 md:px-16 py-5">

            <Link href="/" className="font-bold text-2xl tracking-tight" style={{ fontFamily: "var(--font-lora)" }}>
                ditto
            </Link>

            {!loading && (
                <div className="flex items-center gap-2">
                    {user ? (
                        <>
                            <Button link="/dashboard" variant="secondary" className="!px-4 !py-2 !text-sm">
                                Dashboard
                            </Button>
                            <Button onClick={handleSignOut} className="!px-4 !py-2 !text-sm">
                                Sign out
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button link="/login" variant="secondary" className="!px-4 !py-2 !text-sm">
                                Login
                            </Button>
                            <Button link="/signup" className="!px-4 !py-2 !text-sm">
                                Sign up
                            </Button>
                        </>
                    )}
                </div>
            )}

        </nav>
    )
}
