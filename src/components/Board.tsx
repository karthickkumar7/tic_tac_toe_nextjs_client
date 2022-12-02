import React, { BaseSyntheticEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    updateBoardOffTurn,
    updateBoardOnTurn,
} from '../redux/slices/gameSlice';
import { RootState } from '../redux/store';
import { socket } from '../socket/socket.connection';

import InfoAndPoints from './InfoAndPoints';

const Board = () => {
    const { board, turn, success, room } = useSelector(
        (state: RootState) => state.game
    );
    const dispatch = useDispatch();

    const updateBoardHandler = (e: BaseSyntheticEvent) => {
        if (!turn) return;

        for (let i = 0; i < board.length; i++) {
            if (board[i].id === e.target.id && board[i].val) return;
        }
        dispatch(updateBoardOnTurn(e.target.id));
        socket.emit('update', { roomId: room.roomId, cellId: e.target.id });
        return null;
    };

    const markCellHandler = (cellId: string) => {
        dispatch(updateBoardOffTurn(cellId));
    };

    useEffect(() => {
        socket.on('update', markCellHandler);
    }, []);

    useEffect(() => {
        // TODO
        // check if board is full or wins
    }, [board]);

    return success ? (
        <section className="w-full lg:w-[40%] h-1/3 lg:h-[80%] flex lg:flex-col justify-center items-center">
            <div className="border lg:border-none border-blue-400 w-[200px] lg:w-[300px] h-[200px] lg:h-[300px] flex justify-center items-center flex-wrap">
                {board.map((cell) => (
                    <div
                        key={cell.id}
                        id={cell.id}
                        className="w-[66px] h-[66px] lg:w-[95px] lg:h-[95px] border border-blue-400 flex justify-center items-center text-white font-bold text-xl cursor-pointer hover:opacity-60"
                        onClick={updateBoardHandler}
                    >
                        {cell.val}
                    </div>
                ))}
            </div>
            <div className="hidden lg:flex">
                <InfoAndPoints />
            </div>
        </section>
    ) : (
        <p className="w-full lg:w-[40%] h-1/3 lg:h-[80%] flex lg:flex-col justify-center items-center text-white">
            Waiting for the other player...
        </p>
    );
};

export default Board;
