import React, { createContext, useState, ReactNode, useEffect } from 'react'

interface AuthContextData {
    user?: {
        id: string
        name: string
        email: string
    } | null
    token: string | null
    signed: boolean
    signIn(user: { id: string; name: string; email: string }, token: string): void
    signOut(): void
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<{ id: string; name: string; email: string } | null>(null)
    const [token, setToken] = useState<string | null>(null)

    useEffect(() => {
        const storedUser = localStorage.getItem('user')
        const storedToken = localStorage.getItem('token')

        if (storedUser && storedToken) {
            setUser(JSON.parse(storedUser))
            setToken(storedToken)
        }
    }, [])

    const signIn = (user: { id: string; name: string; email: string; admin?: boolean }, token: string) => {
        setUser(user)
        setToken(token)
        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('token', token)

        if (user.admin) {
            window.location.href = '/admin'
        }
        else {
            window.location.href = '/'
        }
    }

    const signOut = () => {
        setUser(null)
        setToken(null)
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        window.location.href = '/'
    }

    return (
        <AuthContext.Provider value={{ user, signed: !!user, token, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    )
}