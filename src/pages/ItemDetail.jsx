import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ItemDetail = () => {
    const { itemId } = useParams();
    const [itemDisplay, setItemDisplay] = useState('');

    const handleFetchMenu = () => {
        axios
            .get(`https://after-eleven-server.herokuapp.com/api/menu/${itemId}`)
            .then(function (response) {
                setItemDisplay(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    useEffect(() => {
        handleFetchMenu();
    }, []);

    return (
        <section className="xl:max-w-[1280px] w-full mx-auto sm:px-10 px-20 flex flex-col sm:mt-40 mt-28">
            {itemDisplay && (
                <div className="w-fit">
                    <h2 className="font-play sm:text-7xl ss:text-5xl text-3xl text-gradient uppercase inline-block">
                        {window.location.pathname.substr(6).slice(0, -(1 + itemId.length))}
                    </h2>
                    <div className="h-[3px] bg-cf-gradient" />
                </div>
            )}

            {itemDisplay && (
                <div className="flex xs:flex-row flex-col justify-center items-center md:gap-40 sm:gap-20 gap-16 mt-20">
                    <div className="picture">
                        <img
                            src={itemDisplay.image}
                            alt="{itemDisplay[0].name}"
                            className="md:w-[480px] md:h-[480px] sm:w-[400px] sm:h-[400px] ss:w-[250px] ss:h-[250px] w-[190px] h-[190px]"
                        />
                    </div>

                    <div className="sm:w-[500px] w-[320px] h-fit border-2 border-solid border-primary">
                        <h3 className="w-full border-b border-solid border-primary rounded-br-xl rounded-bl-xl p-5 text-center sm:text-3xl text-lg font-semibold">
                            {itemDisplay.name}
                        </h3>
                        <div className="flex flex-col gap-5 sm:p-10 p-5 sm:text-xl text-lg text-dimWhite">
                            <p className="text-center sm:mb-12 mb-5">{itemDisplay.detail.desc}</p>
                            <p className="sm:leading-10 leading-8">
                                Ingredients: {itemDisplay.detail.ingredients} <br />
                                Total Calories: {itemDisplay.detail.nutritions.kcal} <br />
                                Fat (g): {itemDisplay.detail.nutritions.fat} <br />
                                Protein (g): {itemDisplay.detail.nutritions.protein} <br />
                                Carbs (g): {itemDisplay.detail.nutritions.carbs} <br />
                                Fibre (g): {itemDisplay.detail.nutritions.fibre} <br />
                            </p>
                            <div className="flex justify-center items-center gap-10">
                                <span className="text-white font-semibold sm:text-2xl text-xl">Price: $ {itemDisplay.price}</span>
                                <Link to="/menu/starter" className="btn-sub text-lg sm:mb-2 w-fit">
                                    Back To Menu
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default ItemDetail;