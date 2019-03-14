// dependencies
const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
const fs = require('fs');
const base64ToPdf = require('base64topdf');
const mysqlCon=require("./database");


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.post('/',(req,res)=> {
  console.log(req.body);
  console.log(req.body.authToken);
  console.log(req.body.matterContext.matterId);
  // check if received
  if(req.body == null){
    console.log(err);
    res.status(501).json({
      message: 'Internal server error',
    });
  }else{
    // res.send("send url back to leap/api/posts+matterId+authtoken");
    res.status(201).json({
      message: 'Leap data received',
    });
  }
})

app.get('/', (req, res) => res.send('Hello World!!!'))

app.post("/api/posts", (req, res, next) => {
  const post = req.body;
  mysqlCon.query("INSERT INTO Posts2 values(default,'"
        +post.clientName+"','"
        +post.discoveryType+"','"
        +post.dateServed+"',"
        +post.byCtorder+",'"
        +post.dueDate+"','"
        +post.directedToParty+"','"
        +post.directedTo+"','"
        +post.servedBy+"','"
        +post.due+"','"
        +post.toCltforCert+"','"
        +post.servedDate+"','"
        +post.discNotes+"',"
        +post.caseStatus+","
        +post.clientStatus+",'"
        +post.answered+"',"
        +post.srvdOnDef+","
        +post.srvdOnPlt+",'"
        +post.ltSent+"','"
        +post.certReceived+"'"
        +");")
    ,(err,rows, fields)=>{
      console.log(rows);
      if(err){
        console.log(err);
        return res.status(501).json({
          message: 'Internal server error',
        });
      }
      post.Id=rows.insertId;
        console.log(post);
        res.status(201).json({
          message: 'Leap data received',
          post:post
        });
    };
});

app.get("/api/posts", (req,res, next) => {

  mysqlCon.query("Select * from Posts2",(err,rows,fields)=>{
    if(err){
      console.log(err);
      return res.status(500).json({
        message: err.message
      });
    }
  return res.status(200).json({
      message: "Posts fetches successfully",
      posts:rows
    });
  });
});

app.delete("/api/posts/:id",(req,res,next)=>{
  mysqlCon.query("Delete from  Posts2 where Id="+req.params.id,(err,rows,fields)=>{
    if(err){
      res.status(500).json({
        message:err.message
      });
    }else{
      res.status(200).json({
        message:"Post Deleted"
      })
    }
  });
});
app.put("/api/posts/:id",async (req,res,next)=>{

  mysqlCon.query("Select * from  Posts2 where Id="+req.params.id,(err,rows,fields)=>{
    if(err){
      res.status(500).json({
        message:err.message
      })
    }else{
      mysqlCon.query("Update posts set "+
      "clientName='"+rows[0].clientName+
      "',discoveryType='"+rows[0].discoveryType+
      "',dateServed='"+rows[0].dateServed+
      "',byCtorder='"+rows[0].byCtorder+
      "',dueDate='"+rows[0].dueDate+
      "',directedToParty='"+rows[0].directedToParty+
      "',directedTo'"+rows[0].directedTo+
      "',servedBy="+rows[0].servedBy+
      ",due='"+rows[0].due+
      "',toCltforCert='"+rows[0].toCltforCert+
      "',servedDate='"+rows[0].servedDate+
      "',discNotes='"+rows[0].discNotes+
      "'"
      +" where Id="+req.params.id
      +");"
      ,(err,rows,fields)=>{
          if(err){
            res.status(500).json({
              message:err.message
            })
          }else{
            res.status(200).json({
              message:"Updated"
            })
          }
      });
    }
  });
});



// app.listen(3000, ()=>console.log("server running"));
module.exports = app;
