import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const Chat = (props: any) => {
    const { userId, username, msg } = props;

    const { user } = useSelector((state: RootState) => state.game);

    return (
        <article
            className={`${
                user.id === userId ? 'bg-blue-600' : 'bg-slate-300'
            } px-2 py-1 mb-2  text-sm rounded`}
        >
            <p
                className={`${
                    user.id === userId ? 'text-slate-300' : 'text-slate-500'
                }`}
            >
                {username}
            </p>
            <p
                className={`${
                    user.id === userId ? 'text-white' : 'text-black'
                }`}
            >
                {msg}
            </p>
        </article>
    );
};

export default Chat;
