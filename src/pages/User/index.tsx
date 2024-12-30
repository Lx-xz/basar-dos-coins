interface User {
    id: string
    name: string
    admin: boolean
}

export default function User () {
    let user = JSON.parse(localStorage.getItem('user') as string) as User

    if (!user) {
        return (
            <p>Not Logged</p>
        )
    }

    let { admin } = user

    return (
        <div id='User'>
            <h1>User Page</h1>
            {user ? (
                <>
                    <p>Name: {user.name}</p>
                    {admin ? <a href='/admin'>Admin Page</a> : null}
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    )
}

import './style.css'