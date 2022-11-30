import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const AdminDetailMenu = () => {

    const navigate = useNavigate();

    const { itemId } = useParams();
    const [itemDisplay, setItemDisplay] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [newInfo, setNewInfo] = useState({
        name: "",
        price: 0,
        image: "",
        categoryId: 0,
        detail: {
            desc: "",
            ingredients: "",
            nutritions: {
                kcal: 0,
                fat: 0,
                protein: 0,
                carbs: 0,
                fibre: 0
            }
        }
    })

    const handleOnChange = (e, key) => {
        let newValue = e.target.value;
        if (key === 'price' || key === 'categoryId') {
            newValue = parseFloat(newValue)
        }
        setNewInfo((prev) => { return { ...prev, [key]: newValue } })
    }
    const handleOnChange1 = (e, key) => {
        const { value, name } = e.target;

        setNewInfo((prev) => {
            const x = { ...prev[key], [name]: value }
            return { ...prev, [key]: x }
        })

    }
    const handleOnChange2 = (e, detail, nutritions) => {
        const { value, name } = e.target;
        const newValue = parseFloat(value);

        setNewInfo((prev) => {
            const y = { ...prev.detail.nutritions, [name]: newValue }
            const x = { ...prev[detail], [nutritions]: y }
            return { ...prev, [detail]: x }
        })
    }

    const handleFetchItem = () => {
        axios.get(`http://localhost:3000/api/menu/${itemId}`)
            .then(function (response) {
                setItemDisplay(response.data);
                setNewInfo(response.data);
            })
            .then(function () {
                setIsLoading(true);
            })
    }

    const handleUpdateItem = (e) => {
        e.preventDefault();
        Object.keys(newInfo).map((key) => {
            if (newInfo[key] !== '') {
                axios.patch(`http://localhost:3000/api/menu/${itemId}`, {
                    [key]: newInfo[key]
                }).then(function () {
                    navigate('/admin-menu');
                });
            }
        });
    }

    const handleDeleteItem = (e) => {
        e.preventDefault();
        axios.delete(`http://localhost:3000/api/menu/${itemId}`)
            .then(function () {
                alert("Successfully Deleted Item")
                navigate('/admin-menu');
            });
    }

    useEffect(() => {
        handleFetchItem();
    }, [])

    return (
        <section className="xl:max-w-[1280px] w-full mx-auto sm:px-10 px-20 flex flex-col sm:mt-40 mt-28 h-[70vh]" >
            <div className='w-fit xs:mb-10'>
                <h2 className='font-play sm:text-7xl ss:text-5xl text-3xl text-gradient uppercase inline-block'>D E T A I L &nbsp; M E N U.</h2>
                <div className='h-[3px] bg-cf-gradient' />
            </div>

            {isLoading &&
                <div className="flex flex-col justify-center items-center">
                    <form onSubmit={handleUpdateItem} className="grid grid-cols-5 grid-rows-10 w-[80%] border-solid border-2 border-primary text-dimWhite">
                        <div className="col-span-2 row-span-9 p-5">
                            <div className="picture">
                                <img src={itemDisplay.image} alt="img1" className="w-[310px] h-[310px]" />
                            </div>
                            <div className="flex flex-col gap-3 mt-5 text-lg ">
                                <div>
                                    <label htmlFor="image">Choose a food picture</label>
                                    <input type="file" name="image" accept="image/png, image/jpeg" className="my-3" />
                                </div>
                                <div className="flex justify-between items-center">
                                    <label htmlFor="name">Name: </label>
                                    <input type="text" name="name" className="ml-2 bg-transparent border border-solid border-primary p-2 rounded-md" defaultValue={itemDisplay.name} placeholder={itemDisplay.name} onChange={(e) => {
                                        handleOnChange(e, 'name');
                                    }} />
                                </div>
                                <div className="flex justify-between items-center">
                                    <label htmlFor="price">Price ($): </label>
                                    <input type="number" name="price" className="ml-2 bg-transparent border border-solid border-primary p-2 rounded-md" defaultValue={itemDisplay.price} placeholder={itemDisplay.price} onChange={(e) => {
                                        handleOnChange(e, 'price');
                                    }} />
                                </div>
                                <div className="flex justify-between items-center">
                                    <label htmlFor="category">Category: </label>
                                    <select type="text" name="category" className="ml-2 bg-transparent border border-solid border-primary p-2 rounded-md" defaultValue={itemDisplay.categoryId} onChange={(e) => {
                                        handleOnChange(e, 'categoryId');
                                    }}>
                                        <option value="1" className="text-black">Starter</option>
                                        <option value="2" className="text-black">Pho</option>
                                        <option value="3" className="text-black">Noodle</option>
                                        <option value="4" className="text-black">Drink</option>
                                        <option value="5" className="text-black">Dessert</option>
                                    </select>
                                </div>
                            </div>

                        </div>

                        <div className="col-span-3 p-5">
                            <div className="flex flex-col gap-2">
                                <label htmlFor="desc">Description: </label>
                                <textarea type="text" name="desc" rows="5" className="ml-2 bg-transparent border border-solid border-primary p-2 rounded-md resize-none mb-2" defaultValue={itemDisplay.detail.desc} placeholder={itemDisplay.detail.desc} onChange={(e) => {
                                    handleOnChange1(e, 'detail');
                                }} />
                                <label htmlFor="ingredients">Ingredients: </label>
                                <textarea type="text" name="ingredients" rows="1" className="ml-2 bg-transparent border border-solid border-primary p-2 rounded-md resize-none mb-2" defaultValue={itemDisplay.detail.ingredients} placeholder={itemDisplay.detail.ingredients} onChange={(e) => {
                                    handleOnChange1(e, 'detail');
                                }} />
                                <div>Nutritions: </div>
                                <div>
                                    <label htmlFor="kcal">Kcal (g): </label>
                                    <input type="text" name="kcal" defaultValue={itemDisplay.detail.nutritions.kcal} placeholder={itemDisplay.detail.nutritions.kcal} className="ml-3 bg-transparent border border-solid border-primary p-2 rounded-md" onChange={(e) => handleOnChange2(e, 'detail', "nutritions")} />
                                </div>
                                <div>
                                    <label htmlFor="fat">Fat (g): </label>
                                    <input type="text" name="fat" defaultValue={itemDisplay.detail.nutritions.fat} placeholder={itemDisplay.detail.nutritions.fat} className="ml-3 bg-transparent border border-solid border-primary p-2 rounded-md" onChange={(e) => handleOnChange2(e, 'detail', "nutritions")} />
                                </div>
                                <div>
                                    <label htmlFor="protein">Protein (g): </label>
                                    <input type="text" name="protein" defaultValue={itemDisplay.detail.nutritions.protein} placeholder={itemDisplay.detail.nutritions.protein} className="ml-3 bg-transparent border border-solid border-primary p-2 rounded-md" onChange={(e) => handleOnChange2(e, 'detail', "nutritions")} />
                                </div>
                                <div>
                                    <label htmlFor="carbs">Carbs (g): </label>
                                    <input type="text" name="carbs" defaultValue={itemDisplay.detail.nutritions.carbs} placeholder={itemDisplay.detail.nutritions.carbs} className="ml-3 bg-transparent border border-solid border-primary p-2 rounded-md" onChange={(e) => handleOnChange2(e, 'detail', "nutritions")} />
                                </div>
                                <div>
                                    <label htmlFor="fibre">Fibre (g): </label>
                                    <input type="text" name="fibre" defaultValue={itemDisplay.detail.nutritions.fibre} placeholder={itemDisplay.detail.nutritions.fibre} className="ml-3 bg-transparent border border-solid border-primary p-2 rounded-md" onChange={(e) => handleOnChange2(e, 'detail', "nutritions")} />
                                </div>
                            </div>
                        </div>
                        <div className="col-span-5 row-span-1 mx-auto my-5">
                            <button type='submit' className="btn-sub mr-10">Update Dish</button>
                            <button onClick={handleDeleteItem} className="btn-sub">Delete Dish</button>
                        </div>
                    </form>
                </div>
            }
        </section>
    )
};
export default AdminDetailMenu;
