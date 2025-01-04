import { useEffect, useState, useRef } from 'react'

import api from '../../services/api'
import useAuth from '../../hooks/useAuth'

import Link from '../../components/Link'
import Input from '../../components/Input'
import Button from '../../components/Button'

interface User {
    id: string
    name: string
    email: string
    admin: boolean
}

interface Shopping {
    id: string
    platform: string
    quantity: number
    value: number
    date: Date
}

export default function User () {
    let user = JSON.parse(localStorage.getItem('user') as string) as User
    const [nick, setNick] = useState<string>()
    const [shopping, setShopping] = useState<Shopping[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    async function fetchUser () {
        if (!user) {
            setLoading(false)
            return (
                <>
                    <p>Not Logged</p>
                    <Link href='/user/signin' text='Signin' />
                    <Link href='/user/signup' text='Signup' />
                </>
            )
        }
        else {
            let res = await api.get(`/user/${user.id}`)
            let [shopping, nickname] = [res.data.shopping, res.data.nick]

            if (nickname) {
                setNick(nickname)
            }

            if (res.data.shopping) {
                shopping = res.data.shopping.map((shop: any) => {
                    return {
                        ...shop,
                        date: new Date(shop.date)
                    }
                })
                setShopping(shopping)
            }
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchUser()
    }, [])

    let { admin } = user

    let inNick = useRef<HTMLInputElement>(null)
    async function saveNick () {
        if (!inNick.current) {
            return
        }
        else {
            if (!inNick.current.value) {
                return
            }
            else {
                let res = await api.put(`/user/${user.id}`, {
                    nick: inNick.current.value
                })
                if (res.status === 200) {
                    setNick(inNick.current.value)
                }
            }
        }
        
        console.log()
    }

    const { signOut } = useAuth()

    if (loading) return <div id='User'>Loading...</div>
    
    return (
        <div id='User'>
            {user ? (
                <>
                    <div className="profile">
                        <aside className='bannerAvatar'>
                            <div className="banner">
                                <div className="img"></div>
                            </div>
                        </aside>
                        <aside>
                            <div className="userData">
                                <div className='data name'><span>Name:</span>{user.name}</div>
                                <div className='data email'><span>Email:</span>{user.email}</div>
                                <div className='data password'>
                                    <span>Password:</span>**********
                                    <Link className='link recoverPassword' href='' text='Recover' />
                                </div>
                                <div className='data nick'><span>Nick:</span>
                                    {nick ? 
                                        nick
                                    : 
                                        <form>
                                            <Input name='nick' type='text' ref={inNick} />
                                            <Button type='button' label='Save Nick' onClick={saveNick} />
                                        </form>
                                    }
                                </div>
                            </div>
                            
                            <div className="buttons">
                                <Link className="link signout" href='/' text="Sign Out" onClick={signOut} />
                                {admin ? <Link className='link admin' href='/admin' text='Admin Page' /> : null}
                            </div>
                        </aside>
                        
                    </div>

                    <div className="table">
                        <h2>Shopping</h2>
                        {shopping.length > 0 ?
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Date</th>
                                            <th>Quantity</th>
                                            <th>Value</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {shopping.map(shop => (
                                            <tr key={shop.id}>
                                                <td>{shop.date.toLocaleDateString()}</td>
                                                <td>{shop.quantity}</td>
                                                <td>R${shop.value.toFixed(2)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                        : 'No Shopping Data'}
                    </div>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    )
}

import './style.css'