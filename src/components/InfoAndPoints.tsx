import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../redux/store';
import { resetGame } from '../redux/slices/gameSlice';

const InfoAndPoints = () => {
    const { room, turn, user, opp, allOccupied } = useSelector(
        (state: RootState) => state.game
    );
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
        <section className="mt-10 p-2  text-white">
            <div className="mt-4 mb-8 flex flex-col justify-center items-center space-y-3">
                <h2 className="text-lg uppercase">players</h2>

                {room?.members.map((pl) => (
                    <p
                        key={pl.id}
                        className={`${
                            turn &&
                            user.username === pl.username &&
                            'px-2 rounded bg-green-400 text-black'
                        }`}
                    >
                        {pl.username}
                    </p>
                ))}
            </div>
            <div className="mt-10 py-4 lg:w-[400px] flex flex-col justify-center items-center space-y-3 bg-gray-800 rounded">
                <h2 className="text-lg uppercase">points</h2>
                <table className="w-[70%]">
                    <thead className="mb-2">
                        <tr className="flex justify-between text-xl">
                            <th>name</th>
                            <th>wins</th>
                            <th>loss</th>
                            <th>w/p</th>
                        </tr>
                    </thead>
                    <tbody className="my-4">
                        <tr className="my-1 flex justify-between">
                            <td className="">{user.username}</td>
                            <td className="">{user.stats.wins}</td>
                            <td className="">{user.stats.loss}</td>
                            <td className="">
                                {' '}
                                {user.stats.winPercent.toString().slice(0, 5)} %
                            </td>
                        </tr>
                        <tr className="my-1 flex justify-between">
                            <td className="">{opp.username}</td>
                            <td className="">{opp.stats.wins}</td>
                            <td className="">{opp.stats.loss}</td>
                            <td className="">
                                {opp.stats.winPercent.toString().slice(0, 5)} %
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="my-6 flex justify-center space-x-2">
                <button
                    className="px-4 py-2 font-semibold rounded bg-red-500 uppercase"
                    onClick={() => navigate('/')}
                >
                    leave
                </button>
                {allOccupied.length >= 9 && (
                    <button
                        className="px-4 py-2 font-semibold rounded bg-amber-500 uppercase"
                        onClick={() => dispatch(resetGame())}
                    >
                        reset
                    </button>
                )}
            </div>
        </section>
    );
};

export default InfoAndPoints;
