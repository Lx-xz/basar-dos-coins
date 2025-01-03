import { useState, useEffect } from 'react'
import api from '../../../services/api'

type User = {
    id: string
    name: string
    email: string
}

type Sale = {
    id: string
    platform: string
    quantity: number
    value: number
    date: Date
    buyer: User
}

type Stock = {
    quantity: number
}

export default function Dashboard() {
    const [sales, setSales] = useState<Sale[]>()
    const [stock, setStock] = useState<Stock>()
    const [users, setUsers] = useState<User[]>()
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    async function fetchData() {
        try {
            const res = await api.get('/admin')

            setSales(res.data.sales)
            setStock(res.data.stock)
            setUsers(res.data.users)
        } 
        catch (error) {
            setError("Error fetching data")
            console.error('Error fetching data:', error)
        } 
        finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const uniqueSales = () => {
        const uniqueIds = new Set(sales?.map(sale => sale.buyer.id))
        return uniqueIds.size
    }

    const totalUnitsSold = () => {
        return sales?.reduce((acc, sale) => acc + sale.quantity, 0)
    }

    const totalValueSold = () => {
        return sales?.reduce((acc, sale) => acc + sale.value, 0)
    }

    const salesThisMonth = () => {
        const today = new Date()
        const thisMonth = today.getMonth()

        let aux = 0
        sales?.forEach(sale => {
            const saleDate = new Date(sale.date)
            if (saleDate.getMonth() === thisMonth) {
                aux ++
            }
        })
        return aux
    }

    const salesToday = () => {
        const today = new Date().getDay()

        let aux = 0
        sales?.forEach(sale => {
            const saleDate = new Date(sale.date)
            if (saleDate.getDay() === today) {
                aux ++
            }
        })
        return aux
    }

    if (loading) return <div>Loading...</div>

    if (error) return <div>{error}</div>

    return (
        <div id='Dashboard'>
            <h3>Sales</h3>
            <div className='stats sales'>
                <div className="stat">
                    <p>
                        <i className='fi fi-ss-bags-shopping' />
                        Total
                    </p>
                    <span>{sales?.length}</span>
                </div>

                <div className="stat">
                    <p>
                        <i className='fi fi-ss-shopping-bag' />
                        Unique
                    </p>
                    <span>{uniqueSales()}</span>
                </div>
                
                <div className="stat">
                    <p>
                        <i className='fi fi-ss-coins' />
                        Units Sold
                    </p>
                    <span>{totalUnitsSold()}</span>
                </div>

                <div className="stat">
                    <p>
                        <i className='fi fi-ss-sack-dollar' />
                        Value Sold
                    </p>
                    <span>R${totalValueSold()?.toFixed(2)}</span>
                </div>

                <div className="stat">
                    <p>
                        <i className='fi fi-ss-bags-shopping' />
                        {new Date().toLocaleString('en-us', { month: 'long' })}
                    </p>
                    <span>{salesThisMonth()}</span>
                </div>

                <div className="stat">
                    <p>
                        <i className='fi fi-ss-bags-shopping' />
                        Today
                    </p>
                    <span>{salesToday()}</span>
                </div>
            </div>
        </div>
    )
}

import './style.css'