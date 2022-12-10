import { useDispatch, useSelector } from 'react-redux';
import { restartGame, setGameOver } from '../redux/slices/gameSlice';
import { RootState } from '../redux/store';

const GameOverCard = () => {
    const { winner, user } = useSelector((state: RootState) => state.game);
    const dispatch = useDispatch();

    return (
        <section className="w-[70%] lg:w-[20%] h-[20%] p-2 flex flex-col items-center justify-center bg-gray-700 rounded absolute top-[30%] right-[15%] lg:right-[40%] z-20">
            <h2 className="text-slate-200 text-xl font-semibold">
                {winner === user.username ? 'you won' : 'you lose'}
            </h2>
            <div className="mt-4 flex flex-col w-[60%] space-y-4">
                <button
                    className="px-2 py-1 rounded bg-yellow-500 text-slate-800 uppercase hover:opacity-80"
                    onClick={() => dispatch(restartGame())}
                >
                    play again
                </button>
                <button
                    className="px-2 py-1 rounded bg-red-500 text-white uppercase hover:opacity-80"
                    onClick={() => dispatch(setGameOver())}
                >
                    exit
                </button>
            </div>
        </section>
    );
};

export default GameOverCard;
