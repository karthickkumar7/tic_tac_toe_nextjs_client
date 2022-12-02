import React from 'react';
import { Cell } from '../pages/FriendInvite';
import InfoAndPoints from './InfoAndPoints';

const Board = (props: any) => {
    const { board } = props;
    return (
        <section className="w-full lg:w-[40%] h-1/3 lg:h-[80%] flex lg:flex-col justify-center items-center">
            <div className="border lg:border-none border-blue-400 w-[200px] lg:w-[300px] h-[200px] lg:h-[300px] flex justify-center items-center flex-wrap">
                {board.map((cell: Cell) => (
                    <div
                        key={cell.id}
                        className="w-[66px] h-[66px] lg:w-[95px] lg:h-[95px] border border-blue-400 flex justify-center items-center text-white font-bold text-xl cursor-pointer hover:opacity-60"
                    >
                        {cell.val}
                    </div>
                ))}
            </div>
            <div className="hidden lg:flex">
                <InfoAndPoints />
            </div>
        </section>
    );
};

export default Board;
