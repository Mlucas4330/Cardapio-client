import { useDispatch } from 'react-redux';
import { emptyError } from '../reducers/foodReducer';

export const Error = (props: any) => {
    const dispatch = useDispatch();
    const closeModal = () => {
        dispatch(emptyError(null));
    };
    return (
        <>
            <div className="absolute top-0 left-0 grid bg-black/30 w-screen h-screen place-content-center">
                <div className="text-red w-80 shadow">
                    <div className="bg-red-500 p-3 text-white flex justify-between">
                        <h1>ERRO:</h1>
                        <button onClick={closeModal}>X</button>
                    </div>
                    <div className="p-3 bg-white">
                        <p>{props.error}</p>
                    </div>
                </div>
            </div>
        </>
    );
};
