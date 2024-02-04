import { Link } from 'react-router-dom';
import styles from './NavBar.module.scss';

/* eslint-disable-next-line */
export interface NavBarProps { }

export function NavBar(props: NavBarProps) {
  return (
    <div className={styles['container']}>
      <nav className={styles['nav']}>
        <ul>
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

    </div>
  );
}

export default NavBar;
