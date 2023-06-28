

const app = require('./app')

const port = process.env.PORT || 8080;



app.get('/', (req, res) => {
    res.send('manufacturers server ready')
})
app.listen(port,() => {
    console.log("manufacturer", port);
})
