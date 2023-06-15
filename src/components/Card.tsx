import { useNavigate } from 'react-router-dom';

export const Card = (props: any) => {
    const navigate = useNavigate();
    return (
        <div>
            <div onClick={() => navigate(`/food/${props.food.id}`)} className="drop-shadow shadow-lg text-center border rounded-lg">
                <img className="w-full h-72 rounded-t-lg" src={props.food.image} />
                <div className="flex p-3 bg-white rounded-b-lg">
                    <div>
                        <h2 className="text-2xl text-left text-purple-950 font-semibold">{props.food.title}</h2>
                        <p className="text-gray-500 text-left">Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
                    </div>
                    <h3 className="text-green-600">R${props.food.price}</h3>
                </div>
            </div>
        </div>
    );
};
