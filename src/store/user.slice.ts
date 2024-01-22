import {PayloadAction, createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import { loadState } from './storage';
import { PREFIX } from '../helpers/API';
import axios from 'axios';
import { ILoginResponse } from '../interfaces/auth.interface';

// Тип для jwt для хранения внутри slice -> JSON {jwt: значение}
export interface IUserState {
    jwt: string | null;
}

export interface UserState extends IUserState {
    loginState: null | 'pending' | 'fulfilled' | 'rejected';
}

// Ключ для хранения jwt, Экспортируем для использования в других файлах
export const JWT_LOCALSTORAGE_KEY_NAME = 'userData';

// Функция-обертка асинхронной фукнции для получения псевдо-синхронной функции (из redux-toolkit)
export const asyncLogin = createAsyncThunk('user/login',
    async (params: { email: string, password: string }) => {
        // получаем с API пользователя с почтой и паролем
        const { data } = await axios.post<ILoginResponse>(`${PREFIX}/auth/login`, {
				email: params.email,
				password: params.password
        });

        // возвращаем данные для дальнейшей обработки состояния promise
        return data;
    }
)

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
        jwt: loadState<UserState>(JWT_LOCALSTORAGE_KEY_NAME)?.jwt ?? null,

        // Статус логина
        loginState: null
    } as UserState,

    // -- Набор функций, меняющих состояние
    reducers: {
        // При выходе, очистим jwt-token
        logout: (preState) => {
            preState.jwt = null;
        }
    },

    // Дополнительный параметр для асинхронных функций, подготовленных через createAsyncThunk
    extraReducers: (builder) => {
        builder
            // При успешном логине (asyncLogin - fulfilled), добавляем jwt в state
            .addCase(asyncLogin.fulfilled, (preState, action: PayloadAction<ILoginResponse>) => {
                preState.jwt = action.payload.access_token;
            })

            // При ошибке логина (asyncLogin - rejected), ничего не делаем
            .addCase(asyncLogin.rejected, (preState, error) => {
                preState.loginState = 'rejected';
                console.log(error);
            })

        
    },
});

export default userSlice.reducer;
export const userActions = userSlice.actions;


