
require('dotenv').config();
const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const mongoose = require('mongoose');


const {PORT, MONGO_URI} = process.env;

mongoose
    .connect(MONGO_URI,{useNewUrlParser:true,useFindAndModify:false})
        .then(()=>{
            console.log('MongoDB Connected...');
        }).catch(e=>{
            console.error(e);
        });
        
const api =require('./api');

const app = new Koa();
const router = new Router();

// 라우터 설정 
router.use('/api',api.routes()); // api 라우트 적용

// 라우터 적용 전에 bodyParser 적용
app.use(bodyParser());

// app 인스턴스에 라우터 적용
app.use(router.routes()).use(router.allowedMethods());
const port = PORT||6000;
app.listen(port, ()=>{
    console.log('Listening to port %d',port);
});