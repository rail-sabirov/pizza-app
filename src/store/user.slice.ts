import {PayloadAction, createSlice} from "@reduxjs/toolkit";
import { loadState } from './storage';

// Тип для jwt для хранения внутри slice -> JSON {jwt: значение}
export interface IUserState {
    jwt: string | null;
}

// Ключ для хранения jwt, Экспортируем для использования в других файлах
export const JWT_LOCALSTORAGE_KEY_NAME = 'userData';

// Слайс для пользователя, для хранения jwt-token'а
export const userSlice = createSlice({
    // -- Имя слайса
    name: 'user',

    // -- Начальное состояние / инициализация при первом использовании
    initialState: {
        // Получаем jwt из localStore или null 
        // Дженерик используется: 
        // первый для задания типа принимаемого аргумента, у нас это в localStore -> JSON {jwt: значение}
        // второй для преобразования возвращаемого значения, в тип JSON {jwt: значение}
        jwt: loadState<IUserState>(JWT_LOCALSTORAGE_KEY_NAME)?.jwt ?? null
    } as IUserState,

    // -- Набор функций, меняющих состояние
    reducers: {
        // Добавление jwt - токена
        // Сам токен будет в виде объекта, в котором { payload: string } содержит строку токена
        addJwt: (preState, action: PayloadAction<string>) => {
            preState.jwt = action.payload;
        },

        // При выходе, очистим jwt-token
        logout: (preState) => {
            preState.jwt = null;
        }
    }
});

export default userSlice.reducer;
export const userActions = userSlice.actions;


