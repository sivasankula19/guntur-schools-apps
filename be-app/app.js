const express = require('express');

const app = express();

app.get('/', (req, res)=>{

    res.status(200).json({msg:'hello from be', appName:'Guntur Developers!'})
})

const port = 4201;

app.listen(port , ()=> {
    console.log('app is running on ', port)
})
