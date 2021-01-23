const express = require('express');
const mongoose = require('mongoose')
const log = require('./models/log');
const port = 3535;
const app = express();

//Db Connection
//db testing
mongoose.connect('mongodb://localhost:27017/expense', {useNewUrlParser: true,useUnifiedTopology: true});
try{
  console.log("Db Connected!")
  console.log("Db port up")
}
catch(err){
  console.log(err)
}


app.get('/',async (req,res)=>{


    let seven = await log.find({allocation:'7'}).lean()
    let five = await log.find({allocation:'5'}).lean()
    let three = await log.find({allocation:'3'}).lean()
    let ten = await log.find({allocation:'10'}).lean()

    let master = [seven,five,three,ten];
    let amounts=[];

    master.forEach(key=>{
        key.forEach(element=>{
            let query_amount = element.amount;
            amounts.push(query_amount)
            return amounts
        })
    })
    
    let filter = []

    amounts.forEach(element=>{
        if(element>2000){
            filter.push(element)
            return filter
        }
    })



    res.send(master)

})

app.listen(port,()=>{
    console.log('Server Connected on port 3535')
})