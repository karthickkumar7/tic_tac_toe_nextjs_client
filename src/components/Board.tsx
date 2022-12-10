import React, { BaseSyntheticEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    oppUserUpdate,
    setWinner,
    updateBoardOffTurn,
    updateBoardOnTurn,
    User,
    userUpdate,
} from '../redux/slices/gameSlice';
import { RootState } from '../redux/store';
import { socket } from '../socket/socket.connection';

import InfoAndPoints from './InfoAndPoints';

const Board = () => {
    const { board, turn, success, room, user, occupied } = useSelector(
        (state: RootState) => state.game
    );
    const dispatch = useDispatch();

    const gameLogic = () => {
        const winConditions: any = {
            '0': [
                ['0', '1', '2'],
                ['0', '3', '6'],
                ['0', '4', '8'],
            ],
            '1': [
                ['0', '1', '2'],
                ['1', '4', '7'],
            ],
            '2': [
                ['0', '1', '2'],
                ['2', '4', '6'],
                ['2', '5', '8'],
            ],
            '3': [
                ['3', '4', '5'],
                ['0', '3', '6'],
            ],
            '4': [
                ['3', '4', '5'],
                ['1', '4', '7'],
                ['0', '4', '8'],
                ['2', '4', '6'],
            ],
            '5': [
                ['2', '5', '8'],
                ['3', '4', '5'],
            ],
            '6': [
                ['6', '7', '8'],
                ['6', '4', '2'],
                ['0', '3', '6'],
            ],
            '7': [
                ['6', '7', '8'],
                ['1', '4', '7'],
            ],
            '8': [
                ['0', '4', '8'],
                ['2', '5', '8'],
                ['6', '7', '8'],
            ],
        };

        const latestMarkedId = occupied[occupied.length - 1];

        for (let i = 0; i < winConditions[latestMarkedId].length; i++) {
            if (
                winConditions[latestMarkedId][i].every((cellId: string) =>
                    occupied.includes(cellId)
                )
            ) {
                return true;
            }
        }
        return false;
    };

    const updateBoardHandler = (e: BaseSyntheticEvent) => {
        if (!turn) return;
        // break out if cell is already marked
        for (let i = 0; i < board.length; i++) {
            if (board[i].id === e.target.id && board[i].val) return;
        }
        dispatch(updateBoardOnTurn(e.target.id));
        socket.emit('update', { roomId: room.roomId, cellId: e.target.id });
        return null;
    };

    useEffect(() => {
        // check if board is full or wins
        if (occupied.length && gameLogic()) {
            dispatch(setWinner(user.username));
            socket.emit(
                'win',
                { winnerId: user.id, roomId: room.roomId },
                (data: User) => {
                    dispatch(userUpdate(data));
                }
            );
        }
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
                <p className="p-2 capitalize text-white">
                    {turn ? 'your turn' : 'opp turn'}
                </p>
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
