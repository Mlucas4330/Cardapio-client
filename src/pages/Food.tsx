import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { AppDispatch, RootState } from '../main';
import { deleteFood, findFoodById } from '../reducers/foodReducer';

export const Food = () => {
    const { id } = useParams();
    const dispatch = useDispatch<AppDispatch>();

    if (id) {
        dispatch(findFoodById(id));
    }

    const food = useSelector((state: RootState) => state.foods.selectedFood);

    return (
        <div className="relative">
            <Link className="absolute top-5 left-5  text-purple-950" to="/foods">
                Back
            </Link>
            <div className="h-screen grid grid-cols-4">
                <div className="col-span-3 grid place-content-center">
                    <h2 className="text-8xl font-extrabold text-purple-950  my-5">{food?.title}</h2>
                    <p className="mb-3 font-semibold text-5xl text-green-600">R${food?.price}</p>
                    <div className="flex gap-3">
                        <button
                            className="bg-red-600 rounded-lg hover:bg-red-700 text-white rounded p-3"
                            onClick={() => {
                                dispatch(deleteFood(food?.id));
                            }}
                        >
                            Delete
                        </button>
                        <Link className="bg-purple-950 rounded-lg hover:bg-purple-900 text-white p-3" to={`/food/${food?.id}/edit`}>
                            {' '}
                            Edit
                        </Link>
                    </div>
                </div>
                <section className="bg-red-600"></section>
            </div>

            <img className="absolute top-1/2 -translate-y-1/2 right-40 max-h-96 w-96 rounded-lg shadow" src={food?.image} />
        </div>
    );
};
