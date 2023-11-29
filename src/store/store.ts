// -- Корневой store/хранилище на который мы будем навешивать slice (срезы/сущности)

import { configureStore } from '@reduxjs/toolkit';

// Конфигурируем наш stor, здесь подключаем 
// все наши доступные reducerы
export const store = configureStore({
    // Это фукнция, которую мы будем dispatch-ить 
    // для изменения нашего состояния
    // Внутри подключим наши slice
    reducer: {}
});

// -- Дополнительная типизация для Typescript
// Используем утилитарный тип ReturnType, который возвращает состояние
export type RootStore = ReturnType<typeof store.getState>;

// Тип, того, что мы можем dispatch-ить
// В переменной этого типа будут лежать все наши dispatch-и 
// который мы объявим в наших reducer-ах
export type AppDispatch = typeof store.dispatch;