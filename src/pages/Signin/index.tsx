import { useState, useRef, MutableRefObject } from 'react'

import api from '../../services/api'
import useAuth from '../../hooks/useAuth'

import Input from '../../components/Input'
import Button from '../../components/Button'

export default function Signin () {
    const [error, setError] = useState('')
    const { signIn } = useAuth()

    const inEmail = useRef() as MutableRefObject<HTMLInputElement>
    const inPassword = useRef() as MutableRefObject<HTMLInputElement>

    async function handleSignin () {
        const callback = await api.post('/user/login', {
            email: inEmail.current.value,
            password: inPassword.current.value
        })

        if (callback.data.error) {
            setError(callback.data.error)
        }
        else {
            const token = Math.random().toString(36).substring(2);

            const userData = {
                id: callback.data.id as string,
                name: callback.data.name as string,
                email: callback.data.email as string
            } as any

            if (callback.data.email.includes('@admin')) {
                userData.admin = true
            }
            
            signIn(userData, token)
        }
    }

    return (
        <main id="Signin">
            <form>
                <div className='content'>
                    <h1>Sign In</h1>
                    <Input icon='rs-envelope' name='email' type='email' className='input' placeholder='Email' ref={inEmail} />
                    <Input icon='rs-lock' name='password' type='password' className='input' placeholder='Password' ref={inPassword} />

                    <div className="errorMesage">{error}</div>
                
                    <Button type='button' onClick={handleSignin} label='Sign In' />

                    <p className='questionAccont'>Don't have an account? <a href='/signup'>&nbsp;Sign Up&nbsp;</a></p>
                </div>              
            </form>
        </main>
    )
}

import './style.css'
