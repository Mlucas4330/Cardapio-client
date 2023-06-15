import { Link } from 'react-router-dom';
import pic from '/sushi.png';

export const Home = () => {
    return (
        <>
            <div className="relative">
                <nav className="absolute ml-20 mt-5 flex gap-x-52">
                    <h1 className="text-5xl text-red-600 font-bold">expice</h1>

                    <ul className="flex text-purple-950 items-end gap-5">
                        <li>
                            <Link to="/foods">Menu One</Link>
                        </li>
                        <li><Link to="/foods">Menu Two</Link></li>
                        <li><Link to="/foods">Menu Three</Link></li>
                        <li><Link to="/foods">Menu Four</Link></li>
                    </ul>
                </nav>

                <div className="h-screen grid grid-cols-4">
                    <h1 className="ml-20 top-36 absolute text-8xl font-extrabold text-purple-950/10">FOOD</h1>
                    <img width={400} className="absolute right-32 top-16" src={pic} alt="sushi" />
                    <main className="ml-20 col-span-3 flex items-center">
                        <div>
                            <h1 className="text-5xl text-purple-950 font-bold">
                                Discover Restaurant
                                <br />& Delicious Food
                            </h1>
                            <form className="w-full mt-5">
                                <div className="flex items-center p-3 bg-white">
                                    <input
                                        className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                                        type="text"
                                        placeholder="Search Restaurant, Food"
                                    />

                                    <button
                                        className="bg-red-600 rounded-tl-xxxlarge text-white py-2 px-10 rounded font-semibold"
                                        type="button"
                                    >
                                        GO
                                    </button>
                                </div>
                            </form>
                        </div>
                    </main>

                    <section className="bg-red-600"></section>
                </div>

                <footer className="absolute bg-orange-50 bottom-0 grid grid-cols-2 py-8">
                    <div className="ml-20 border-l-20 pl-4 border-red-600">
                        <h1 className="text-purple-950 font-semibold text-2xl">
                            Some Top Restaurant for
                            <br /> Dining In Or Take Away
                        </h1>
                    </div>
                    <div className="w-2/3">
                        <p className="text-gray-500">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos quas repellat, repellendus corporis maxime
                            autem error aliquam saepe eum harum. Voluptatem inventore, corrupti rem cum quas vitae in quis cumque?
                        </p>
                    </div>
                </footer>
            </div>
        </>
    );
};
