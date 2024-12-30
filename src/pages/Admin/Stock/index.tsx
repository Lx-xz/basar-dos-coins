import { useEffect, useState } from 'react'

import api from '../../../services/api'

import Input from '../../../components/Input'
import Button from '../../../components/Button'

export default function Stock () {
    const [stock, setStock] = useState<number>(0)

    async function fetchStock () {
        try {
            const res = await api.get('/admin')
            setStock(res.data.stock.quantity)
        } catch (error) {
            console.error('Error fetching stock data', error)
        }
    }

    useEffect(() => {
        fetchStock()
    }, [])

    const [quantity, setQuantity] = useState<number>(0)

    async function addStock () {
        try {
            let res = await api.post('/addStock', {
                quantity: Number(quantity)
            })

            if (res.status === 201) {
                (document.getElementById('inQuantity') as HTMLInputElement).value = ''
                setStock(stock + Number(quantity))
            }
        } catch (err) {
            
        }
    }

    return (
        <div id="stockData">
            <h1>Stock Data</h1>
            <div className="display stock">
                <span>Stock:</span> {stock} un
            </div>
            
            <form id="addStock">
                <Input id='inQuantity' name='quantity' type='number' placeholder='Add Stock' min={0} onChange={(e: any)=>setQuantity(e.target.value)} />

                <Button type='button' label='Add' onClick={addStock} />
            </form>
        </div>
    )
}