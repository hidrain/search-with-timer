import { useEffect, useState } from "react"
import style from './search.module.css'

type SearchProps = {
    value: string
    onSubmit: (fixedValue: string) => void
}

export const Search = (props: SearchProps) => {

    const [tempSearch, setTempSearch] = useState('')

    useEffect(() => {
        setTempSearch(props.value)
    }, [props.value])

    return (
        <div className={style.search}>
            <input
                className={style.input}
                placeholder='Search'
                value={tempSearch}
                onChange={(e) => { setTempSearch(e.currentTarget.value) }} />
            <button
                className={style.button}
                onClick={() => {
                    props.onSubmit(tempSearch)
                }}>
                Find
            </button>
        </div>
    )
}
