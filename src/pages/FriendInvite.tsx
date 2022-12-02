import React, { useEffect, useState } from 'react';
import Board from '../components/Board';
import ChatBoard from '../components/ChatBoard';
import { AiOutlineMenu } from 'react-icons/ai';
import Drawer from '../components/mobile/Drawer';

export interface Cell {
    id: string;
    val: string;
}

const FriendInvite = () => {
    const [board, setBoard] = useState<Cell[]>([]);
    const [openDrawer, setOpenDrawer] = useState<boolean>(true);

    // board init
    const boardinit = (): Cell[] => {
        const board: Cell[] = [];
        for (let i = 0; i < 9; i++) {
            board.push({ id: i.toString(), val: 'X' });
        }
        return board;
    };

    useEffect(() => {
        setBoard(boardinit());
    }, []);

    return (
        <div className="w-screen h-screen lg:flex justify-evenly items-center bg-black relative">
            <AiOutlineMenu
                width={40}
                height={40}
                onClick={() => setOpenDrawer(true)}
                className="absolute top-4 left-4 lg:hidden text-white"
            />
            {openDrawer && <Drawer setOpenDrawer={setOpenDrawer} />}
            <Board board={board} />
            <ChatBoard />
        </div>
    );
};

export default FriendInvite;
