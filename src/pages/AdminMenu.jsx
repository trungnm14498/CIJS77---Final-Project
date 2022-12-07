// Refactored

import axios from "axios";
import { useState, useEffect } from "react";
import CardItem from '../components/CardItem';
import { Link } from "react-router-dom";
import 'swiper/css';
import 'swiper/css/pagination';
import { menuAPI, categoriesAPI, menuAscSortPrice, menuDescSortPrice } from "../hooks";
import { useGetData } from "../hooks/feedbacks/useGetData";

const AdminMenu = () => {

    const { data: categories } = useGetData(true, categoriesAPI);
    const { data: itemsList, setData: setItemsList } = useGetData(true, menuAPI);
    const [idItemsDisplay, setIdItemsDisplay] = useState(0);
    const [sortValue, setSortValue] = useState('');


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
    }, [sortValue, itemsList]);

    return (
        <section className="xl:max-w-[1280px] w-full mx-auto sm:px-10 px-20 flex flex-col sm:mt-40 mt-28" >
            <div className='w-fit mb-10'>
                <h2 className='font-play sm:text-7xl ss:text-5xl text-2xl text-gradient uppercase inline-block'>U P D A T E &nbsp; M E N U.</h2>
                <div className='h-[3px] bg-cf-gradient' />
            </div>

            <Link to='/admin-menu/addNewItem' className='btn-main sm:text-base text-[12px] mx-auto mb-10'>Add New Food</Link>

            <div className="flex flex-wrap xs:gap-8 gap-2 mb-10 xs:items-center xs:justify-center justify-start">
                {
                    categories.map(category => {
                        return (
                            <button className="btn-sub capitalize" key={category.id} onClick={() => setIdItemsDisplay(category.id)}>{category.name}</button>
                        )
                    })
                }
                <select name="sortPrice" className="border-dimWhite border-solid border-2 bg-slate-400 text-black py-2 px-5 rounded-md" onChange={getSortValue} defaultValue="all">
                    <option value="all"></option>
                    <option value="asc">Ascending by Price</option>
                    <option value="desc">Descending by Price</option>
                </select>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-5">
                {
                    idItemsDisplay === 0 ? itemsList.map(item => {
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
                    }) :
                        itemsList.filter(item => item.categoryId === idItemsDisplay).map(item => {
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

export default AdminMenu;
