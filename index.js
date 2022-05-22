const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());



const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.M_D_USER}:${process.env.M_D_PASS}@cluster0.hloku.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {

        await client.connect()
        const partCollection = client.db('ManufacturersOfCarPart').collection('parts')


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