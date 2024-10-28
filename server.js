//dependencies
const express=require('express')
const bodyParser=require('body-parser')
const cors=require('cors')
const mysql=require('mysql2')


//define the express operation
const app=express();
const port=3000;


//define the cors - cross origin by recieving the data in the json format


app.use(cors());
app.use(bodyParser.json())


//establish the connection with the db
const db=mysql.createConnection({
host:'localhost',
user:'user',
password:'root',
database:'ciscoproject'
});
//verify whether db is connected or not


db.connect(err=>{
    if(err){
        console.error('connection failed check the db details', err)
    }
    else{
        console.log('connection is done with the dB with port '+port)
    }
    
    
    });
    //optional statement
    app.listen(port,()=>{console.log('server port established on 3000')})
    

    //to get all the product info
    app.get('/getProducts',(req,res)=>{
        const sql='select *from product';
        db.query(sql,(err,result)=>{
            if(err){
                console.error('error in fectching the product',err)
                res.status(500).json({error:'An error occured'});
            }
            else{
                res.status(200).json(result);
            }
        });
    });

    //fetch via id
    app.get('/getProduct/:id',(req,res)=>{
        const id=req.params.id;
        const sql='select * from product where id=?';
        db.query(sql,[id],(err,result)=>{
            if(err){
                console.error('error in fectching the product',err)
                res.status(500).json({error:'An error occured'});
            }
            else{
                res.status(200).json(result);
            }
        });
    });

    //adding a product
    app.post('/addProduct',(req,res)=>{
        const { id, name, orderdate, ordertime } = req.body; // This line destructures ordertime
        const sql='insert into product values(?,?,?,?)';
        db.query(sql,[id,name,orderdate,ordertime],(err,result)=>{
            if(err){
                console.error('error in adding the product',err)
                res.status(500).json({error:'An error occured'});
            }
            else{
                res.status(200).json({message:'Product added successfully'})
            }
        });
    });

    //update a product
    app.put('/updateProduct',(req,res)=>{
        const {id,name,orderdate,ordertime}=req.body;
        const sql='update product set name=?,orderdate=?,ordertime=? where id=?';
        db.query(sql,[name,orderdate,ordertime,id],(err,result)=>{
            if(err){
                console.error('error in updating the product', err)
                res.status(500).json({error:'An error occured'});
            }  
            else{
                res.status(200).json({message:'Product updated successfully'});
            }
           
        });
    
    });

    //deletion product
    app.delete('/deleteProduct/:id',(req,res)=>{
        const id=req.params.id;
        const sql='delete from product where id=?';
        db.query(sql,[id],(err,result)=>{
            if(err){
                console.error('error in deleting the product', err)
                res.status(500).json({error:'An error occured'});
            }  
            else{
                res.status(200).json({message:'Product deleted successfully'});
            }
            
        });

        });

