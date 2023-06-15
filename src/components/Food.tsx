import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { AppDispatch, RootState } from '../main';
import { findFoodById } from '../reducers/foodReducer';

export const Food = () => {
    const { id } = useParams();
    const dispatch = useDispatch<AppDispatch>();
    
    if (id) {
        dispatch(findFoodById(id));
    }

    const food = useSelector((state: RootState) => state.foods.selectedFood);

    return (
        <>
            <Link className="absolute top-5 left-5 bg-blue-600 hover:bg-blue-700 text-white rounded p-3" to="/">
                Back
            </Link>
            <div className="container h-screen">
                <div className="grid grid-cols-2 place-items-center h-full place-content-center">
                    <div className="border">
                        <img className="max-h-96 w-96" src={food?.image} />
                    </div>
                    <div className="">
                        <h2 className="text-5xl my-5">{food?.title}</h2>
                        <p className="mb-3">
                            <b>R$: </b>
                            {food?.price}
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};
