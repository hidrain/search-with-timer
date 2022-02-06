import { useEffect, useState } from 'react'
import { Search } from '../search/search'
import { UserDetails } from '../user-details/user-details'
import { UsersList } from '../user-list/user-list'
import style from './github.module.css'

export type SearchUser = {
    login: string
    id: number
}
export type SearchResult = {
    items: SearchUser[]
}
export type User = {
    login: string
    id: number
    avatar_url: string
    followers: number
    following: number
    html_url: string
}

export const Github = () => {

    const [selectedUser, setSelectedUser] = useState<SearchUser | null>(null)
    const [searchTerm, setSearchTerm] = useState('it-kamasutra')

    useEffect(() => {
        console.log('SYNC TAB TITLE')
        if (selectedUser) {
            document.title = selectedUser.login
        }
    }, [selectedUser])

    return (
        <div className={style.container}>
            <div>
                <div className={style.nav}>
                    <div className={style.label}>
                        Search by
                    </div>
                    <Search
                        value={searchTerm}
                        onSubmit={(value: string) => { setSearchTerm(value) }} />
                    <button
                        className={style.button}
                        onClick={() => { setSearchTerm('it-kamasutra') }}>
                        Reset
                    </button>

                    <UsersList
                        term={searchTerm}
                        selectedUser={selectedUser}
                        onUserSelect={(user) => { setSelectedUser(user) }} />
                </div>
            </div>

            <UserDetails user={selectedUser} />
        </div >
    )
}