import { useState, useRef, MutableRefObject, SetStateAction } from 'react'

import api from '../services/api'

export default function CreateAccount () {
    const [errorName, setErrorName] = useState() as SetStateAction<any>
    const labelName = useRef() as MutableRefObject<HTMLLabelElement>
    const inName = useRef() as MutableRefObject<HTMLInputElement>

    function validateName (name: string) {
        if (name.length < 3) {
            setErrorName(<p className='validationError'>At least 3 caracters</p>)
            labelName.current.style.borderColor = '#ff0000'
            return false
        }
        else
        {
            return true
        }
    }

    const [errorEmail, setErrorEmail] = useState() as SetStateAction<any>
    const labelEmail = useRef() as MutableRefObject<HTMLLabelElement>
    const inEmail = useRef() as MutableRefObject<HTMLInputElement>

    function validateEmail (email: string) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

        if (emailRegex.test(email) == false) {
            setErrorEmail(<p className='validationError'>Invalid Email!</p>)
            labelEmail.current.style.borderColor = '#ff0000'
            return false
        }
        else {
            return true
        }
    }

    const statusUppercase =  useRef() as MutableRefObject<HTMLDivElement>
    const statusLowercase = useRef() as MutableRefObject<HTMLDivElement>
    const statusLength = useRef() as MutableRefObject<HTMLDivElement>
    const labelPassword = useRef() as MutableRefObject<HTMLLabelElement>
    const inPassword = useRef() as MutableRefObject<HTMLInputElement>

    function validatePassword (password: string) {
        statusUppercase.current.style.backgroundColor = '#fff'
        statusLowercase.current.style.backgroundColor = '#fff'
        statusLength.current.style.backgroundColor = '#fff'

        if (/[A-Z]/.test(password) == false || /[0-9]/.test(password) == false || password.length < 8)
        {
            if (/[A-Z]/.test(password) == false) {
                statusUppercase.current.style.backgroundColor = '#ff0000'
            }
            if (/[0-9]/.test(password) == false) {
                statusLowercase.current.style.backgroundColor = '#ff0000'
            }
            if (password.length < 8) {
                statusLength.current.style.backgroundColor = '#ff0000'
            }

            return false
        }
        else
        {
            return true
        }
    }

    async function createUser () {
        setErrorName('')
        setErrorEmail('')

        labelName.current.style.borderColor = '#fff'
        labelEmail.current.style.borderColor = '#fff'

        const isNameValid = validateName(inName.current.value)
        const isEmailValid = validateEmail (inEmail.current.value)
        const isPasswordValid = validatePassword (inPassword.current.value)

        if (!isPasswordValid) {
            labelPassword.current.style.borderColor = '#ff0000'
        }

        if (isNameValid && isEmailValid && isPasswordValid) {
            const createAccount = await api.post('/createAccount', {
                name: inName.current.value,
                email: inEmail.current.value,
                password: inPassword.current.value
            })
            
            if (createAccount.status = 201)
            {
                window.location.href = '/'
            }
        }
    }

    return (
        <form>
            <div className='content'>
                <h1>Add User</h1>

                <label htmlFor='inName' ref={labelName}>
                    <p>Name</p>
                    <input type='text' name='name' id='inName' ref={inName} />
                    {errorName}
                </label>

                <label htmlFor='inEmail' ref={labelEmail}>
                    <p>Email</p>
                    <input type='text' name='email' id='inEmail' ref={inEmail} />
                    {errorEmail}
                </label>

                <label htmlFor='inPassword' ref={labelPassword}>
                    <p>Password</p>
                    <input type='text' name='password' id='inPassword' ref={inPassword} onChange={(e) => validatePassword(e.target.value)} />
                </label>

                <div className='passwordValidator'>
                    <div>
                        <div className='status' ref={statusUppercase}></div>
                        <p>Uppercase letter</p>
                    </div>

                    <div>
                        <div className='status' ref={statusLowercase}></div>
                        <p>Lowercase letter</p>
                    </div>

                    <div>
                        <div className='status' ref={statusLength}></div>
                        <p>8 caracters</p>
                    </div>
                </div>
            </div>
            
            <button type='button' className='buttonAdd' onClick={createUser}> Adicionar </button>
        </form>
    )
}