import { IoIosArrowBack } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

const LargeScreeBackComp = () => {
    const navigate = useNavigate();

    const navigateToHomeHandler = () => navigate('/');

    return (
        <div className="hidden lg:flex absolute top-4 left-4">
            <button
                className="flex items-center space-x-2 text-white bg-amber-600 px-4 py-2 rounded hover:opacity-80"
                onClick={navigateToHomeHandler}
            >
                <IoIosArrowBack className="text-lg text-white" />
                <span>home</span>
            </button>
        </div>
    );
};

export default LargeScreeBackComp;
