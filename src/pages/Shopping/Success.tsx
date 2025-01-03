import { useEffect } from "react"
import api from "../../services/api"

export default function Success () {
    const user = JSON.parse(localStorage.getItem('user') as string)

    if (!localStorage.getItem('purchase')) {
        window.location.href = '/'
    }

    let { quantity, id } = JSON.parse(localStorage.getItem('purchase') as string) 

    async function registerBuy () {
        let status = await api.post('/shopping/register', {
            user,
            purchase: {
                id,
                quantity: Number(quantity)
            }
        })

        if (status.status === 201) {
            localStorage.removeItem('purchase')
            window.location.href = '/'
        }
    }
    
    useEffect(() => {
        registerBuy()
    }, [])

    return (<></>)
}