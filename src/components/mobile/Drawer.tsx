import React, { FC } from 'react';
import { RxCross2 } from 'react-icons/rx';
import InfoAndPoints from '../InfoAndPoints';

const Drawer: FC<any> = (props) => {
    const { setOpenDrawer } = props;
    return (
        <div className="w-full h-full absolute z-10 inset-0 lg:hidden bg-gray-900">
            <RxCross2
                width={60}
                height={60}
                onClick={() => setOpenDrawer(false)}
                className="absolute top-4 left-4 lg:hidden text-white"
            />
            <InfoAndPoints />
        </div>
    );
};

export default Drawer;
