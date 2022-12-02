import React from 'react';
import { useNavigate } from 'react-router-dom';

const InfoAndPoints = () => {
    const navigate = useNavigate();

    return (
        <section className="mt-10 p-2  text-white">
            <div className="mt-4 mb-8 flex flex-col justify-center items-center space-y-3 lg:hidden">
                <h2 className="text-lg uppercase">players</h2>
                <p>nigger!</p>
                <p>soyboy!</p>
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
                            <td className="">soyboy1</td>
                            <td>12</td>
                            <td>2</td>
                            <td>2%</td>
                        </tr>
                        <tr className="my-1 flex justify-between">
                            <td className="">nigger</td>
                            <td>1</td>
                            <td>45</td>
                            <td>45%</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="my-6 flex justify-center">
                <button
                    className="px-4 py-2 font-semibold rounded bg-red-500 uppercase"
                    onClick={() => navigate('/')}
                >
                    leave
                </button>
            </div>
        </section>
    );
};

export default InfoAndPoints;
