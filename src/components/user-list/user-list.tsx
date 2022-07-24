import axios from "axios"
import { useEffect, useState } from "react"
import { SearchResult, SearchUser } from "../github/github"
import style from './user-list.module.css'


type UsersListProps = {
    term: string
    selectedUser: SearchUser | null
    onUserSelect: (user: SearchUser) => void
}

export const UsersList = (props: UsersListProps) => {

    const [users, setUsers] = useState<SearchUser[]>([])

    useEffect(() => {
        console.log('SYNC USERS')
        axios
            .get<SearchResult>(`https://api.github.com/search/users?q=${props.term}`)
            .then(res => {
                setUsers(res.data.items)
            })
    }, [props.term])

    return (
        <div className={style.container}>
            <ul className={style.users}>
                {users
                    .map(u => <li
                        key={u.id}
                        className={props.selectedUser === u ? style.selected : ''}
                        onClick={() => {
                            props.onUserSelect(u)
                        }}>
                        {u.login}
                    </li>)}
            </ul>
        </div>
    )
}
