import axios from "axios";
import { useState, useEffect } from "react";
import CardItem from '../components/CardItem';
import { Link } from "react-router-dom";
import 'swiper/css';
import 'swiper/css/pagination';

const AdminMenu = () => {

    const [categories, setCategories] = useState([]);
    const [itemsList, setItemsList] = useState([]);
    const [idItemsDisplay, setIdItemsDisplay] = useState(0);
    const [sortValue, setSortValue] = useState('');

    const handleFetchItems = () => {
        axios.get("http://localhost:3000/api/menu")
            .then(function (response) {
                setItemsList(response.data);
            })
    }

    const handleFetchCategories = () => {
        axios.get("http://localhost:3000/api/categories")
            .then(function (response) {
                setCategories(response.data);
            })
    }

    const getSortValue = (e) => {
        setSortValue(e.target.value);
    }

    const sortByPrice = () => {
        if (sortValue === "asc") {
            axios.get("http://localhost:3000/api/menu?_sort=price&_order=asc")
                .then(function (response) {
                    setItemsList(response.data);
                })
        }
        if (sortValue === "desc") {
            axios.get("http://localhost:3000/api/menu?_sort=price&_order=desc")
                .then(function (response) {
                    setItemsList(response.data);
                })
        } if (sortValue === "all") {
            axios.get("http://localhost:3000/api/menu")
                .then(function (response) {
                    setItemsList(response.data);
                })
        }
    }

    if (categories.every(item => item.id !== 0)) {
        const categoryAll = { 'id': 0, 'name': 'all' }
        categories.unshift(categoryAll);
    }


    useEffect(() => {
        handleFetchItems();
    }, []);

    useEffect(() => {
        handleFetchCategories();
    }, []);

    useEffect(() => {
        sortByPrice();
    }, [sortValue]);

    return (
        <section className="xl:max-w-[1280px] w-full mx-auto sm:px-10 px-20 flex flex-col sm:mt-40 mt-28" >
            <div className='w-fit xs:mb-10'>
                <h2 className='font-play sm:text-7xl ss:text-5xl text-3xl text-gradient uppercase inline-block'>U P D A T E &nbsp; M E N U.</h2>
                <div className='h-[3px] bg-cf-gradient' />
            </div>

            <Link to='/admin-menu/addNewItem' className="btn-sub w-[20%] mx-auto mb-5 text-center">Add New Food</Link>

            <div className="flex gap-10 mb-10">
                {
                    categories.map(category => {
                        return (
                            <button className="btn-sub capitalize" key={category.id} onClick={() => setIdItemsDisplay(category.id)}>{category.name}</button>
                        )
                    })
                }
                <select name="sortPrice" className="btn-sub" onChange={getSortValue} defaultValue="all">
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
                                id={item.id} />
                        )
                    }) :
                        itemsList.filter(item => item.categoryId === idItemsDisplay).map(item => {
                            return (
                                <CardItem
                                    key={item.id}
                                    image={item.image}
                                    name={item.name}
                                    price={item.price}
                                    id={item.id} />
                            )
                        })
                }
            </div>
        </section>
    )
};

export default AdminMenu;
