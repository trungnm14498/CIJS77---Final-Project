const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_TEST);
const bodyParser = require('body-parser');
const cors = require('cors');

const { v4: uuidv4 } = require('uuid');

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

server.use(cors());

const fs = require('fs');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SECRET_KEY = '123456789';
const EXPIRES_IN = '1d';
const TOKEN_TYPE = 'Bearer';

const auth = function (req, res, next) {
    const status = 401;
    const message = 'Unauthorized';

    try {
        const [tokenType, accessToken] = req.headers.authorization.split(' ');
        if (!accessToken || tokenType !== TOKEN_TYPE) {
            res.status(status).json({ status, message });
        }

        jwt.verify(accessToken, SECRET_KEY, (error, decode) => {
            if (error) {
                res.status(status).json({ status, message });
            } else {
                next();
            }
        });
    } catch (err) {
        res.status(status).json({ status, message });
    }
};

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// Add custom routes before JSON Server router
server.get('/echo', (req, res) => {
    res.jsonp(req.query);
});

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser);

server.use((req, res, next) => {
    if (req.method === 'POST') {
        req.body.createdAt = Date.now();
        req.body.updatedAt = Date.now();
    } else if (req.method === 'PATCH') {
        req.body.updatedAt = Date.now();
    }

    // Continue to JSON Server router
    next();
});

//console.log(JSON.parse(fs.readFileSync("./db.json", "utf8")).accounts)

server.post('/api/histories', cors(), async (req, res) => {
    let { amount, time, method, username, name, phone } = req.body;
    try {
        const payment = await stripe.paymentIntents.create({
            amount,
            currency: 'USD',
            customer: `${username}: ${name}`,
            payment_method: method,
            confirm: true,
            time,
            phone,
            confirm: true,
        });
        console.log('Payment', payment);
        res.json({
            message: 'Payment successful',
            success: true,
        });
    } catch (error) {
        console.log('Error', error);
        res.json({
            message: 'Payment failed',
            success: false,
        });
    }
});

// bcrypt.genSalt(10, function (err, salt) {
//     bcrypt.hash("123", salt, function (err, hash) {
//         console.log(hash)
//     });
// });

server.post('/api/changepass', async (req, res) => {
    try {
        const { currPassword, newPassword, id } = req.body;
        const status = 401;
        const message = 'Current password not matched';

        const salt = await bcrypt.genSalt(10);
        const hashNewPassword = await bcrypt.hash(newPassword, salt);

        const rawData = fs.readFileSync('./db.json', 'utf8');
        const database = JSON.parse(rawData);
        const accounts = database.accounts;
        const user = accounts.find((item) => item.id === id);
        const indexUser = accounts.findIndex((item) => item.id === id);

        const validPassword = await bcrypt.compare(currPassword, user.password);

        if (!validPassword) {
            res.status(status).json({ status, message });
            return;
        } else {
            database.accounts[indexUser].password = hashNewPassword;
            fs.writeFileSync('./db.json', JSON.stringify(database, null, 2));
            res.status(200).json({ message: 'Password changed successfully' });
        }
    } catch (error) {
        console.log('error ', error);
        res.status(500).json({ error: 'Server Error' });
    }
});
server.post('/api/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        const status = 401;
        const message = 'Incorrect username or password';

        const rawData = fs.readFileSync('./db.json', 'utf8');
        const accounts = JSON.parse(rawData).accounts || [];
        const user = accounts.find((item) => item.username === username);

        if (!user) {
            res.status(status).json({ status, message });
            return;
        }

        const validPassword = await bcrypt.compare(password, user.password);

        if (validPassword) {
            const accessToken = jwt.sign({ username }, SECRET_KEY, {
                expiresIn: EXPIRES_IN,
            });

            res.status(200).json({
                accessToken,
                expiresIn: EXPIRES_IN,
                tokenType: TOKEN_TYPE,
                userData: { username: user.username, role: user.role, id: user.id },
            });
        } else {
            res.status(status).json({ status, message });
        }
    } catch (error) {
        console.log('error ', error);
        res.status(500).json({ error: 'Server Error' });
    }
});

server.post('/api/register', async (req, res) => {
    try {
        const user = req.body;

        if (!(user.username && user.password)) {
            return res.status(400);
        }

        const rawData = fs.readFileSync('./db.json', 'utf8');
        const database = JSON.parse(rawData);

        const isExisting = database.accounts.some((item) => item.username === user.username);

        if (isExisting) {
            return res.status(400).send({ error: `Username ${user.username} already exist` });
        }

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        user.id = uuidv4();
        user.role = 'user';
        user.name = '';
        user.birthday = '';
        user.phone = '';
        user.email = '';
        user.gender = '';
        user.address = '';
        database.accounts.push(user);
        fs.writeFileSync('./db.json', JSON.stringify(database, null, 2));

        res.status(200).json({ message: 'created' });
    } catch (err) {
        res.status(500).json({ error: 'Server Error' });
    }
});

// Use default router
const port = process.env.PORT || 3000;
server.use('/api', router);
server.listen(port, () => {
    console.log('JSON Server is running');
});