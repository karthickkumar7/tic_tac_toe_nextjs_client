import { createSlice } from '@reduxjs/toolkit';

interface Message {
    message: string;
    id: string;
    username: string;
    userId: number;
}

export interface Cell {
    id: string;
    val: string;
}

export interface User {
    id: number;
    username: string;
    socketId: string;
    roomId: string;
    stats: {
        wins: number;
        loss: number;
        winPercent: number;
    };
}

export interface Room {
    roomId: string;
    members: User[];
    messages: Message[];
    full: boolean;
    gameNo: number;
}

interface InitialState {
    board: Cell[];
    user: User;
    room: Room;
    opp: User;
    turn: boolean;
    success: boolean;
    mark: string;
    gameover: boolean;
    occupied: string[];
    winner: string;
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
        id: 0,
        socketId: '',
        username: '',
        roomId: '',
        stats: {
            wins: 0,
            loss: 0,
            winPercent: 0,
        },
    },
    opp: {
        id: 0,
        socketId: '',
        username: '',
        roomId: '',
        stats: {
            wins: 0,
            loss: 0,
            winPercent: 0,
        },
    },
    room: {
        roomId: '',
        members: [],
        messages: [],
        full: false,
        gameNo: 0,
    },
    turn: false,
    success: false,
    mark: '',
    gameover: false,

    occupied: [],
    winner: '',
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
            state.room.gameNo++;

            state.room.members.forEach((usr) => {
                if (state.user.username !== usr.username) {
                    state.opp = usr;
                }
            });
        },

        updateBoardOnTurn: (state, { payload }) => {
            state.board = state.board.map((cell) => {
                if (!cell.val && cell.id === payload) {
                    cell.val = state.mark;
                }
                return cell;
            });
            state.occupied.push(payload);
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

        setGameOver: (state) => {
            state.gameover = true;
            state.board = [
                { id: '0', val: '' },
                { id: '1', val: '' },
                { id: '2', val: '' },
                { id: '3', val: '' },
                { id: '4', val: '' },
                { id: '5', val: '' },
                { id: '6', val: '' },
                { id: '7', val: '' },
                { id: '8', val: '' },
            ];
            state.occupied = [];

            window.location.pathname = '/';
        },

        restartGame: (state) => {
            state.gameover = false;
            state.board = [
                { id: '0', val: '' },
                { id: '1', val: '' },
                { id: '2', val: '' },
                { id: '3', val: '' },
                { id: '4', val: '' },
                { id: '5', val: '' },
                { id: '6', val: '' },
                { id: '7', val: '' },
                { id: '8', val: '' },
            ];
            state.occupied = [];
        },

        userUpdate: (state, { payload }) => {
            state.user = payload;
            state.gameover = true;
        },

        oppUserUpdate: (state, { payload }) => {
            state.opp = payload.user;
        },

        createMessage: (state, { payload }) => {
            state.room.messages.push(payload);
        },

        setWinner: (state, { payload }) => {
            state.winner = payload;
        },
    },
});

export const {
    switchTurn,
    updateUser,
    updateBoardOffTurn,
    updateBoardOnTurn,
    startGame,
    setGameOver,
    restartGame,
    createMessage,
    userUpdate,
    oppUserUpdate,
    setWinner,
} = gameSlice.actions;

export default gameSlice.reducer;
