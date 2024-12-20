import { MutableRefObject, useRef, useState } from 'react'
import api from '../services/api'

//interface User {
//    id: Key,
//    name: string,
//    email: string,
//    password: string
//}

export default function Login () {
    const [error, setError] = useState('')

    const inEmail = useRef() as MutableRefObject<HTMLInputElement>
    const inPassword = useRef() as MutableRefObject<HTMLInputElement>

    async function TryLogin () {
        const callback = await api.post('/login', {
            email: inEmail.current.value,
            password: inPassword.current.value
        })

        setError(callback.data)
    }

    return (
        <form>
            <div className='content'>
                <h1>Login</h1>

                <label htmlFor="inEmail" id='labelEmail'>
                    <p>Email</p>
                    <input type='text' name='email' id='inEmail' ref={inEmail} />
                </label>

                <label htmlFor="inPassword" id='labelPassword'>
                    <p>Password</p>
                    <input type='text' name='password' id='inPassword' ref={inPassword} />
                </label>
            </div>
            {error}
            <button type='button' onClick={TryLogin}> Login </button>
        </form>
    )
}