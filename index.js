const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());



const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.M_D_USER}:${process.env.M_D_PASS}@cluster0.hloku.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {

        await client.connect()
        const partCollection = client.db('ManufacturersOfCarPart').collection('parts')


        app.get('/parts', async (req, res) => {
            const parts = await partCollection.find().toArray();
            res.send(parts)
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