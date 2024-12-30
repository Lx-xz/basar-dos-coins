import { useEffect, useState } from 'react'
import api from '../../../services/api'

type Sale = {
    id: number
    item: string
    quantity: number
    value: number
    buyer: {
        id: number
        name: string
        email: string
    }
}

export default function Sales() {
    const [sales, setSales] = useState<Sale[]>([])
    const [amount, setAmount] = useState<number>(0)
    const [unitsSold, setUnitsSold] = useState<number>(0)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    async function fetchSales () {
        try {
            let res = await api.get('/admin')
            let { sales } = res.data

            setSales(sales)

            let totalSales = { amount: 0, unitsSold: 0 }
            sales.map((sale: Sale) => {
                totalSales.amount += sale.value
                totalSales.unitsSold += sale.quantity
            })
            setAmount(totalSales.amount)
            setUnitsSold(totalSales.unitsSold)
        } catch (err) {
            setError('Failed to fetch sales data')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchSales()
    }, [])

    if (loading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>{error}</div>
    }

    return (
        <div id='salesData'>
            <h1>Sales Data</h1>
            <table>
                <thead>
                    <tr className='tableRow header'>
                        <th>Buyer</th>
                        <th>Email</th>
                        <th>Amount</th>
                        <th>Value</th>
                    </tr>
                </thead>
                <tbody>
                    {sales.map((sale) => (
                        <tr className='tableRow' key={sale.id}>
                            <td>{sale.buyer.name}</td>
                            <td>{sale.buyer.email}</td>
                            <td>{sale.quantity}</td>
                            <td>{sale.value.toFixed(2)}</td>
                        </tr>
                    ))}
                    <tr className='tableRow total'>
                        <td>Total</td>
                        <td></td>
                        <td>{unitsSold}</td>
                        <td>{amount.toFixed(2)}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}