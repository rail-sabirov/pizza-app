import { Link, Outlet } from 'react-router-dom';
import styles from './Menu.module.css';

export function Layout() {
    return <>
        <div>
            <Link to="/">Menu</Link> | <Link to="/cart">Cart</Link>
        </div>
        
        <h1>Main Layout title</h1>

        <div className={styles['outlet-container']}>
            <Outlet />
        </div>
        
        <div>Footer</div>
    </>;
}