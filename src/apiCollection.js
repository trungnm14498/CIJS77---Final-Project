const baseURL = 'http://localhost:3000/api';

// CategoriesApi
const allCategories = `${baseURL}/categories`;
const categoriesById = (id => `${baseURL}/categories/${id}`);

// MenuApi
const allMenuItemAPI = `${baseURL}/menu`;
const menuItemById = (id => `${baseURL}/menu/${id}`);
const menuItemsByName = (searchText => `${baseURL}/menu/?name_like=${searchText}`)
const ascMenuItemsByPrice = `${baseURL}/menu/?_sort=price&_order=asc`;
const descMenuItemsByPrice = `${baseURL}/menu/?_sort=price&_order=`;

export { allCategories, categoriesById, allMenuItemAPI, menuItemById, menuItemsByName, ascMenuItemsByPrice, descMenuItemsByPrice }
