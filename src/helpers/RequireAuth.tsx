// компонент - обертка, для скрытия вложенных элементов
// пока не авторизуешься

import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

export function RequireAuth({ children }: {children: ReactNode}) {
    const jwt = 'null';

    if (!jwt) {
        // Navigate - Это типа Redirect 
        return <Navigate to='/auth/login' replace />;
    }
    return children;
}