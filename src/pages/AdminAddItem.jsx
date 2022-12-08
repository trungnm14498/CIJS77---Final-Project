import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import img1 from '../assets/image/pho-1.jpg';
import axios from 'axios';

const AdminAddItem = () => {
    const navigate = useNavigate();

    const [newInfo, setNewInfo] = useState({
        name: '',
        price: 0,
        image: 'https://www.travelinsurancedirect.com.au/blog/wp-content/uploads/2016/03/GettyImages-1219328713.jpg',
        categoryId: 1,
        detail: {
            desc: '',
            ingredients: '',
            nutritions: {
                kcal: 0,
                fat: 0,
                protein: 0,
                carbs: 0,
                fibre: 0,
            },
        },
    });

    const handleAddNewItem = (e) => {
        e.preventDefault();

        axios({
            method: 'POST',
            url: 'https://after-eleven-server.herokuapp.com/api/menu',
            data: newInfo,
        })
            .then(function (response) {
                alert('Successfully Add Item!');
            })
            .then(() => navigate('/admin-menu'))
            .catch(function (response) {
                //handle error
                console.log(response);
            });
    };

    const handleOnChange = (e, key) => {
        let newValue = e.target.value;
        if (key === 'price' || key === 'categoryId') {
            newValue = parseFloat(newValue);
        }
        setNewInfo((prev) => {
            return { ...prev, [key]: newValue };
        });
    };

    const handleOnChangeDetail = (e, key) => {
        const { value, name } = e.target;

        setNewInfo((prev) => {
            const x = { ...prev[key], [name]: value };
            return { ...prev, [key]: x };
        });
    };
    const handleOnChangeNutritions = (e, detail, nutritions) => {
        const { value, name } = e.target;
        const newValue = parseFloat(value);

        setNewInfo((prev) => {
            const y = { ...prev.detail.nutritions, [name]: newValue };
            const x = { ...prev[detail], [nutritions]: y };
            return { ...prev, [detail]: x };
        });
    };

    return (
        <section className="xl:max-w-[1280px] w-full mx-auto sm:px-10 px-20 flex flex-col sm:mt-40 mt-28 ">
            <div className="w-fit xs:mb-10">
                <h2 className="font-play sm:text-7xl ss:text-5xl text-3xl text-gradient uppercase inline-block">
                    A D D &nbsp; N E W &nbsp; I T E M.
                </h2>
                <div className="h-[3px] bg-cf-gradient" />
            </div>

            <div className="flex flex-col justify-center items-center">
                <form
                    onSubmit={handleAddNewItem}
                    className="grid grid-cols-5 grid-rows-10 w-[80%] border-solid border-2 border-primary text-dimWhite"
                >
                    <div className="col-span-2 row-span-9 p-5">
                        <div className="picture">
                            <img
                                src="https://www.travelinsurancedirect.com.au/blog/wp-content/uploads/2016/03/GettyImages-1219328713.jpg"
                                alt="img1"
                                className="w-[310px] h-[310px]"
                            />
                        </div>
                        <div className="flex flex-col gap-3 mt-5 text-lg ">
                            <div>
                                <label htmlFor="image">Choose a food picture</label>
                                <input type="file" name="image" accept="image/png, image/jpeg" className="my-3" />
                            </div>
                            <div className="flex justify-between items-center">
                                <label htmlFor="name">Name: </label>
                                <input
                                    type="text"
                                    name="name"
                                    className="ml-2 bg-transparent border border-solid border-primary p-2 rounded-md"
                                    placeholder="Item Name..."
                                    required
                                    onChange={(e) => {
                                        handleOnChange(e, 'name');
                                    }}
                                />
                            </div>
                            <div className="flex justify-between items-center">
                                <label htmlFor="price">Price ($): </label>
                                <input
                                    type="text"
                                    name="price"
                                    className="ml-2 bg-transparent border border-solid border-primary p-2 rounded-md"
                                    placeholder="Item Price..."
                                    required
                                    onChange={(e) => {
                                        handleOnChange(e, 'price');
                                    }}
                                />
                            </div>
                            <div className="flex justify-between items-center">
                                <label htmlFor="categoryId">Category: </label>
                                <select
                                    type="text"
                                    name="categoryId"
                                    className="ml-2 bg-transparent border border-solid border-primary p-2 rounded-md"
                                    required
                                    onChange={(e) => {
                                        handleOnChange(e, 'categoryId');
                                    }}
                                >
                                    <option value="1" className="text-black">
                                        Starter
                                    </option>
                                    <option value="2" className="text-black">
                                        Pho
                                    </option>
                                    <option value="3" className="text-black">
                                        Noodle
                                    </option>
                                    <option value="4" className="text-black">
                                        Drink
                                    </option>
                                    <option value="5" className="text-black">
                                        Dessert
                                    </option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="col-span-3 p-5">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="desc">Description: </label>
                            <textarea
                                type="text"
                                name="desc"
                                rows="5"
                                className="ml-2 bg-transparent border border-solid border-primary p-2 rounded-md resize-none mb-2"
                                placeholder="Item Description..."
                                onChange={(e) => {
                                    handleOnChangeDetail(e, 'detail');
                                }}
                            />
                            <label htmlFor="ingredients">Ingredients: </label>
                            <textarea
                                type="text"
                                name="ingredients"
                                rows="1"
                                className="ml-2 bg-transparent border border-solid border-primary p-2 rounded-md resize-none mb-2"
                                placeholder="Item Ingredients..."
                                onChange={(e) => {
                                    handleOnChangeDetail(e, 'detail');
                                }}
                            />
                            <div>Nutritions: </div>
                            <div>
                                <label htmlFor="kcal">Kcal (g): </label>
                                <input
                                    type="number"
                                    name="kcal"
                                    placeholder="Item's Kcal..."
                                    className="ml-3 bg-transparent border border-solid border-primary p-2 rounded-md"
                                    onChange={(e) => handleOnChangeNutritions(e, 'detail', 'nutritions')}
                                />
                            </div>
                            <div>
                                <label htmlFor="fat">Fat (g): </label>
                                <input
                                    type="number"
                                    name="fat"
                                    placeholder="Item's Fat..."
                                    className="ml-3 bg-transparent border border-solid border-primary p-2 rounded-md"
                                    onChange={(e) => handleOnChangeNutritions(e, 'detail', 'nutritions')}
                                />
                            </div>
                            <div>
                                <label htmlFor="protein">Protein (g): </label>
                                <input
                                    type="number"
                                    name="protein"
                                    placeholder="Item's Protein..."
                                    className="ml-3 bg-transparent border border-solid border-primary p-2 rounded-md"
                                    onChange={(e) => handleOnChangeNutritions(e, 'detail', 'nutritions')}
                                />
                            </div>
                            <div>
                                <label htmlFor="carbs">Carbs (g): </label>
                                <input
                                    type="number"
                                    name="carbs"
                                    placeholder="Item's Carbs..."
                                    className="ml-3 bg-transparent border border-solid border-primary p-2 rounded-md"
                                    onChange={(e) => handleOnChangeNutritions(e, 'detail', 'nutritions')}
                                />
                            </div>
                            <div>
                                <label htmlFor="fibre">Fibre (g): </label>
                                <input
                                    type="number"
                                    name="fibre"
                                    placeholder="Item's Fibre..."
                                    className="ml-3 bg-transparent border border-solid border-primary p-2 rounded-md"
                                    onChange={(e) => handleOnChangeNutritions(e, 'detail', 'nutritions')}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-span-5 row-span-1 mx-auto my-5">
                        <button
                            type="submit"
                            className="border-2 border-solid border-dimWhite px-5 py-3 rounded-md bg-yellow-800 text-gray-200 w-fit mt-10 mx-auto"
                        >
                            Add New Dish
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};
export default AdminAddItem;