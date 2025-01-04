import useAuth from '../../hooks/useAuth'

import Link from '../Link'

export default function Header() {
    const { signed } = useAuth()

    return (
        <header>
            <Link className='link home' href='/' text='Basar dos Coins' />

            <nav>
                <Link className='link shopping' href='/shopping' text='Shopping' />
                <Link className='link tutorial' href='' text='Tutorial' />
            </nav>

            <div className='user'>
                {signed ? (
                    <>
                        <Link className='link user' href='/user' text={<div className='img'></div>}/>
                    </>
                ) : (
                    <>
                        <Link className='link signup' href='/user/signup' text='Signup' />
                        <Link className='link signin' href='/user/signin' text={<>Signin<i className='fi fi-rr-arrow-right'></i></>} />
                    </>
                )}
            </div>
        </header>
    )
}

import './style.css'