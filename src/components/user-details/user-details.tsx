import axios from "axios"
import { useEffect, useState } from "react"
import { SearchUser, User } from "../github/github"
import { Timer } from "./timer/timer"
import style from './user-details.module.css'

type UserDetailsProps = {
    user: SearchUser | null
}

export const UserDetails = ({ user }: UserDetailsProps) => {

    const [userDetails, setUserDetails] = useState<User | null>(null)
    const [seconds, setSeconds] = useState(10)

    useEffect(() => {
        console.log('SYNC USER DETAILS')
        if (!!user) {
            axios
                .get<User>(`https://api.github.com/users/${user.login}`)
                .then(res => {
                    setSeconds(10)
                    setUserDetails(res.data)
                })
        }
    }, [user])

    // useEffect(() => {
    //     if (seconds < 1) {
    //         setUserDetails(null)
    //     }
    // }, [seconds])

    return (
        <div className={style.container}>
            {userDetails && <div className={style.info_container}>
                <Timer
                    seconds={seconds}
                    onChange={(actualSeconds) => { setSeconds(actualSeconds) }}
                    timerKey={userDetails.id} />
                <div className={style.info}>
                    <img src={userDetails.avatar_url} />
                    <h2>Username: {userDetails.login}</h2>
                    {userDetails.html_url}
                    <div>
                        followers: {userDetails.followers},
                        following: {userDetails.following}
                    </div>
                </div>
            </div>
            }
        </div>
    )
}