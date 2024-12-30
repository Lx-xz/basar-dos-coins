import Stock from './Stock'
import Sales from './Sales'
import Users from './Users'
import { useParams } from 'react-router-dom'

export default function AdminPage() {
    const { section } = useParams<{ section: string }>()

    const renderSection = () => {
        switch (section) {
            case 'sales':
                return <Sales />
            case 'stock':
                return <Stock />
            case 'users':
                return <Users />
            default:
                return <></>
        }
    }

    return (
        <main id="AdminPage">
            <div id="adminHeader">
                <a href="/admin/sales">Sales</a>
                <a href="/admin/stock">Stock</a>
                <a href="/admin/users">Users</a>
            </div>

            <div id="adminBody">
                {renderSection()}
            </div>
        </main>
    )
}

import './style.css'