import { useState } from 'react';
import { socket } from '../socket/socket.connection';
import LargeScreeBackComp from '../components/LargeScreeBackComp';
import SmallScreenBackComp from '../components/mobile/SmallScreenBackComp';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateUser } from '../redux/slices/gameSlice';

interface Credentials {
    user: {
        username: string;
        socketId: string;
        id: number;
        roomId: string;
        stats: {
            wins: number;
            loss: number;
            winPercent: number;
        };
    };
    room: {
        roomId: string;
        messages: [];
        members: [];
        full: boolean;
    };
}

const TTTHome = () => {
    const [username, setUsername] = useState('');
    const [roomId, setRoomId] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const playCredentialsHandler = (data: Credentials) => {
        dispatch(updateUser(data));
    };

    const addUserHandler = () => {
        if (!(username && roomId)) return;

        // send event to bk end
        socket.emit(
            'playcredentials',
            { username, roomId },
            playCredentialsHandler
        );
        navigate('friend');
        return;
    };

    return (
        <div className="w-screen h-screen flex justify-center items-center bg-black relative">
            <SmallScreenBackComp />
            <LargeScreeBackComp />
            <div className="w-5/6 h-1/3 lg:w-[25%] lg:h-[30%] p-2 lg:p-6 flex flex-col justify-center items-center bg-gray-900 text-white rounded">
                <p className="m-2 text-center uppercase text-blue-400">
                    play with a friend
                </p>
                <input
                    type="text"
                    className="w-full px-3 py-2 rounded-full my-2 outline-none bg-gray-900 border border-blue-400"
                    placeholder="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="text"
                    className="w-full px-3 py-2 rounded-full my-2 outline-none bg-gray-900 border border-blue-400"
                    placeholder="room id"
                    value={roomId}
                    onChange={(e) => setRoomId(e.target.value)}
                />
                <button
                    className="w-full px-3 py-2 rounded-full my-2 outline-none font-bold uppercase text-white bg-blue-600 hover:bg-blue-500"
                    onClick={addUserHandler}
                >
                    play
                </button>
            </div>
        </div>
    );
};

export default TTTHome;
