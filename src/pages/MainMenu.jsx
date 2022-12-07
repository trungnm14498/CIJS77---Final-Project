import axios from "axios";
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { useState, useEffect } from "react";
import CardItem from '../components/CardItem';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectItemTotal, selectItem } from "../redux/selectors";
import { useGetData } from "../hooks/feedbacks/useGetData";
import { categoriesAPI, menuAPI, menuAscSortPrice, menuDescSortPrice } from "../hooks";

import 'swiper/css';
import 'swiper/css/pagination';

const MainMenu = () => {

    const { data: categories } = useGetData(true, categoriesAPI);
    const { data: itemsList, setData: setItemsList } = useGetData(true, menuAPI);
    const totalPrice = useSelector(selectItemTotal);
    const items = useSelector(selectItem);
    const [sortValue, setSortValue] = useState('');
    console.log(itemsList[0]);
    console.log(categories);


    if (categories.every(item => item.id !== 0)) {
        const categoryAll = { 'id': 0, 'name': 'all' }
        categories.unshift(categoryAll);
        categories.sort((a, b) => { return a.id - b.id });
    }

    const getSortValue = (e) => {
        setSortValue(e.target.value);
    }

    useEffect(() => {
        if (sortValue === "asc") {
            axios.get(menuAscSortPrice)
                .then(function (response) {
                    setItemsList(response.data);
                })
        }
        if (sortValue === "desc") {
            axios.get(menuDescSortPrice)
                .then(function (response) {
                    setItemsList(response.data);
                })
        } if (sortValue === "all") {
            axios.get(menuAPI)
                .then(function (response) {
                    setItemsList(response.data);
                })
        }
    }, [sortValue]);

    return (
        <section className="xl:max-w-[1280px] w-full mx-auto sm:px-10 px-20 flex flex-col sm:mt-40 mt-28" >
            <div className='flex flex-wrap gap-8 items-center justify-center mb-10'>
                <div className='flex justify-center items-center gap-5'>
                    {categories.map((item, index) => item.name).map((category) => (
                        <Link
                            key={category}
                            to={`/menu/${category}`}
                            className='py-2 w-[110px] bg-[#dddddd] text-black border-2 border-solid border-primary rounded inline-block text-center text-xl font-semibold hover: hover:bg-[#9F643D] hover:text-white hover:border-white capitalize'
                        >
                            {category}
                        </Link>
                    ))}
                </div>

                <select name="sortPrice" className="border border-solid border-dimWhite bg-slate-400 p-2 rounded-md" onChange={getSortValue} defaultValue="all">
                    <option value="all"></option>
                    <option value="asc">Ascending by Price</option>
                    <option value="desc">Descending by Price</option>
                </select>

                <Link to={totalPrice !== 0 ? `/cartItems` : `/cartEmpty`} className='flex items-center'>
                    <span className='font-semibold text-2xl text-white'>$ {totalPrice}</span>
                    <AiOutlineShoppingCart className='text-primary w-[32px] h-[32px] mx-3' />
                    <span className='font-semibold text-2xl text-white'>{items.length}</span>
                </Link>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-5">
                {
                    itemsList.map(item => {
                        return (
                            <CardItem
                                key={item.id}
                                image={item.image}
                                name={item.name}
                                price={item.price}
                                id={item.id}
                                type={categories[item.categoryId].name}
                            />
                        )
                    })
                }
            </div>
        </section>
    )
};

export default MainMenu;
