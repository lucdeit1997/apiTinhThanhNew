const express = require('express');
const app     = express();
const request = require('request');

app.set('views', './views');
app.set('view engine', 'ejs');
app.use(express.static('./public'));

app.get('/', (req, res) => {
    request('https://thongtindoanhnghiep.co/api/city', function(error, response, body){
        const data = JSON.parse(body);
        res.render('index', { data: data.LtsItem} )
    });
})

app.get('/lay-thong-tin-tinh', (req, res) => {
    request('https://thongtindoanhnghiep.co/api/city', function(error, response, body){
        const data = JSON.parse(body);
        res.json({
            error: false,
            data : data.LtsItem
        })
    });
})

app.get('/lay-huyen-cua-tinh/:id_tinh',(req, res) => {
    
    const { id_tinh } = req.params;
    request(`https://thongtindoanhnghiep.co/api/city/${id_tinh}/district`, function(error, response, body){

        const data = JSON.parse(body);
        res.json({
            error: false,
            data : data
        })
    })
})
app.get('/lay-xa-cua-tinh-huyen/:id_huyen', (req, res) => {
    const{ id_huyen } = req.params;
    request(`https://thongtindoanhnghiep.co/api/district/${id_huyen}/ward`, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            const data = JSON.parse(body)
            res.json({
                error: false,
                data : data
            });
        }
    })
})
app.listen('8000', (req, res)=>{
    console.log("server start port 8000");
})