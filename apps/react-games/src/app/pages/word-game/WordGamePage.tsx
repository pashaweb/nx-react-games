// eslint-disable-next-line @nx/enforce-module-boundaries
import App from '@word-game/app/app'
import styles from './WordGamePage.module.scss'

/* eslint-disable-next-line */
export interface WordGamePageProps {}

export function WordGamePage(props: WordGamePageProps) {
    return (
        <div className={styles['container']}>
            <h1>Welcome to WordGamePage!</h1>
            <App />
        </div>
    )
}

export default WordGamePage
