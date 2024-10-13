import mysql from 'mysql';

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'studentms'
})

con.connect(function(err){
    if(err){
        console.log('connection error')
        return;
    }else{
        console.log('server connected to mysql db')
    }
})

export default con;