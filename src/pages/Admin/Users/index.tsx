import { useEffect, useState } from 'react'
import api from '../../../services/api'

type User = {
    id: string
    name: string
    email: string
}

export default function Users() {
    const [users, setUsers] = useState<User[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    async function fetchUsers () {
        try {
            let res = await api.get('/admin')
            let { users } = res.data

            setUsers(users)
        } catch (err) {
            setError('Failed to fetch users data')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    if (loading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>{error}</div>
    }

    return (
        <div id='usersData'>
            <h1>Users Data</h1>
            <table>
                <thead>
                    <tr className='tableRow header'>
                        <th>Name</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr className='tableRow' key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                        </tr>
                    ))}
                    <tr className='tableRow total'>
                        <td></td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}