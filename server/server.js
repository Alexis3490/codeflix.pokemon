const express = require('express')
const cors = require('cors')
const app = express()

//json
const data = require('./data/pokedex')

//Id ascending order
function IdAscendingOrder(prop) {
    return function(a, b) {
        if (a[prop] > b[prop]) {
            return 1;
        } else if (a[prop] < b[prop]) {
            return -1;
        }
        return 0;
    }
}

app.use(cors())

const data_format=data.sort(IdAscendingOrder("ndex"));

app.get('/pokemons', function (req, res, next) {

//json Order
    res.json(data_format)
});

app.get('/pokemons/:id', function(req, res) {
    const id= req.params.id;
    const data_filter= data_format.find(d=> d.ndex === id)
    res.json(data_filter);
});

app.listen(4242, function () {
    console.log('CORS-enabled web server listening on port 4242')
})