const express = require('express');
const cors = require('cors');
var jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());



const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.M_D_USER}:${process.env.M_D_PASS}@cluster0.hloku.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


function verifyJwt(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).send({ message: 'UnAuthorized access' });
    }
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, decoded) {
        if (err) {
            err = {
                name: 'TokenExpiredError',
                message: 'jwt expired',
                expiredAt: 1408621000
            }
        }
        req.decoded = decoded;
        next();
    });
}

async function run() {
    try {

        await client.connect()
        const partCollection = client.db('ManufacturersOfCarPart').collection('parts')
        const userCollection = client.db('ManufacturersOfCarPart').collection('users')
        const orderCollection = client.db('ManufacturersOfCarPart').collection('orders')


        // get all parts api
        app.get('/parts', async (req, res) => {
            const parts = await partCollection.find().toArray();
            res.send(parts)
        })

        //get one part api
        app.get('/part/:id', async (req, res) => {
            const id = req.params;
            const filter = { _id: ObjectId(id) }
            const part = await partCollection.findOne(filter);
            res.send(part)
        })

        //user put api
        app.put('/user/:email', async (req, res) => {

            const email = req.params.email;
            const user = req.body;
            const filter = { email: email };
            const options = { upsert: true };
            const updateDoc = {
                $set: user
            }
            const result = await userCollection.updateOne(filter, updateDoc, options)
            const token = jwt.sign({ email: email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '7d' })
            res.send({ result, token })

        })

        //post api for save order
        app.post('/order', async (req, res) => {
            const orderInfo = req.body;
            const { partName, email, phone } = orderInfo;
            const exists = await orderCollection.findOne({ partName, email, phone });
            if (exists) {
                return res.send({ success: false, order: exists })
            }
            const result = await orderCollection.insertOne(orderInfo);
            return res.send({ success: true, result });
        })

        //get api for find all order
        app.get('/orders', verifyJwt, async (req, res) => {
            const userEmail = req.query.email;

            const decodedEmail = req.decoded.email;
            console.log(decodedEmail, userEmail)
            if (userEmail === decodedEmail) {
                const query = { email: userEmail };
                const orders = await orderCollection.find(query).toArray();
                return res.send(orders);
            }
            else {
                return res.status(403).send({ message: 'forbidden access' });
            }
        })

    }
    finally {

    }

}
run().catch(console.dir)






app.get('/', (req, res) => {
    res.send('server ok')
})
app.listen(port, () => {
    console.log("server running at", port);
})