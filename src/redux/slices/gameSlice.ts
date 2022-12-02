import { createSlice } from '@reduxjs/toolkit';

interface Message {
    message: string;
    author: string;
    username: string;
}

interface Member {
    username: string;
    socketId: string;
    id: number;
}

interface Cell {
    id: string;
    val: string;
}

interface User {
    username: string;
    socketId: string;
    id: number | null;
    roomId: string;
}

interface Room {
    roomId: string;
    members: Member[];
    messages: Message[];
    full: boolean;
}

interface InitialState {
    board: Cell[];
    user: User;
    room: Room;
    turn: boolean;
    success: boolean;
    mark: string;
    gameover: boolean;
}

const initialState: InitialState = {
    board: [
        { id: '0', val: '' },
        { id: '1', val: '' },
        { id: '2', val: '' },
        { id: '3', val: '' },
        { id: '4', val: '' },
        { id: '5', val: '' },
        { id: '6', val: '' },
        { id: '7', val: '' },
        { id: '8', val: '' },
    ],
    user: {
        id: null,
        socketId: '',
        username: '',
        roomId: '',
    },
    room: {
        roomId: '',
        members: [],
        messages: [],
        full: false,
    },
    turn: false,
    success: false,
    mark: '',
    gameover: false,
};

export const gameSlice = createSlice({
    name: 'game',

    initialState,

    reducers: {
        switchTurn: (state) => {
            state.turn = !state.turn;
        },

        updateUser: (state, { payload }) => {
            state.user = payload.user;
            state.room = payload.room;
        },

        startGame: (state, { payload }) => {
            if (payload.first === state.user.id) {
                state.turn = true;
                state.mark = 'X';
            } else {
                state.turn = false;
                state.mark = 'O';
            }
            state.success = true;
            state.room.members = payload.members;
            state.room.full = true;
        },

        updateBoardOnTurn: (state, { payload }) => {
            state.board = state.board.map((cell) => {
                if (!cell.val && cell.id === payload) {
                    cell.val = state.mark;
                }
                return cell;
            });
            state.turn = false;
        },

        updateBoardOffTurn: (state, { payload }) => {
            state.board = state.board.map((cell) => {
                if (!cell.val && cell.id === payload) {
                    cell.val = state.mark === 'X' ? 'O' : 'X';
                }
                return cell;
            });
            state.turn = true;
        },
    },
});

export const {
    switchTurn,
    updateUser,
    updateBoardOffTurn,
    updateBoardOnTurn,
    startGame,
} = gameSlice.actions;

export default gameSlice.reducer;
