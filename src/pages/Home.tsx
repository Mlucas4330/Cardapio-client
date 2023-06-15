import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../main';
import { Food } from '../interfaces/FoodInterface';
import { deleteFood, findAllFoods } from '../reducers/foodReducer';
import { Error } from '../components/Error';

export const Home = () => {
    const dispatch = useDispatch<AppDispatch>();
    const foods = useSelector((state: RootState) => state.foods.foods);
    const error = useSelector((state: RootState) => state.foods.error);

    const navigate = useNavigate();

    useEffect(() => {
        dispatch(findAllFoods());
    }, [dispatch]);

    return (
        <>
            {error && <Error error={error} />}
            <Link className="absolute top-5 left-5 bg-green-600 hover:bg-green-700 text-white rounded p-3" to="/food/new">
                New food
            </Link>
            <h1 className="text-center text-5xl mt-10">Cardápio</h1>
            <div className="container grid grid-cols-4 mt-10 justify-center gap-5">
                {foods?.map((food: Food) => (
                    <>
                        <div className="relative">
                            <div onClick={() => navigate(`/food/${food.id}`)} className="drop-shadow shadow-lg text-center border rounded">
                                <img className="w-full h-72 rounded-t" src={food.image} />
                                <h2 className="text-2xl my-5">{food.title}</h2>
                                <p className="mb-3">
                                    <b>R$: </b>
                                    {food.price}
                                </p>
                            </div>
                            <div className="absolute top-3 right-3 flex justify-end align-middle gap-3">
                                <button
                                    className="bg-red-500 hover:bg-red-600 rounded px-2 py-1"
                                    onClick={() => {
                                        dispatch(deleteFood(food.id));
                                    }}
                                >
                                    Delete
                                </button>
                                <Link className="bg-blue-500 hover:bg-blue-600 rounded px-2 py-1" to={`/food/${food.id}/edit`}>
                                    {' '}
                                    Edit
                                </Link>
                            </div>
                        </div>
                    </>
                ))}
            </div>
        </>
    );
};
