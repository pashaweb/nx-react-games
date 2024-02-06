import { useEffect, useState } from 'react'
import styles from './Letter.module.scss'

/* eslint-disable-next-line */
export type LetterProps = {
    letter: string
    active: boolean
    win: boolean
}
//type StyleState = 'letter' | 'active' | 'inactive'

export function Letter(props: LetterProps) {
    const [srtyleState, setStyleState] = useState<string[]>([styles.letter])

    useEffect(() => {
        const st = [styles.letter]
        if (props.active) {
            setStyleState([...st, styles.active])
        }
        if (props.win) {
            setStyleState([...st, styles.win])
        }
        if (!props.active && !props.win) {
            const st = [styles.letter]
            setStyleState([...st])
        }
    }, [props])
    return <div className={`${srtyleState.join(' ')}`}>{props.letter}</div>
}

export default Letter
