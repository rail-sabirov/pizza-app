import {PayloadAction, createSlice} from "@reduxjs/toolkit";

// Тип для jwt для хранения внутри slice
export interface IUserState {
    jwt: string | null;
}

// Слайс для пользователя, для хранения jwt-token
export const userSlice = createSlice({
    name: 'user',
    initialState: {
        // переменная с состоянием, тут хранится jwt - token
        jwt: null
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


