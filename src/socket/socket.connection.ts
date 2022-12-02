import { io, Socket } from 'socket.io-client';

export let socket: Socket;

export const connectSocket = () => {
    socket = io('http://localhost:5000');

    return null;
};
