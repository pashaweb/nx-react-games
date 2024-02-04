import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import styles from './NavBar.module.scss'

/* eslint-disable-next-line */
export interface NavBarProps {}

export function NavBar(props: NavBarProps) {
    const [open, setOpen] = useState(false)
    const togeleOpen = () => {
        setOpen(!open)
    }
    const location = useLocation()

    useEffect(() => {
        console.log('lala')
        setOpen(false)
    }, [location])

    return (
        <header>
            <Link to="/" className={styles.logo}>
                lr
            </Link>
            <input
                className={styles.sideMenu}
                type="checkbox"
                id="side-menu"
                checked={open}
            />
            <label
                onClick={() => togeleOpen()}
                className={styles.hamb}
                htmlFor="side-menu"
            >
                <span className={styles.hambLine}></span>
            </label>

            <nav className={styles.nav}>
                <ul className={styles.menu}>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/crypto-game">Crypto Game</Link>
                    </li>
                    <li>
                        <Link to="/word-game">Word Game</Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default NavBar
