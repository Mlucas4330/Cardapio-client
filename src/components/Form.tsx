import { ChangeEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { addFood, findFoodById, updateFood } from '../reducers/foodReducer';
import { AppDispatch, RootState } from '../main';
import { Error } from './Error';

export const Form = () => {
    const [title, setTitle] = useState<string>('');
    const [price, setPrice] = useState<number>(0);
    const [image, setImage] = useState<string>('');

    const { id } = useParams();
    const dispatch = useDispatch<AppDispatch>();
    const food = id ? useSelector((state: RootState) => state.foods.selectedFood) : null;
    const error = useSelector((state: RootState) => state.foods.error);

    if (id) {
        dispatch(findFoodById(id));
    }

    const fileToBase64 = (file: File) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
            const base64 = fileReader.result as string;
            setImage(base64);
        };
    };

    const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            fileToBase64(e.target.files[0]);
        }
    };

    const handleTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const handlePrice = (e: ChangeEvent<HTMLInputElement>) => {
        setPrice(parseInt(e.target.value));
    };

    return (
        <>
            {error && <Error error={error} />}
            <Link className="absolute top-5 left-5 bg-blue-600 hover:bg-blue-700 text-white rounded p-3" to="/">
                Back
            </Link>
            <div className="container grid place-content-center h-screen">
                <form className="border rounded shadow px-10 pt-10 pb-5">
                    <div className="mb-3">
                        <input
                            className="border rounded p-3 w-full"
                            placeholder="Title"
                            onChange={handleTitle}
                            defaultValue={food?.title}
                            type="text"
                            name="title"
                            id="title"
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            className="border rounded p-3 w-full"
                            onChange={handlePrice}
                            placeholder="Price"
                            defaultValue={food?.price}
                            type="number"
                            name="price"
                            id="price"
                        />
                    </div>
                    <div className="mb-3 flex justify-center">
                        <label className="text-center" htmlFor="image">
                            Image
                            <div className="w-80 h-72">
                                <img className="min-h-full max-h-full min-w-full max-w-full" src={image !== '' ? image : food?.image} />
                            </div>
                        </label>
                    </div>
                    <div className="mb-3">
                        <input accept="image/*" onChange={handleFile} type="file" name="image" id="image" />
                    </div>
                    <div className="mb-3">
                        <button
                            type="button"
                            className="bg-blue-600 rounded hover:bg-blue-700 w-full text-white font-bold py-2 px-4"
                            onClick={() => {
                                id
                                    ? dispatch(updateFood({ id, title, price, image }))
                                    : dispatch(
                                          addFood({
                                              id: '',
                                              title,
                                              price,
                                              image
                                          })
                                      );
                            }}
                        >
                            {id ? 'UPDATE' : 'CREATE'}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};
