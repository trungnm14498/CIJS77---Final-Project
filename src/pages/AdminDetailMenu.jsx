// import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { menuAPI } from "../hooks";
import { useDeleteItem } from "../hooks/feedbacks/useDeleteData";
import { useGetDataById } from "../hooks/feedbacks/useGetDataById";

const AdminDetailMenu = () => {

    const navigate = useNavigate();

    const { itemId } = useParams();
    const { data1: itemDisplay, data2: newInfo, setData2: setNewInfo, isLoading } = useGetDataById(true, menuAPI, itemId);

    const handleOnChange = (e, key) => {
        let newValue = e.target.value;
        if (key === 'price' || key === 'categoryId') {
            newValue = parseFloat(newValue)
        }
        console.log(newValue);
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

    const handleUpdateItem = (e) => {
        e.preventDefault();
        Object.keys(newInfo).map((key) => {
            if (newInfo[key] !== '') {
                axios.patch(`${menuAPI}/${itemId}`, {
                    [key]: newInfo[key]
                }).then(function () {
                    navigate('/admin-menu');
                });
            }
        });
    }


    return (
        <section className="xl:max-w-[1280px] w-full mx-auto sm:px-10 px-20 flex flex-col sm:mt-40 mt-28 " >
            <div className='w-fit mb-10'>
                <h2 className='font-play sm:text-7xl ss:text-5xl text-2xl text-gradient uppercase inline-block'>D E T A I L &nbsp; M E N U.</h2>
                <div className='h-[3px] bg-cf-gradient' />
            </div>

            {!isLoading &&
                <div className="flex flex-col justify-center items-center">
                    <form onSubmit={handleUpdateItem} className="xs:grid xs:grid-cols-5 xs:grid-rows-10 sm:w-[80%] w-full border-solid border-2 border-primary text-dimWhite flex flex-col justify-center">
                        <div className="col-span-2 row-span-9 p-5">
                            <div className="picture xs:ml-0 ml-6">
                                <img src={itemDisplay.image} alt="img1" className="sm:w-[310px] sm:h-[310px] xs:w-[200px] xs:h-[200px] w-[150px] h-[150px]" />
                            </div>
                            <div className="flex flex-col gap-3 mt-5">
                                <div className="flex flex-wrap">
                                    <label htmlFor="image">Choose a food picture</label>
                                    <input type="file" name="image" accept="image/png, image/jpeg" className="my-3 text-sm" />
                                </div>
                                <div className="flex items-center">
                                    <label htmlFor="name" className="w-[120px]">Name: </label>
                                    <input type="text" name="name" className="ml-4 bg-transparent border border-solid border-primary p-2 rounded-md sm:w-full w-[80%]" defaultValue={itemDisplay.name} placeholder={itemDisplay.name} onChange={(e) => {
                                        handleOnChange(e, 'name');
                                    }} />
                                </div>
                                <div className="flex items-center">
                                    <label htmlFor="price" className="w-[120px]" >Price ($): </label>
                                    <input type="text" name="price" className="ml-4 bg-transparent border border-solid border-primary p-2 rounded-md sm:w-full w-[80%]" defaultValue={itemDisplay.price} placeholder={itemDisplay.price} onChange={(e) => {
                                        handleOnChange(e, 'price');
                                    }} />
                                </div>
                                <div className="flex items-center">
                                    <label htmlFor="categoryId" className="w-[120px]">Category: </label>
                                    <select type="text" name="categoryId" className="ml-4 bg-transparent border border-solid border-primary p-2 rounded-md sm:w-full w-[80%]" onChange={(e) => {
                                        handleOnChange(e, 'categoryId');
                                    }}>
                                        <option value="" className="text-black hidden"></option>
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
                                <textarea type="text" name="desc" rows="5" className="ml-2 bg-transparent border border-solid border-primary p-2 rounded-md resize-none mb-2 sm:text-base text-sm" defaultValue={itemDisplay.detail.desc} placeholder={itemDisplay.detail.desc} onChange={(e) => {
                                    handleOnChange1(e, 'detail');
                                }} />
                                <label htmlFor="ingredients">Ingredients: </label>
                                <textarea type="text" name="ingredients" rows="2" className="ml-2 bg-transparent border border-solid border-primary p-2 rounded-md resize-none mb-2 sm:text-base text-sm h-fit" defaultValue={itemDisplay.detail.ingredients} placeholder={itemDisplay.detail.ingredients} onChange={(e) => {
                                    handleOnChange1(e, 'detail');
                                }} />
                                <div className="sm:mt-0 mt-5">Nutritions: </div>
                                <div className="flex flex-col gap-4">
                                    <div className="flex items-center">
                                        <label htmlFor="kcal" className="w-[100px]">Kcal (g): </label>
                                        <input type="text" name="kcal" defaultValue={itemDisplay.detail.nutritions.kcal} placeholder={itemDisplay.detail.nutritions.kcal} className="ml-3 bg-transparent border border-solid border-primary p-2 rounded-md w-[150px]" onChange={(e) => handleOnChange2(e, 'detail', "nutritions")} />
                                    </div>
                                    <div className="flex items-center">
                                        <label htmlFor="fat" className="w-[100px]">Fat (g): </label>
                                        <input type="text" name="fat" defaultValue={itemDisplay.detail.nutritions.fat} placeholder={itemDisplay.detail.nutritions.fat} className="ml-3 bg-transparent border border-solid border-primary p-2 rounded-md w-[150px]" onChange={(e) => handleOnChange2(e, 'detail', "nutritions")} />
                                    </div>
                                    <div className="flex items-center">
                                        <label htmlFor="protein" className="w-[100px]">Protein (g): </label>
                                        <input type="text" name="protein" defaultValue={itemDisplay.detail.nutritions.protein} placeholder={itemDisplay.detail.nutritions.protein} className="ml-3 bg-transparent border border-solid border-primary p-2 rounded-md w-[150px]" onChange={(e) => handleOnChange2(e, 'detail', "nutritions")} />
                                    </div>
                                    <div className="flex items-center">
                                        <label htmlFor="carbs" className="w-[100px]">Carbs (g): </label>
                                        <input type="text" name="carbs" defaultValue={itemDisplay.detail.nutritions.carbs} placeholder={itemDisplay.detail.nutritions.carbs} className="ml-3 bg-transparent border border-solid border-primary p-2 rounded-md w-[150px]" onChange={(e) => handleOnChange2(e, 'detail', "nutritions")} />
                                    </div>
                                    <div className="flex items-center">
                                        <label htmlFor="fibre" className="w-[100px]">Fibre (g): </label>
                                        <input type="text" name="fibre" defaultValue={itemDisplay.detail.nutritions.fibre} placeholder={itemDisplay.detail.nutritions.fibre} className="ml-3 bg-transparent border border-solid border-primary p-2 rounded-md w-[150px]" onChange={(e) => handleOnChange2(e, 'detail', "nutritions")} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-5 row-span-1 mx-auto my-5 flex xs:flex-row flex-col items-center gap-2">
                            <button type='submit' className="btn-main xs:mr-10 m-0">Update Dish</button>
                            <button onClick={(e) => useDeleteItem(e, menuAPI, itemId, navigate('/admin-menu'))} className="btn-sub">Delete Dish</button>
                        </div>
                    </form>
                </div>
            }
        </section>
    )
};
export default AdminDetailMenu;
