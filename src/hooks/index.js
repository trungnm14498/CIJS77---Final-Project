const feedbackAPI = 'https://after-eleven-server.herokuapp.com/api/feedbacks';
const categoriesAPI = 'https://after-eleven-server.herokuapp.com/api/categories';
const accountsAPI = 'https://after-eleven-server.herokuapp.com/api/accounts';
const menuAPI = 'https://after-eleven-server.herokuapp.com/api/menu';
const menuAscSortPrice = 'https://after-eleven-server.herokuapp.com/api/menu?_sort=price&_order=asc';
const menuDescSortPrice = 'https://after-eleven-server.herokuapp.com/api/menu?_sort=price&_order=desc';
const orderSort1API =
    'https://after-eleven-server.herokuapp.com/api/histories?amount_gte=0&amount_lte=50&_sort=amount&_order=asc';
const orderSort2API =
    'https://after-eleven-server.herokuapp.com/api/histories?amount_gte=50&amount_lte=100&_sort=amount&_order=asc';
const orderSort3API =
    'https://after-eleven-server.herokuapp.com/api/histories?amount_gte=100&amount_lte=150&_sort=amount&_order=asc';
const orderSort4API = 'https://after-eleven-server.herokuapp.com/api/histories?amount_gte=150&_sort=amount&_order=asc';
const orderFirstPageAPI = 'https://after-eleven-server.herokuapp.com/api/histories?_page=1&_limit=4';
const orderAPI = 'https://after-eleven-server.herokuapp.com/api/histories';

export {
    feedbackAPI,
    categoriesAPI,
    menuAPI,
    menuAscSortPrice,
    menuDescSortPrice,
    orderSort1API,
    orderSort2API,
    orderSort3API,
    orderSort4API,
    orderFirstPageAPI,
    orderAPI,
    accountsAPI,
};