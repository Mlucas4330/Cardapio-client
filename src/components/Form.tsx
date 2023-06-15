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
            <Link className="absolute top-5 left-5 text-purple-950" to="/foods">
                Back
            </Link>
            <div className="h-screen grid place-content-center">
                <form className="border rounded shadow bg-white px-10 pt-10 pb-5">
                    <div className="flex gap-10">
                        <div className="grid place-content-center">
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
                                    className="border rounded p-3"
                                    onChange={handlePrice}
                                    placeholder="Price"
                                    step="0.01"
                                    defaultValue={food?.price}
                                    type="number"
                                    name="price"
                                    id="price"
                                />
                            </div>
                        </div>
                        <div>
                            <div className="mb-3 flex justify-center">
                                <label className="text-center" htmlFor="image">
                                    <div className="w-80 h-72">
                                        <img
                                            className="min-h-full max-h-full min-w-full max-w-full"
                                            src={image !== '' ? image : food?.image}
                                        />
                                    </div>
                                </label>
                            </div>
                            <div className="mb-3">
                                <input
                                    className="block w-full text-sm text-gray-500
                                    file:mr-4 file:py-2 file:px-4
                                    file:rounded-full file:border-0
                                    file:text-sm file:font-semibold
                                    file:bg-violet-50 file:text-purple-950
                                    hover:file:bg-violet-100"
                                    accept="image/*"
                                    onChange={handleFile}
                                    type="file"
                                    name="image"
                                    id="image"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mb-3">
                        <button
                            type="button"
                            className="bg-red-600 rounded hover:bg-red-700 w-full text-white font-bold py-2 px-4"
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
