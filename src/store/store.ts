// -- Корневой store/хранилище на который мы будем навешивать slice (срезы/сущности)

import { configureStore } from '@reduxjs/toolkit';
import userSlice, { IUserPersistentState, IUserState, JWT_LOCALSTORAGE_KEY_NAME } from './user.slice';
import { saveState } from './storage';

// Конфигурируем наш stor, здесь подключаем 
// все наши доступные reducerы
export const store = configureStore({
    // reducer - Это фукнция, которую мы будем вызывать для передачи хранилищу команды
    reducer: {

        // У нас есть user, который является сущностью userSlice
        user: userSlice
    }
});

// Подписка на изменение состояния jwt, при изменении, сохраняем в localStore
// Сохраняем в виде json
store.subscribe(() => {
    // Подготовка JSON для сохранения в localStore
    const userData: IUserState = { 
        'jwt': store.getState().user.jwt 
    };
    
    // Сохранение в localStore
    saveState(userData, JWT_LOCALSTORAGE_KEY_NAME);
})


// -- Дополнительная типизация для Typescript
// Используем утилитарный тип ReturnType, который возвращает состояние
export type RootStore = ReturnType<typeof store.getState>;

// Экспортируем Тип, того, что мы можем dispatch-ить / передать
export type AppDispatch = typeof store.dispatch;