const feedbackAPI = 'http://localhost:3000/api/feedbacks';
const categoriesAPI = 'http://localhost:3000/api/categories';
const accountsAPI = 'http://localhost:3000/api/accounts';
const menuAPI = 'http://localhost:3000/api/menu';
const menuAscSortPrice = 'http://localhost:3000/api/menu?_sort=price&_order=asc';
const menuDescSortPrice = 'http://localhost:3000/api/menu?_sort=price&_order=desc';
const orderSort1API = 'http://localhost:3000/api/histories?amount_gte=0&amount_lte=50&_sort=amount&_order=asc';
const orderSort2API = 'http://localhost:3000/api/histories?amount_gte=50&amount_lte=100&_sort=amount&_order=asc'
const orderSort3API = 'http://localhost:3000/api/histories?amount_gte=100&amount_lte=150&_sort=amount&_order=asc'
const orderSort4API = 'http://localhost:3000/api/histories?amount_gte=150&_sort=amount&_order=asc'
const orderFirstPageAPI = 'http://localhost:3000/api/histories?_page=1&_limit=4';
const orderAPI = 'http://localhost:3000/api/histories';

export { feedbackAPI, categoriesAPI, menuAPI, menuAscSortPrice, menuDescSortPrice, orderSort1API, orderSort2API, orderSort3API, orderSort4API, orderFirstPageAPI, orderAPI, accountsAPI }