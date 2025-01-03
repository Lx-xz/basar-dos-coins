import { useEffect } from 'react'

export default function Cancel () {
    useEffect(() => {
        localStorage.removeItem('purchase')
        window.location.href = '/shopping'
    }, [])

    return (<></>)
}