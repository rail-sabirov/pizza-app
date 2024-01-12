// компонент - обертка, для скрытия вложенных элементов
// пока не авторизуешься

import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootStore } from '../store/store';

export function RequireAuth({ children }: {children: ReactNode}) {
    // Получаем jwt-токен из слайса из Redux хранилища (store)
    // Другой простой способ: const jwt = localStorage.getItem('userData');
    const jwt = useSelector((state: RootStore) => state.user.jwt);

    if (!jwt) {
        // Navigate - Это типа Redirect 
        return <Navigate to='/auth/login' replace />;
    }
    return children;
}