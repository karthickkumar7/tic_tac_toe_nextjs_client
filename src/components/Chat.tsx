import React from 'react';

const Chat = (props: any) => {
    const { me } = props;

    return me ? (
        <article className="px-2 py-1 mb-2 bg-blue-600 text-sm rounded">
            <p className="text-slate-300">user6996</p>
            <p className="text-white">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Excepturi, quibusdam!
            </p>
        </article>
    ) : (
        <article className="px-2 py-1 mb-2 bg-slate-100 text-sm rounded">
            <p className="text-slate-500">user6996</p>
            <p className="text-slate-900">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Excepturi, quibusdam!
            </p>
        </article>
    );
};

export default Chat;
