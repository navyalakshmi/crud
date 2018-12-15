var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var mysql = require('mysql2');
// var connection=mysql.createConnection({
//     host:'localhost',
//     user:'root',
//     password:'Navya@123',
//     database:'employee'
// });


// connection.execute(`select * from emp `,function(err,results,fields){
//     console.log(results);
//     console.log(fields);
// });
// using pool
const conn = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'Navya@123',
        database: 'employee'

    }, (err, con) => {
        return con;
//         con.promise().query("select * from emp")
//             .then(([rows,fields]) => {
//                 console.log(rows);
//             })
//             .catch((err)=> console.log(err))
//             .then(() => con.end());
    });


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

app.post('/create', function (req, res) {
    const id= req.body.id;
    const name = req.body.name;
    const number = req.body.num;
    let createEmpSql = `INSERT INTO emp (eid,ename,enum) VALUES (${id},"${name}",${number})`;
    conn.promise().query(createEmpSql, function (err, result) {
        console.log(`Id: ${id},Name: ${name},Number: ${number},SQL: ${createEmpSql},`);
        if (err) throw err;
        console.log(result.affectedRows);
        res.send(200).send(result.affectedRows)
        // res.json({message: 'Record Inserted Successfully.'});
      });
});

app.get('/get', function (req, res) {
    conn.query("SELECT * FROM emp", function (err, result, fields) {
        if (err) throw err;
        res.json(result);
      });
    // res.json({ message: 'welcome to api' });
});

app.delete('/delete', function (req, res) {
    const id=req.body.id;
    conn.query(`delete from emp where eid=${id}`,function(err,result,fields){
        if(err) throw err;
        res.json(result);
    });
});

app.put('/update', function (req, res) {
    const id= req.body.id;
    const name = req.body.name;
    let updateEmp=`update emp set ename="${name}" where eid=${id}`;
    conn.query(updateEmp,function(err,result,fields){
       
console.log(`${updateEmp}`) ;
       if(err) throw err;
        res.json(result);
    });
     
});

app.listen(port, () => {
    console.log(`REST API Server Is Running at: http://localhost:${port} `);
});

