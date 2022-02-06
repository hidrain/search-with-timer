import { useEffect, useState } from "react"
import style from './timer.module.css'

type TimerProps = {
    seconds: number
    onChange: (actualSeconds: number) => void
    timerKey: number
}

export const Timer = (props: TimerProps) => {

    const [seconds, setSeconds] = useState(props.seconds)

    useEffect(() => {
        setSeconds(props.seconds)
        props.onChange(seconds)
    }, [])

    useEffect(() => {
        props.onChange(seconds)
    }, [seconds])

    useEffect(() => {
        const intervalId = setInterval(() => {
            setSeconds((prev) => prev - 1)
        }, 1000)

        return () => {
            setSeconds(10)
            clearInterval(intervalId)
        }
    }, [props.timerKey])

    return (
        <div className={style.timer}>
            Время на просмотр:
            <br />
            {seconds}
        </div>
    )
}