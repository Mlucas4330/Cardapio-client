import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { Food } from '../interfaces/FoodInterface';
import { AppDispatch, RootState } from '../main';
import { findAllFoods, deleteFood } from '../reducers/foodReducer';
import { Error } from '../components/Error';
import { Card } from '../components/Card';

export const Foods = () => {
    const dispatch = useDispatch<AppDispatch>();
    const foods = useSelector((state: RootState) => state.foods.foods);
    const error = useSelector((state: RootState) => state.foods.error);

    useEffect(() => {
        dispatch(findAllFoods());
    }, [dispatch]);

    return (
        <>
            {error && <Error error={error} />}

            <div className="absolute top-5 left-5 flex gap-5">
                <Link className="text-purple-950" to="/">
                    Home
                </Link>
                <Link className="text-purple-950" to="/food/new">
                    New food
                </Link>
            </div>

            <div className="grid place-items-center">
                <h1 className="text-center text-4xl mt-10 text-purple-950 font-semibold">Explore our Foods</h1>
                <p className="text-gray-500 mt-3 text-center w-1/3">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere error architecto molestias expedita delectus officia id
                </p>
            </div>

            <div className="mt-10 ">
                <div className="container grid grid-cols-3 justify-center items-center gap-5">
                    {foods?.map((food: Food) => (
                        <Card food={food}></Card>
                    ))}
                </div>
            </div>
        </>
    );
};
