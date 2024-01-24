import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import styles from './Layout.module.css';
import Button from '../../components/Button/Button';

import cn from 'classnames';
import { AppDispatch, RootStore } from '../../store/store';
import { asyncGetUserProfile, userActions } from '../../store/user.slice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';


export function Layout() {
  const navigate = useNavigate();

  // создадим ссылку на dispatch нашего хранилища
  const dispatch = useDispatch<AppDispatch>();

  // Для кнопки выход, очищаем jwt-токен, т.е. выходим из системы
  const logout = () => {
    dispatch(userActions.logout());
    navigate('/auth/login');
  }

  // Получаем данные профиля пользователя, ассинхронно
  const userName = useSelector((state: RootStore) => state.user.userProfile?.name);
  const userEmail = useSelector((state: RootStore) => state.user.userProfile?.email);

  
  useEffect(() => {
    if (!userName || !userEmail) {
      dispatch(asyncGetUserProfile());
    }
  }, [dispatch, userName, userEmail]);


  return (
    <div className={styles["layout"]}>
      <div className={styles["sidebar"]}>

        <div className={styles.user}>
          <img className={styles['user-avatar']} src="/avatar.png" alt="User avatar" />
          <div className={styles['user-name']}>{userName}</div>
          <div className={styles['user-email']}> {userEmail}</div>

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
          <Button className={styles['exit-button']} onClick={logout}>
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