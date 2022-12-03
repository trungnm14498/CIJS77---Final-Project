import axios from 'axios';
import CardItem from '../components/CardItem';

import { BsSearch } from 'react-icons/bs';
import { AiOutlineShoppingCart } from 'react-icons/ai';

import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { selectItemTotal, selectItem } from '../redux/selectors';

const MenuItems = () => {
    const { type } = useParams();
    const totalPrice = useSelector(selectItemTotal);
    const items = useSelector(selectItem);
    const [searchText, setSearchText] = useState("")

    const [itemList, setItemList] = useState([]);
    const [categories, setCategories] = useState([]);

    const handleSearchChange = (e) => {
        setSearchText(e.target.value)
    }

    const handleFetchMenu = () => {
        axios
            .get("http://localhost:3000/api/categories")
            .then(function (response) {
                setCategories(response.data)
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    const displayItem = () => {
        categories.length && axios
            .get(`http://localhost:3000/api/menu?categoryId=${categories.filter((c) => c.name === type)[0].id}`)
            .then(function (response) {
                setItemList(response.data)
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    useEffect(() => {
        handleFetchMenu();
    }, []);

    useEffect(() => {
        displayItem();
    }, [type, categories])
    return (
        <>
            <section className='xl:max-w-[1280px] w-full mx-auto sm:px-10 px-20 flex flex-col sm:mt-40 mt-28 h-fit'>
                <div className='flex flex-col'>
                    <div className='flex gap-8 items-center'>
                        <div className='flex flex-wrap justify-center items-center gap-5'>
                            {categories.map((item, index) => item.name).map((category) => (
                                <Link
                                    key={category}
                                    to={`/menu/${category}`}
                                    className='py-2 w-[120px] bg-[#dddddd] text-black border-2 border-solid border-primary rounded inline-block text-center text-xl font-semibold hover: hover:bg-[#9F643D] hover:text-white hover:border-white capitalize' onClick={displayItem}
                                >
                                    {category}
                                </Link>
                            ))}
                            <div className='flex items-center px-3 py-2 bg-transparent rounded-2xl border-2 border-primary border-solid text-dimWhite w-[250px]'>
                                <BsSearch className='rotate-90 w-[25px] h-[25px] mr-2' />
                                <input value={searchText} onChange={handleSearchChange} type='search' className='bg-transparent w-full px-1' placeholder='Find your dish...'></input>
                            </div>

                            <Link to={totalPrice !== 0 ? `/cartItems` : `/cartEmpty`} className='flex items-center'>
                                <span className='font-semibold text-2xl text-white'>$ {totalPrice}</span>
                                <AiOutlineShoppingCart className='text-primary w-[32px] h-[32px] mx-3' />
                                <span className='font-semibold text-2xl text-white'>{items.length}</span>
                            </Link>
                        </div>


                    </div>

                    <div className='flex mt-14 md:flex-row flex-col'>
                        {categories[0] &&
                            (
                                <div className='picture relative lg:mr-20 mx-auto md:h-[500px] h-[420px] lg:w-[550px] w-[300px]'>
                                    <img src={categories.filter((c) => c.name === type)[0].image} alt='background' className='h-full opacity-60 blur-[1px]' />
                                    <div className='absolute md:top-[25%] top-[15%] text-center px-3'>
                                        <h3 className='inline-block font-semibold text-black text-2xl bg-dimWhite px-5 py-3 rounded-lg md:mb-5 mb-2 capitalize'>
                                            {type}
                                        </h3>
                                        <p className='md:text-lg text-base'>{categories.filter((c) => c.name === type)[0].desc}</p>
                                    </div>
                                </div>
                            )}

                        <div className='flex flex-wrap gap-x-14 gap-y-5 justify-center p-5 lg:border-t border-solid border-dimWhite w-full lg:mt-0 mt-5'>
                            {itemList.filter((item) => item.name.toLowerCase().includes(searchText.toLowerCase())).map((item) => (
                                <CardItem
                                    key={item.id}
                                    image={item.image}
                                    name={item.name}
                                    price={item.price}
                                    id={item.id}
                                    type={type} />
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default MenuItems;
