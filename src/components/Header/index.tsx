import Link from "../Link"
import useAuth from "../../hooks/useAuth"

export default function Header() {
    const { signed, signOut } = useAuth()

    return (
        <header>
            <nav>
                <Link className="navLinks" href="/" text="Home" />

                {signed ? (
                    <>
                        <Link className="navLinks" href="/shopping" text="Shopping" />
                        <Link className="navLinks" href="/user" text="User" />
                        <Link className="navLinks" href='/' text="Sign Out" onClick={signOut} />
                    </>
                ) : (
                    <>
                        <Link className="navLinks" href="/user/signin" text="Signin" />
                        <Link className="navLinks" href="/user/signup" text="Signup" />
                    </>
                )}
            </nav>
        </header>
    )
}

import './style.css'