import {PayloadAction, createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import { loadState } from './storage';
import { PREFIX } from '../helpers/API';
import axios, { AxiosError } from 'axios';
import { ILoginResponse } from '../interfaces/auth.interface';

// Тип для jwt для хранения внутри slice -> JSON {jwt: значение}
export interface IUserState {
    jwt: string | null;
}

export interface UserState extends IUserState {
    loginErrorMessage?: string;
}

// Ключ для хранения jwt, Экспортируем для использования в других файлах
export const JWT_LOCALSTORAGE_KEY_NAME = 'userData';

// Функция-обертка асинхронной фукнции для получения псевдо-синхронной функции (из redux-toolkit)
export const asyncLogin = createAsyncThunk('user/login',
    async (params: { email: string, password: string }) => {
        try {
            // получаем с API пользователя с почтой и паролем
            const { data } = await axios.post<ILoginResponse>(`${PREFIX}/auth/login`, {
                    email: params.email,
                    password: params.password
            });

            // возвращаем данные для дальнейшей обработки состояния promise
            return data;

        } catch (e) {
            if (e instanceof AxiosError) {
                throw Error(e.response?.data.message);
            }
            
        }
    }
)

// -- Начальное состояние / инициализация при первом использовании
const initState: UserState = {
    jwt: loadState<UserState>(JWT_LOCALSTORAGE_KEY_NAME)?.jwt ?? null
}

// Слайс для пользователя, для хранения jwt-token'а
export const userSlice = createSlice({
    // -- Имя слайса
    name: 'user',

    // -- Начальное состояние / инициализация при первом использовании
    initialState: initState,

    // -- Набор функций, меняющих состояние
    reducers: {
        // При выходе, очистим jwt-token
        logout: (preState) => {
            preState.jwt = null;
        }, 

        // Очистка ошибки перед логине/
        clearLoginErrorMessage: (preState) => {
            preState.loginErrorMessage = undefined;
        }
    },

    // Дополнительный параметр для асинхронных функций, подготовленных через createAsyncThunk
    extraReducers: (builder) => {
        builder
            // При успешном логине (asyncLogin - fulfilled), добавляем jwt в state
            .addCase(asyncLogin.fulfilled, (preState, action) => {
                // Если нет payloadа, то выходимуем на главную страницу
                if (!action.payload) {
                    return;
                }

                // payload заполнен, тогда добавляем jwt в state
                preState.jwt = action.payload.access_token;
            })

            // При ошибке логина (asyncLogin - rejected), выводим ошибку
            .addCase(asyncLogin.rejected, (preState, action) => {
                preState.loginErrorMessage = action.error.message
            })

        
    },
});

export default userSlice.reducer;
export const userActions = userSlice.actions;


