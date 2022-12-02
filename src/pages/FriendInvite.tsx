import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Board from '../components/Board';
import ChatBoard from '../components/ChatBoard';
import { AiOutlineMenu } from 'react-icons/ai';
import Drawer from '../components/mobile/Drawer';
import { RootState } from '../redux/store';
import GameOverCard from '../components/GameOverCard';
import { socket } from '../socket/socket.connection';
import {
    startGame,
    switchTurn,
    updateBoardOffTurn,
} from '../redux/slices/gameSlice';

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

const FriendInvite = () => {
    const [openDrawer, setOpenDrawer] = useState<boolean>(false);

    const { gameover } = useSelector((state: RootState) => state.game);
    const dispatch = useDispatch();

    const startHandler = (data: StartData) => {
        dispatch(startGame(data));
    };

    useEffect(() => {
        socket.on('start', startHandler);

        return () => {
            socket.off('start', startHandler);
        };
    }, []);

    return (
        <div className="w-screen h-screen bg-black relative">
            <AiOutlineMenu
                width={40}
                height={40}
                onClick={() => setOpenDrawer(true)}
                className="absolute top-4 left-4 lg:hidden text-white"
            />
            {openDrawer && <Drawer setOpenDrawer={setOpenDrawer} />}
            <div
                className={`${
                    gameover && 'opacity-30'
                } w-full h-full lg:flex justify-evenly items-center`}
            >
                <Board />
                <ChatBoard />
            </div>

            {gameover && <GameOverCard />}
        </div>
    );
};

export default FriendInvite;
