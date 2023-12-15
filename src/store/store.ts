// -- Корневой store/хранилище на который мы будем навешивать slice (срезы/сущности)

import { configureStore } from '@reduxjs/toolkit';
import userSlice from './user.slice';

// Конфигурируем наш stor, здесь подключаем 
// все наши доступные reducerы
export const store = configureStore({
    // reducer - Это фукнция, которую мы будем вызывать для передачи хранилищу команды
    reducer: {

        // У нас есть user, который является сущностью userSlice
        user: userSlice
    }
});

// -- Дополнительная типизация для Typescript
// Используем утилитарный тип ReturnType, который возвращает состояние
export type RootStore = ReturnType<typeof store.getState>;

// Экспортируем Тип, того, что мы можем dispatch-ить / передать
export type AppDispatch = typeof store.dispatch;