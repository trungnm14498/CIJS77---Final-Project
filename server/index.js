const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_TEST);
const bodyParser = require('body-parser');
const cors = require('cors');

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

server.use(cors());


const fs = require("fs");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const SECRET_KEY = "123456789";
const EXPIRES_IN = "1d";
const TOKEN_TYPE = "Bearer";

const auth = function (req, res, next) {
    const status = 401;
    const message = "Unauthorized";

    try {
        const [tokenType, accessToken] = req.headers.authorization.split(" ");
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
server.use(middlewares)

// Add custom routes before JSON Server router
server.get('/echo', (req, res) => {
    res.jsonp(req.query)
})

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser)
server.use((req, res, next) => {
    if (req.method === 'POST') {
        req.body.createdAt = Date.now();
        req.body.updatedAt = Date.now();
    } else if (req.method === 'PATCH') {
        req.body.updatedAt = Date.now();
    }

    // Continue to JSON Server router
    next()
})

//console.log(JSON.parse(fs.readFileSync("./db.json", "utf8")).accounts)
server.use("/api", router);

server.post('/histories', cors(), async (req, res) => {
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
            confirm: true
        })
        console.log("Payment", payment);
        res.json({
            message: "Payment successful",
            success: true
        })
    } catch (error) {
        console.log("Error", error);
        res.json({
            message: "Payment failed",
            success: false
        })
    }
})

server.post("/register", (req, res) => {
    console.log(req.body)
})








// Use default router
server.use('/api', router)
server.listen(3000, () => {
    console.log('JSON Server is running')
})