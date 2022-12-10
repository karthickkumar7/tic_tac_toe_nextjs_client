import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Board from '../components/Board';
import ChatBoard from '../components/ChatBoard';
import { AiOutlineMenu } from 'react-icons/ai';
import Drawer from '../components/mobile/Drawer';
import { RootState } from '../redux/store';
import GameOverCard from '../components/GameOverCard';
import { socket } from '../socket/socket.connection';

const FriendInvite = () => {
    const [openDrawer, setOpenDrawer] = useState<boolean>(false);

    const { gameover } = useSelector((state: RootState) => state.game);

    useEffect(() => {
        return () => {
            socket.close();
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
