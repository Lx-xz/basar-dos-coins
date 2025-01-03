import { useEffect, useState } from 'react'

import api from '../../../services/api'

import Input from '../../../components/Input'
import Button from '../../../components/Button'

export default function Stock () {
    const [stock, setStock] = useState<number>(0)
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    async function fetchStock () {
        setLoading(true)
        setError(null)
        try {
            const res = await api.get('/admin')
            setStock(res.data.stock.quantity)
        } catch (error) {
            console.error('Error fetching stock data', error)
            setError('Error fetching stock data')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchStock()
    }, [])

    const [quantity, setQuantity] = useState<number>(0)

    async function addStock () {
        setLoading(true)
        setError(null)
        try {
            let res = await api.post('/addStock', {
                quantity: Number(quantity)
            })

            if (res.status === 201) {
                (document.getElementById('inQuantity') as HTMLInputElement).value = ''
                setStock(stock + Number(quantity))
            }
        } catch (err) {
            console.error('Error adding stock', err)
            setError('Error adding stock')
        } finally {
            setLoading(false)
        }
    }

    if (loading) return <div>Loading...</div>

    if (error) return <div>{error}</div>

    return (
        <div id="stockData">
            <div className="display stock">
                <span>Stock</span> {stock} un
            </div>
            
            <form id="addStock">
                <Input id='inQuantity' name='quantity' type='number' placeholder='Add Stock' min={0} onChange={(e: any)=>setQuantity(e.target.value)} />

                <Button type='button' label='Add' onClick={addStock} />
            </form>
        </div>
    )
}

import './style.css'