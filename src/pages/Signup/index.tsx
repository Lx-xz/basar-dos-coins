import { useState, useRef, MutableRefObject } from 'react'

import api from '../../services/api'

import Input from '../../components/Input'
import Button from '../../components/Button'
import ProgressBar from '../../components/ProgressBar'

export default function Signup () {
    const [error, setError] = useState('')
    const [passwordStrenght, setPasswordStrenght] = useState(0)

    const inName = useRef() as MutableRefObject<HTMLInputElement>
    const inEmail = useRef() as MutableRefObject<HTMLInputElement>
    const inPassword = useRef() as MutableRefObject<HTMLInputElement>

    function validatePassword () {
        setError('')
        setPasswordStrenght(0)

        const passwordInValidation = inPassword.current.value

        const uppercase = /[A-Z]/.test(passwordInValidation)
        const lowercase = /[a-z]/.test(passwordInValidation)
        const special = /[.,@#_]/.test(passwordInValidation)
        const numbers = /[0-9]/.test(passwordInValidation)

        const space = passwordInValidation.includes(' ')
        const prohitibedChars = ['!', '$', '%', '^', '&', '*', '(', ')', '+', '-', '=', '[', ']', '{', '}', ';', ':', '"', '¨', '\\', '|', ',', '<', '>', '/', '?']
        let hasProhibitedChars = false

        if (space) {
            setError('Password cannot contain spaces')
        }

        prohitibedChars.map(char => {
            if (passwordInValidation.includes(char)) {
                setError('Password can only contain letters, numbers and special characters: ., @, #, _')
                hasProhibitedChars = true
            }
        })

        if (space || hasProhibitedChars) {
            setPasswordStrenght(1)
        }
        else
        {
            let strength = 0
            if (passwordInValidation.length > 0 && passwordInValidation.length < 8) {
                return setPasswordStrenght(1)
            }
            if (passwordInValidation.length >= 8) {
                if (uppercase) strength++
                if (lowercase) strength++
                if (special) strength++
                if (numbers) strength++

                setPasswordStrenght(strength)
            }
        }
    }

    async function Signup () {
        if (inName.current.value !== '' && inEmail.current.value !== '' && inPassword.current.value !== '') {
            const email = inEmail.current.value
            if (/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/.test(email) &&
            !email.endsWith('@admin.com')) {
                const createAccount = await api.post('/user/create', {
                    name: inName.current.value,
                    email: email,
                    password: inPassword.current.value
                })
                
                if (createAccount.status === 201)
                {
                    window.location.href = '/'
                }

                setError('Account created successfully')
            } else {
                setError('Invalid email address')
            }
        }
        else
        {
            setError('Please fill in all fields')
        }
    }

    return (
        <main id='Signup'>
            <form>
                <div className='content'>
                    <h1>Sign Up</h1>

                    <Input icon='user' name='name' type='text' className='input' placeholder='Name' ref={inName} />
                    <Input icon='envelope' name='email' type='email' className='input' placeholder='Email' ref={inEmail} />
                    <Input icon='lock' name='password' type='password' className='input password' placeholder='Password' ref={inPassword} onChange={validatePassword} />
                    <ProgressBar stage={passwordStrenght}/>

                    <p className='errorMesage'>{error}</p>

                    <Button type='button' onClick={Signup} label='Sign Up' />

                    <p className='questionAccont'> Already have an account? <a href='/signin'>&nbsp;Sign In&nbsp;</a></p>
                </div>
            </form>
        </main>
    )
}

import './style.css'