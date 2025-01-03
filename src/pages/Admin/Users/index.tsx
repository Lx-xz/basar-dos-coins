import { useEffect, useState } from 'react'

import api from '../../../services/api'

import Input from '../../../components/Input'

type User = {
    id: string
    name: string
    email: string
}

export default function Users() {
    const [users, setUsers] = useState<User[]>([])
    const [filteredUsers, setFilteredUsers] = useState<User[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    async function fetchUsers () {
        try {
            let res = await api.get('/admin')
            let { users } = res.data

            setUsers(users)
            setFilteredUsers(users)
        } catch (err) {
            setError('Failed to fetch users data')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    function search (quary: string) {
        if (!quary) {
            setFilteredUsers(users)
        }
        else {
            let filtered = users.filter((user) => {
                return (
                    user.name.toLowerCase().includes(quary.toLowerCase()) || user.email.toLowerCase().includes(quary.toLowerCase())
                )
            })

            setFilteredUsers(filtered)
        }
    }

    if (loading) return <div>Loading...</div>

    if (error) return <div>{error}</div>

    return (
        <div id='usersData'>
            <Input icon='rs-search' name='search' type='text' placeholder='Search' onChange={(e)=>{search(e.target.value)}} />

            <table>
                <thead>
                    <tr className='tableRow header'>
                        <th>Name</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUsers.map((user) => (
                        <tr className='tableRow' key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

import './style.css'