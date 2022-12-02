import React from 'react';
import Chat from './Chat';

const ChatBoard = () => {
    return (
        <section className="w-full lg:w-[50%] h-2/3 flex justify-center items-center bg-gray-900">
            <div className="w-[90%] h-[90%]">
                <section className="w-full h-[93%] p-2 overflow-y-scroll">
                    <Chat me={true} />
                    <Chat me={false} />
                    <Chat me={false} />
                    <Chat me={true} />
                </section>
                <section className="w-full h-[8%] flex justify-between sm:border-hidden border p-2">
                    <input
                        type="text"
                        placeholder="chat"
                        className="w-[75%] h-full bg-gray-900 text-white outline-none px-2 py-1 border-blue-500 lg:border-b"
                    />
                    <button className="w-[20%] h-full py-1 rounded text-white bg-blue-600 text-sm uppercase">
                        send
                    </button>
                </section>
            </div>
        </section>
    );
};

export default ChatBoard;
