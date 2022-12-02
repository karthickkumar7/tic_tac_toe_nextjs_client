import React from 'react';

const HomePage = () => {
    return (
        <div className="w-screen h-screen flex justify-center items-center bg-black">
            <div className="w-5/6 h-1/3 lg:w-[25%] lg:h-[30%] p-2 lg:p-6 bg-gray-900 text-white rounded">
                <p className="m-2 text-center uppercase text-blue-400">
                    play with a friend
                </p>
                <input
                    type="text"
                    className="w-full px-3 py-2 rounded-full my-2 outline-none bg-gray-900 border border-blue-400"
                    placeholder="username"
                />
                <input
                    type="text"
                    className="w-full px-3 py-2 rounded-full my-2 outline-none bg-gray-900 border border-blue-400"
                    placeholder="room id"
                />
                <button
                    className="w-full px-3 py-2 rounded-full my-2 outline-none font-bold uppercase text-white bg-blue-600 hover:bg-blue-500"
                    placeholder="username"
                >
                    play
                </button>
            </div>
        </div>
    );
};

export default HomePage;
