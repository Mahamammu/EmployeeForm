const express = require("express");
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host:"bv8c2y2ms3a0q7mhminm-mysql.services.clever-cloud.com",
     user:"utgf8lwi9ujevpk5",
    password:"vYBtGMNMPN4IThOXzpHy",
    database:"bv8c2y2ms3a0q7mhminm"
});
//connect to Mysql
app.get('/',(req,res)=>{
    const sql="SELECT Ename, Eid, Edept, DATE_FORMAT(Edob, '%d-%m-%Y') as Edob, Egender, Edesign, Esalary FROM Employee";
    db.query(sql,(err,data)=>{
        if(err) return res.status(500).json(err);
        
        return res.status(200).json(data);
    })
})  
app.post('/', (req, res) => {
    console.log("postdata");    
    const sql = "INSERT INTO Employee (Ename, Eid, Edept, Edob, Egender, Edesign, Esalary) VALUES (?, ?, ?, ?, ?, ?, ?)";
    const values = [
        
        req.body.Ename,
        req.body.Eid,
        req.body.Edept,
        req.body.Edob,
        req.body.Egender,
        req.body.Edesign,
        req.body.Esalary,
    ];
    console.log("completed");

    db.query(sql, values, (err, data) => {
        if (err) {
            console.log(err);
        }
        console.log("created");
    });
});
  
app.delete('/:Eid', (req, res, next) => {
    const sql = "DELETE FROM Employee WHERE Eid= ?";
    const Eid=req.params.Eid;

    db.query(sql, [Eid], (err, data) => {
        if (err) {
            console.log(err);
        }
        console.log("deleted");
    });
});


app.listen(8081,()=>{
    console.log("Server listening...");
})