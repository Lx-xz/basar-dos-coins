import { useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'

import Stock from './Stock'
import Sales from './Sales'
import Users from './Users'
import Dashboard from './Dashboard'

import Link from '../../components/Link'

export default function AdminPage() {
    const { section } = useParams<{ section: string }>()
    
    const linkSales = useRef<HTMLAnchorElement>(null)
    const linkStock = useRef<HTMLAnchorElement>(null)
    const linkUsers = useRef<HTMLAnchorElement>(null)
    const linkDashboard = useRef<HTMLAnchorElement>(null)

    function setActiveLink(link: HTMLAnchorElement) {
        link.setAttribute('class', 'active')
    }

    useEffect(() => {
        switch (section) {
            case 'sales':
                setActiveLink(linkSales.current!)
                break
            case 'stock':
                setActiveLink(linkStock.current!)
                break
            case 'users':
                setActiveLink(linkUsers.current!)
                break
            default:
                setActiveLink(linkDashboard.current!)
        }
    }, [])

    const renderSection = () => {
        switch (section) {
            case 'sales':
                return <Sales />
            case 'stock':
                return <Stock />
            case 'users':
                return <Users />
            default:
                return <Dashboard />
        }
    }

    return (
        <main id="AdminPage">
            <div id="adminHeader">
                <Link id='linkDashboard' href='/admin' text='Dashboard' ref={linkDashboard} />
                <Link id='linkSales' href='/admin/sales' text='Sales' ref={linkSales} />
                <Link id='linkUsers' href='/admin/users' text='Users' ref={linkUsers} />
                <Link id='linkStock' href='/admin/stock' text='Stock' ref={linkStock} />
            </div>

            <div id="adminBody">
                {renderSection()}
            </div>
        </main>
    )
}

import './style.css'