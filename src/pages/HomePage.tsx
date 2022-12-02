import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { connectSocket, socket } from '../socket/socket.connection';

const HomePage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        connectSocket();
        return () => {};
    }, []);

    return (
        <div className="w-screen h-screen flex justify-center bg-black">
            <div className="lg:w-[50%] w-full">
                <div className="p-4 grid grid-cols-1 lg:grid-cols-3 gap-2">
                    <article className="w-full p-4 space-y-3 bg-gray-900">
                        <h2 className="text-lg capitalize text-white">
                            Tic Tac Toe
                        </h2>
                        <button
                            className="px-4 py-2 bg-blue-600 text-white rounded"
                            onClick={() => navigate('/ttt')}
                        >
                            play
                        </button>
                    </article>
                    <article className="p-4 space-y-3 bg-gray-900">
                        <h2 className="text-lg capitalize text-white">
                            rock papper scissor
                        </h2>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded">
                            play
                        </button>
                    </article>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
