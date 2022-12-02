import { createSlice } from '@reduxjs/toolkit';

interface InitialState {
    roomId: string;
    username: string;
    id: number | null;
    socketId: string;
    turn: boolean;
}

const initialState: InitialState = {
    id: null,
    roomId: '',
    socketId: '',
    turn: false,
    username: '',
};

export const gameSlice = createSlice({
    name: 'game',

    initialState,

    reducers: {
        switchTurn: (state) => {
            state.turn = !state.turn;
        },
    },
});

export const { switchTurn } = gameSlice.actions;

export default gameSlice.reducer;
