import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createMessage } from '../redux/slices/gameSlice';
import { RootState } from '../redux/store';
import { socket } from '../socket/socket.connection';
import Chat from './Chat';

interface MessageData {
    message: string;
    id: string;
    userId: number;
    username: string;
}

const ChatBoard = () => {
    const [msgText, setMsgText] = useState('');
    const { user, room } = useSelector((state: RootState) => state.game);
    const dispatch = useDispatch();

    const sendMessageHandler = () => {
        if (msgText)
            socket.emit('message', {
                username: user.username,
                msg: msgText,
                roomId: user.roomId,
                userId: user.id,
            });
        setMsgText('');
    };

    useEffect(() => {
        socket.on('message', (data: MessageData) => {
            dispatch(createMessage(data));
        });

        return () => {};
    }, []);

    return (
        <section className="w-full lg:w-[50%] h-2/3 flex justify-center items-center bg-gray-900">
            <div className="w-[90%] h-[90%]">
                <section className="w-full h-[93%] p-2 overflow-y-scroll">
                    {room.messages.map((msg) => (
                        <React.Fragment key={msg.id}>
                            <Chat
                                userId={msg.userId}
                                username={msg.username}
                                msg={msg.message}
                            />
                        </React.Fragment>
                    ))}
                </section>
                <section className="w-full h-[8%] flex justify-between sm:border-hidden border p-2">
                    <input
                        type="text"
                        placeholder="chat"
                        value={msgText}
                        onChange={(e) => setMsgText(e.target.value)}
                        className="w-[75%] h-full bg-gray-900 text-white outline-none px-2 py-1 border-blue-500 lg:border-b"
                    />
                    <button
                        className="w-[20%] h-full py-1 rounded text-white bg-blue-600 text-sm uppercase"
                        onClick={sendMessageHandler}
                    >
                        send
                    </button>
                </section>
            </div>
        </section>
    );
};

export default ChatBoard;
