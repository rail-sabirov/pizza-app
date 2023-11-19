import { Link, Outlet, useLocation } from 'react-router-dom';
import styles from './Layout.module.css';
import Button from '../../components/Button/Button';
import { useEffect } from 'react';
import cn from 'classnames';


export function Layout() {
    // Для получения данных об текущем адресе
    const location = useLocation();

    // Отслеживаем изменение адреса
    useEffect(() => {
        console.log(location)
    }, [location]);

    return (
      <div className={styles["layout"]}>
        <div className={styles["sidebar"]}>

          <div className={styles.user}>
            <img className={styles['user-avatar']} src="/avatar.png" alt="User avatar" />
            <div className={styles['user-name']}>Admin Adminov</div>
            <div className={styles['user-email']}>Admin.Adminov@email.com</div>

          </div>
          <div className={styles.menu}>
            <Link to="/" className={cn(
                styles["link"], 
                { [styles['active']]: location.pathname === '/' }
                )}>
              <img src="/menu-icon.svg" alt="Menu icon" />
              Menu
            </Link>
            <Link to="/cart" className={cn(
                styles.link, {
                    [styles.active]: location.pathname === '/cart'
                })}>
              <img src="/cart-icon.svg" alt="Cart icon" />
              Cart
            </Link>
          </div>

          <div className={styles["exit-button-container"]}>
            <Button className={styles['exit-button']}>
                <img className={styles['exit-button-icon']} src="/exit-icon.svg" alt="Exit icon" />
                Exit
            </Button>
          </div>
        </div>
        <div>
          <Outlet />
        </div>
      </div>
    );
}