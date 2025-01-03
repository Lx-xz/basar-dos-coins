import { useEffect, useState } from 'react'

import api from '../../../services/api'

import Input from '../../../components/Input'

type Sale = {
    id: number
    item: string
    platform: string
    quantity: number
    value: number
    date: Date
    buyer: {
        id: number
        name: string
        email: string
    }
}

export default function Sales() {
    const [sales, setSales] = useState<Sale[]>([])
    const [filteredSales, setFilteredSales] = useState<Sale[]>([])
    const [amount, setAmount] = useState<number>(0)
    const [unitsSold, setUnitsSold] = useState<number>(0)

    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    async function fetchSales () {
        try {
            let res = await api.get('/admin')
            let { sales } = res.data
            sales = sales.map((sale: Sale) => ({
                ...sale,
                date: new Date(sale.date)
            }))

            console.log(sales)
            setSales(sales)
            setFilteredSales(sales)

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

    function search (query: string) {
        if (!query) {
            setFilteredSales(sales)
        }
        else {
            let filteredSales = sales.filter((sale) => {
                return (
                    sale.buyer.name.toLowerCase().includes(query.toLowerCase()) ||
                    sale.buyer.email.toLowerCase().includes(query.toLowerCase()) ||
                    sale.quantity.toString().includes(query) ||
                    sale.value.toString().includes(query)
                )
            })
            setFilteredSales(filteredSales)
        }
        
    }

    if (loading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>{error}</div>
    }

    return (
        <div id='salesData'>
            <div id='salesHeader'>
                <Input icon='rs-search' name='search' type='text' placeholder='Search' onChange={(e)=>{search(e.target.value)}} />

                <div className="status">
                    <div className='stats totalUnits'>
                        <p>Units Sold</p><span>{unitsSold}</span>
                    </div>

                    <div className='stats totalSales'>
                        <p>Total Sales</p><span>R${amount.toFixed(2)}</span>
                    </div>
                </div>
            </div>

            <table>
                <thead>
                    <tr className='tableRow header'>
                        <th>Buyer</th>
                        <th>Email</th>
                        <th>Platform</th>
                        <th>Amount</th>
                        <th>Value</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredSales.map((sale) => (
                        <tr className='tableRow' key={sale.id}>
                            <td>{sale.buyer.name}</td>
                            <td>{sale.buyer.email}</td>
                            <td>{sale.platform}</td>
                            <td>{sale.quantity}</td>
                            <td>R${sale.value.toFixed(2)}</td>
                            <td>{sale.date.toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

import './style.css'