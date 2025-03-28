console.log('Backend/index.js');
//Server
const express = require('express');

//Database
const mongoose = require('mongoose');
const {connectMongoDb} = require('./connections');

//Middlewares
const { authenticateUser,authorizeBusiness } = require('./middlewares/authentication');

//Routes
const userRouter = require('./routes/usersAuthenticationRoutes');
const businessRouter = require('./routes/businessAuthenticationRoutes');
const productRouter = require('./routes/productRoutes');
const productCategoryRouter = require('./routes/productCategoryRoutes');
const productSubCategoryRouter = require('./routes/productSubCategoryRoutes');
const userProfileRouter = require('./routes/userProfileRoutes');
const cartRouter = require('./routes/cartRoutes');
const userSelectRouter = require('./routes/userRoutes');
const questionRouter = require('./routes/questionRoutes');

//Server
const app = express();
PORT = 8000;


//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false}));
// app.use(checkForAuthentication);

const cors = require('cors');
app.use(cors({
    origin: 'http://localhost:8081',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.options('*', cors());
//MongoDB Connection
connectMongoDb('mongodb+srv://dhruvrp1703:DhruvPrajapati1731@qloud.lzryb.mongodb.net/Qloud')
    .then(() => console.log('connected to mongoDb'))
    .catch((err) => console.log('Error connecting to MongoDB', err));


//Routers
//User routes
app.use('/user/auth', userRouter);
app.use('/user/profile', userProfileRouter);

//Business Routes
app.use('/business/auth', businessRouter);
app.use("/business/user", userSelectRouter);
app.use("/business/questions", questionRouter);

//Product-category routes  -- Restricted to Admin
app.use("/product-category", productCategoryRouter);

//Product-category routes  -- Restricted to Admin
app.use("/product-sub-category", productSubCategoryRouter);

//Product Routes    --- Restricted to Business person
app.use("/product", productRouter);

//Cart Routes -- Restricted to user. need to add restrictTo["USER"] later.  
app.use("/cart", cartRouter);

app.listen(PORT, ()=>{console.log(`Server Started at port, ${PORT}`)});
