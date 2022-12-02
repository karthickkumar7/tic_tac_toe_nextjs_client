import { IoIosArrowBack } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

const SmallScreenBackComp = () => {
    const navigate = useNavigate();

    const navigateToHomeHandler = () => navigate('/');

    return (
        <IoIosArrowBack
            className="lg:hidden text-2xl text-white absolute top-4 left-4 cursor-pointer hover:opacity-80"
            onClick={navigateToHomeHandler}
        />
    );
};

export default SmallScreenBackComp;
