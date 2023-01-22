import { io, Socket } from 'socket.io-client';
import { MessageData } from '../components/ChatBoard';
import {
    createMessage,
    oppUserUpdate,
    startGame,
    updateAllOccupied,
    updateBoardOffTurn,
    User,
    userUpdate,
} from '../redux/slices/gameSlice';
import { store } from '../redux/store';

export let socket: Socket;

interface Member {
    username: string;
    socketId: string;
    id: number;
    roomId: string;
}

interface StartData {
    members: Member[];
    first: number;
}

export const connectSocket = () => {
    socket = io('https://tictactoeservernestjs-production.up.railway.app/');
    // socket = io('http://localhost:5000');

    socket.on('start', (data: StartData) => {
        store.dispatch(startGame(data));
    });

    socket.on('update', (cellId: string) => {
        store.dispatch(updateAllOccupied(cellId));
        store.dispatch(updateBoardOffTurn(cellId));
    });

    socket.on('win', (data: User) => {
        store.dispatch(oppUserUpdate(data));
        // PROBLEM HERE
        socket.emit(
            'loss',
            {
                roomId: store.getState().game.room.roomId,
                looserId: store.getState().game.user.id,
            },
            (data: User) => {
                store.dispatch(userUpdate(data));
            }
        );
    });

    socket.on('loss', (data: User) => {
        store.dispatch(oppUserUpdate(data));
        socket.emit('restart', store.getState().game.room.roomId);
    });

    socket.on('message', (data: MessageData) => {
        store.dispatch(createMessage(data));
    });

    return null;
};
