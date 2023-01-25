//Import express in index.js
const express = require('express')

//Import cors in index.js
const cors = require('cors')

const jwt = require('jsonwebtoken')

//Import dataservice
const dataService = require('./services/dataService')

//Create server app using express
const server = express()

//use cors to define origin
server.use(cors({
    origin:'http://localhost:4200'
}))

//to parse json data
server.use(express.json())


//set up port for server app
server.listen(3000, () => {
    console.log('server started at 3000');
})

//get http
server.get('/',(req,res)=>{
    res.send('GET METHOD')
})

//application specific middleware
const appMiddleware = (req,res,next)=>{
    console.log('Inside application specific middleware');
    next()
}

server.use(appMiddleware)

//token verify middleware
const jwtMiddleware =(req,res,next)=>{
    console.log('Inside router specific middleware');
    //get token from req headers
    const token = req.headers['access-token']
    
   try{
     //verify token
     const data = jwt.verify(token,'supersecretkey123')
     req.fromAcno = data.currentAcno
     console.log('valid Token');
     next()
   }
   catch{
    console.log('Invalid Token');
    res.status(401).json({
        message:'Please Login!!'
    })
   }
    
}


//register api call resolving
server.post('/register',(req,res)=>{
    console.log('Inside register function');
    console.log(req.body);
    //asynchronus
    dataService.register(req.body.uname,req.body.acno,req.body.pswd)
    .then((result)=>{
        res.status(result.statusCode).json(result)
    })
    
})
//login api call resolving
server.post('/login',(req,res)=>{
    console.log('Inside login Api');
    console.log(req.body);
    //asynchronus
    dataService.login(req.body.acno,req.body.pswd)
    .then((result)=>{
        res.status(result.statusCode).json(result)
    })
    
})
server.put('/',(req,res)=>{
    res.send('PUT METHOD')
})
server.delete('/',(req,res)=>{
    res.send('DELETE METHOD')
})
//getBalance api
server.get('/getBalance/:acno',jwtMiddleware,(req,res)=>{
    console.log('Inside getBalance Api');
    console.log(req.params.acno);
    //asynchronus
    dataService.getBalance(req.params.acno)
    .then((result)=>{
        res.status(result.statusCode).json(result)
    })
    
})

//deposit api
server.post('/deposit',jwtMiddleware,(req,res)=>{
    console.log('Inside deposit Api');
    console.log(req.body);
    //asynchronus
    dataService.deposit(req.body.acno,req.body.amount)
    .then((result)=>{
        res.status(result.statusCode).json(result)
    })
    
})

//fundTransfer api
server.post('/fundTransfer',jwtMiddleware,(req,res)=>{
    console.log('Inside fundTransfer Api');
    console.log(req.body);
    //asynchronus
    dataService.fundTransfer(req,req.body.toAcno,req.body.pswd,req.body.amount)
    .then((result)=>{
        res.status(result.statusCode).json(result)
    })
    
})
//getAllTransactions
server.get('/all-transactions',jwtMiddleware,(req,res)=>{
    console.log('Inside getAllTransaction api');
    dataService.getAllTransactions(req)
    .then((result)=>{
        res.status(result.statusCode).json(result)
    })
})

//delete account api 
server.delete('/delete-account/:acno',jwtMiddleware,(req,res)=>{
    console.log('Inside delete-account Api');
    console.log(req.params.acno);
    //asynchronus
    dataService.deleteMyAccount(req.params.acno)
    .then((result)=>{
        res.status(result.statusCode).json(result)
    })
    
})