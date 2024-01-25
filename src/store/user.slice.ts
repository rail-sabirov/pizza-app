import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import { loadState } from './storage';
import { PREFIX } from '../helpers/API';
import axios, { AxiosError } from 'axios';
import { ILoginResponse } from '../interfaces/auth.interface';
import { IUserProfile } from '../interfaces/user.interface';
import { RootStore } from './store';


// Тип для jwt для хранения внутри slice -> JSON {jwt: значение}
export interface IUserState {
    jwt: string | null;
}

export interface UserState extends IUserState {
    authErrorMessage?: string;
    userProfile?: IUserProfile;
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

// Получаем профиль пользователя, имя и email
// Типизируем дженерик так чтобы можно было использовать Thunk API
export const asyncGetUserProfile = createAsyncThunk<IUserProfile, void, { state: RootStore }>(
    // -- Имя асинхронной фукнции
    'user/getUserProfile', 

    // -- Псевдо-синхронная функция
    // Функция-обертка асинхронной фукнции для получения псевдо-синхронной функции (из redux-toolkit)
    // используя thunk API получаем данные пользователя из хранилища Redux      
    async (_, thunkApi) => {
        const token = thunkApi.getState().user.jwt;
        const { data } = await axios.get<IUserProfile>(`${PREFIX}/user/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return { name: data.name, email: data.email } as IUserProfile;
    }
);

// Регисатрация пользователя
export const asyncRegisterUser = createAsyncThunk(
    'user/register',
    async (params: { email: string, password: string, name: string}) => {
        try {
            const {data} = await axios.post(`${PREFIX}/auth/register`, {
                name: params.name, 
                email: params.email, 
                password: params.password
            });

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
    jwt: loadState<UserState>(JWT_LOCALSTORAGE_KEY_NAME)?.jwt ?? null,
    userProfile: undefined
}

// Слайс для пользователя, для хранения jwt-token'а
export const userSlice = createSlice({
    // -- Имя слайса
    name: 'user',

    // -- Начальное состояние / инициализация при первом использовании
    initialState: initState,

    // -- Набор функций / actions, меняющих состояние данных/переменных слайса
    reducers: {
        // При выходе, очистим jwt-token
        logout: (preState) => {
            preState.jwt = null;
            preState.userProfile = undefined;
        }, 

        // Очистка ошибки перед логине/
        clearAuthErrorMessage: (preState) => {
            preState.authErrorMessage = undefined;
        }
    },

    // Дополнительный редюсер для асинхронных функций, подготовленных через createAsyncThunk
    extraReducers: (builder) => {
        
            // При успешном логине (asyncLogin - fulfilled), добавляем jwt в state
        builder.addCase(asyncLogin.fulfilled, (preState, action) => {
                // Если нет payloadа, то выходимуем на главную страницу
                if (!action.payload) {
                    return;
                }

                // payload заполнен, тогда добавляем jwt в state
                preState.jwt = action.payload.access_token;
            });

            // При ошибке логина (asyncLogin - rejected), выводим ошибку
        builder.addCase(asyncLogin.rejected, (preState, action) => {
                preState.authErrorMessage = action.error.message
            });

            // При успешном получении профиля (asyncGetUserProfile - fulfilled), добавляем профиль в state
        builder.addCase(asyncGetUserProfile.fulfilled, (preState, action) => {
                preState.userProfile = action.payload;
            });

        builder.addCase(asyncRegisterUser.fulfilled, (preState, action) => {
                // Если нет payloadа, то выходимуем на главную страницу
                if (!action.payload) {
                    return;
                }

                // payload заполнен, тогда добавляем jwt в state
                preState.jwt = action.payload.access_token;
            });

             // При ошибке регистрации (asyncRegistr- rejected), выводим ошибку
        builder.addCase(asyncRegisterUser.rejected, (preState, action) => {
                preState.authErrorMessage = action.error.message
            })

        
    },
});

export default userSlice.reducer;
export const userActions = userSlice.actions;


