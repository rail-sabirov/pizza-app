import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import styles from './Layout.module.css';
import Button from '../../components/Button/Button';
import { useEffect } from 'react';
import cn from 'classnames';


export function Layout() {
    const navigate = useNavigate();

    // Для кнопки выход, очищаем jwt-токен, т.е. выходим из системы
    const logout = () => {
      localStorage.removeItem('jwt');
      navigate('/auth/login');
    }

    return (
      <div className={styles["layout"]}>
        <div className={styles["sidebar"]}>

          <div className={styles.user}>
            <img className={styles['user-avatar']} src="/avatar.png" alt="User avatar" />
            <div className={styles['user-name']}>Admin Adminov</div>
            <div className={styles['user-email']}>Admin.Adminov@email.com</div>

          </div>
          <div className={styles.menu}>
            <NavLink to="/" className={({ isActive }) => cn(
                styles["link"], 
                { [styles['active']]: isActive }
                )}>
              <img src="/menu-icon.svg" alt="Menu icon" />
              Menu
            </NavLink>
            <NavLink to="/cart" className={({ isActive }) => cn(
                styles.link, 
                {
                    [styles.active]: isActive
                })}>
              <img src="/cart-icon.svg" alt="Cart icon" />
              Cart
            </NavLink>
          </div>

          <div className={styles["exit-button-container"]}>
            <Button className={styles['exit-button']} onClick={ logout }>
                <img className={styles['exit-button-icon']} src="/exit-icon.svg" alt="Exit icon" />
                Exit
            </Button>
          </div>
        </div>
        <div className={styles['content']}>
          <Outlet />
        </div>
      </div>
    );
}