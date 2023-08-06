

// var jwt = require('jsonwebtoken');
// require('dotenv').config();
// const stripe = require('stripe')('sk_test_51L19j3JpfOx2cnrFx4oLeFW8e4Db4zwCING9yF5NgLibHQDrVniisKpacG5Q97ub71g0HwS69i4kHMT1s3fAMDCc00ZLhcBjxu');
// const nodemailer = require('nodemailer');
const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config()
const partRoutes = require('./routes/part.routes')
const brandRoutes = require('./routes/brand.routes')
const storeRoutes = require('./routes/store.routes')
const stockRoutes = require('./routes/stock.routes')
const userRoutes = require('./routes/user.route')
const reviewRoutes = require('./routes/review.route')
const orderRoutes = require('./routes/order.route');
const { errorResponse } = require('./controllers/response.controller');


//middlewares
app.use(cors());
app.use(express.json());


//routes
app.use('/api/v1/parts',partRoutes)
app.use('/api/v1/brand',brandRoutes)
app.use('/api/v1/store',storeRoutes)
app.use('/api/v1/stock',stockRoutes)
app.use('/api/v1/user',userRoutes)
app.use('/api/v1/review',reviewRoutes)
app.use('/api/v1/order',orderRoutes)


// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: process.env.GMAIL,
//         pass: process.env.PASS
//     }
// })

// const uri = `mongodb+srv://${process.env.M_D_USER}:${process.env.M_D_PASS}@cluster0.hloku.mongodb.net/?retryWrites=true&w=majority`;
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


// function verifyJwt(req, res, next) {
//     const authHeader = req.headers.authorization;
//     if (!authHeader) {
//         return res.status(401).send({ message: 'UnAuthorized access' });
//     }
//     const token = authHeader.split(' ')[1];
//     jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, decoded) {
//         if (err) {
//             err = {
//                 name: 'TokenExpiredError',
//                 message: 'jwt expired',
//                 expiredAt: 1408621000
//             }
//         }
//         req.decoded = decoded;
//         next();
//     });
// }

// async function run() {
//     try {

//         // await client.connect()
//         // const partCollection = client.db('ManufacturersOfCarPart').collection('parts')
//         // const userCollection = client.db('ManufacturersOfCarPart').collection('users')
//         // const orderCollection = client.db('ManufacturersOfCarPart').collection('orders')
//         // const paymentCollection = client.db('ManufacturersOfCarPart').collection('payments')
//         // const reviewCollection = client.db('ManufacturersOfCarPart').collection('reviews')

//         // //send order email
//         // const sendOrderEmail = orderInfo => {
//         //     const { partName, price, name, email: userEmail } = orderInfo

//         //     const mailOptions = {
//         //         from: 'testmailacc00@gmail.com',
//         //         to: userEmail,
//         //         subject: `Hello ${name}. your  ${partName} order reqest is Successfull`,
//         //         text: `
//         //         Your order is store in our database. please pay $${price} to confirm order.

//         //         Thank you ${name}.
//         //         `,

//         //     }

//         //     transporter.sendMail(mailOptions, (err, data) => {
//         //         if (err) {
//         //             console.log('error not sent', err);
//         //         } else {
//         //             console.log('send order email mail')
//         //         }
//         //     })

//         // }

//         // //send payment email
//         // const sendPaymentEmail = paymentInfo => {
//         //     const { partName, transactionId, name, email: userEmail } = paymentInfo
//         //     const mailOptions = {
//         //         from: 'testmailacc00@gmail.com',
//         //         to: userEmail,
//         //         subject: `Hello ${name}. your payment is successfull for  ${partName} order`,
//         //         text: `Your TransactionId: ${transactionId}

//         //         Thank you ${name}.
//         //         `,

//         //     }

//         //     transporter.sendMail(mailOptions, (err, data) => {
//         //         if (err) {
//         //             console.log('error not sent', err);
//         //         } else {
//         //             console.log('send payment mail')
//         //         }
//         //     })

//         // }



//         // //user put api
//         // app.put('/user/:email', async (req, res) => {

//         //     const email = req.params.email;
//         //     const user = req.body;
//         //     const filter = { email: email };
//         //     const options = { upsert: true };
//         //     const updateDoc = {
//         //         $set: user
//         //     }
//         //     const result = await userCollection.updateOne(filter, updateDoc, options)
//         //     const token = jwt.sign({ email: email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '7d' })
//         //     res.send({ result, token })

//         // })

//         // //post api for save order
//         // app.post('/order', async (req, res) => {
//         //     const orderInfo = req.body;
//         //     const { partName, email, phone } = orderInfo;
//         //     const exists = await orderCollection.findOne({ partName, email, phone });
//         //     if (exists) {
//         //         return res.send({ success: false, order: exists })
//         //     }
//         //     sendOrderEmail(orderInfo)
//         //     const result = await orderCollection.insertOne(orderInfo);
//         //     return res.send({ success: true, result });
//         // })

//         // //get api for find all order
//         // app.get('/orders', verifyJwt, async (req, res) => {
//         //     const userEmail = req.query.email;

//         //     const decodedEmail = req.decoded.email;
//         //     if (userEmail === decodedEmail) {
//         //         const query = { email: userEmail };
//         //         const orders = await orderCollection.find(query).toArray();
//         //         return res.send(orders);
//         //     }
//         //     else {
//         //         return res.status(403).send({ message: 'forbidden access' });
//         //     }
//         // })

//         // app.post('/create-payment-intent', verifyJwt, async (req, res) => {
//         //     const order = req.body;

//         //     const price = order.price;
//         //     const amount = price * 100;
//         //     const paymentIntent = await stripe?.paymentIntents?.create({
//         //         amount: amount,
//         //         currency: 'usd',
//         //         payment_method_types: ['card']
//         //     });
//         //     res.send({ clientSecret: paymentIntent?.client_secret })
//         // });

//         // app.patch('/order/:id', verifyJwt, async (req, res) => {
//         //     const id = req.params.id;
//         //     const payment = req.body;
//         //     const filter = { _id: ObjectId(id) };
//         //     const updatedDoc = {
//         //         $set: {
//         //             paid: true,
//         //             transactionId: payment.transactionId
//         //         }
//         //     }
//         //     sendPaymentEmail(payment)
//         //     const result = await paymentCollection.insertOne(payment);
//         //     const updatedBooking = await orderCollection.updateOne(filter, updatedDoc);
//         //     res.send(updatedBooking);
//         // })




//         // //get api for single order of part
//         // app.get('/order/:orderId', verifyJwt, async (req, res) => {
//         //     const orderId = req.params.orderId;
//         //     const query = { _id: ObjectId(orderId) };
//         //     const order = await orderCollection.findOne(query);
//         //     res.send(order);
//         // })

//         // //api for delete order
//         // app.delete('/order/:id', async (req, res) => {
//         //     const orderId = req.params.id;
//         //     const result = await orderCollection.deleteOne({ _id: ObjectId(orderId) })
//         //     res.send(result)

//         // })


//         // //create post api for save review
//         // app.post('/review', verifyJwt, async (req, res) => {
//         //     const reviewContent = req.body;
//         //     const result = await reviewCollection.insertOne(reviewContent);
//         //     res.send(result)
//         // })

//         // //create get api for all review
//         // app.get('/reviews', verifyJwt, async (req, res) => {
//         //     const result = await reviewCollection.find().toArray();
//         //     res.send(result)
//         // })

//         // //put api for save userProfileInfo
//         // app.put('/update-user-info/:userEmail', async (req, res) => {

//         //     const email = req.params.userEmail;
//         //     const userInfo = req.body;
//         //     const filter = { email: email };
//         //     const options = { upsert: true };
//         //     const updateDoc = {
//         //         $set: userInfo
//         //     }
//         //     const result = await userCollection.updateOne(filter, updateDoc, options)
//         //     res.send(result)

//         // })

//         // const verifyAdmin = async (req, res, next) => {
//         //     const email = req.decoded.email;
//         //     const requester = await userCollection.findOne({ email: email })
//         //     if (requester.admin) {
//         //         next()
//         //     }
//         //     else {
//         //         res.status(403).send({ message: 'forbidden' })
//         //     }
//         // }
//         // app.get('/admin/:email', async (req, res) => {
//         //     const email = req.params.email;
//         //     const userObject = await userCollection.findOne({ email: email });
//         //     if (userObject.admin) {
//         //         res.send({ admin: true })
//         //     }
//         //     else {
//         //         res.send({ admin: false })
//         //     }

//         // })

//         // //get all users
//         // app.get('/users', verifyJwt, async (req, res) => {
//         //     const result = await userCollection.find().toArray();
//         //     res.send(result)
//         // })

//         // //put api for update Admin status
//         // app.put('/user/admin/:email', verifyJwt, verifyAdmin, async (req, res) => {
//         //     const email = req.params.email;
//         //     const filter = { email: email };
//         //     const updateDoc = {
//         //         $set: { admin: true }
//         //     }

//         //     const result = await userCollection.updateOne(filter, updateDoc)
//         //     res.send(result)


//         // })

//         // //post api for add product
//         // app.post('/add-product', verifyJwt, verifyAdmin, async (req, res) => {
//         //     const product = req.body;
//         //     const result = await partCollection.insertOne(product);
//         //     res.send(result);
//         // });
//         // //delete api for delete product
//         // app.delete('/product/:id', verifyJwt, verifyAdmin, async (req, res) => {
//         //     const id = req.params.id;
//         //     const filter = { _id: ObjectId(id) }
//         //     const result = await partCollection.deleteOne(filter);
//         //     res.send(result)
//         // });

//         // //get api for all orders
//         // app.get('/all-orders', verifyJwt, verifyAdmin, async (req, res) => {
//         //     const result = await orderCollection.find().toArray();
//         //     res.send(result)
//         // })

//         // //put api for change pending status
//         // app.put('/pending-status-change/:id', verifyJwt, verifyAdmin, async (req, res) => {
//         //     const id = req.params.id;
//         //     const filter = { _id: ObjectId(id) };
//         //     const options = { upsert: true };
//         //     const updatedDoc = {
//         //         $set: {
//         //             orderComplete: true
//         //         }
//         //     };
//         //     const result = await orderCollection.updateOne(filter, updatedDoc, options);
//         //     res.send(result)


//         // })


//     }
//     finally {

//     }

// }
// run().catch(console.dir)
app.get('/', (req, res) => {
    res.send('manufacturers server ready'.yellow)
})

//client reqest error handle
app.use((req,res,next)=>{
next(new Error('route not found!!!'))
})

//all server error handle
app.use((err,req,res,next)=>{
    return errorResponse(res,{statusCode:err.status,message:err.message})
})


module.exports = app