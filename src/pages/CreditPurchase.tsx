import { useState } from "react"
import api from "../services/api"

export default function CreditPurchase () {
    let [credits, setCredits] = useState(10) 
    let [cash, setCash] = useState(10)

    function count (quantCredits: string) {
        setCredits(parseInt(quantCredits))

        const amount = parseInt(quantCredits) + 1
        setCash(amount)
    }

    async function buy () {
        const purchase = await api.post('/pay')
        console.log(purchase)
    }

    return (
        <form>
            <div className="content">
                <p>Credits = {credits}</p>
                <p>Cash = {cash}</p>
                <input type='range' step='10' min='10' max='200' onChange={(e) => count (e.target.value)} value={credits} />
            </div>
            
            <button type='button' onClick={buy}> Confirmar </button>
        </form>
    )
}