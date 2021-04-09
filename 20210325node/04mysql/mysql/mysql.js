const mysql = require('mysql')
// 链接配置
const cfg = {
    host: 'localhost',
    user: 'root',
    password: 'admin',
    database: 'test'
}
// 创建连接对象
const conn = mysql.createConnection(cfg)
// 连接
conn.connect(err => {
    if (err) {
        throw err
    } else {
        console.log('连接成功')
    }
})
// 创建表及查询
const CREATE_SQL = `CREATE TABLE IF NOT EXISTS test (
    id INT NOT NULL AUTO_INCREMENT,
    message VARCHAR(45) NULL,
    PRIMARY KEY (id))`;
const INSERT_SQL = `INSERT INTO test(message) VALUES(?)`;
const SELECT_SQL = `SELECT * FROM test`;
conn.query(CREATE_SQL, err => {
    if (err) {
        throw err
    }
    conn.query(INSERT_SQL, 'hello world', (err, result) => {
        if (err) {
            throw err
        }
        console.log(`insert result: ${result}`)
        conn.query(SELECT_SQL, (err, results) => {
            console.log(`select result: ${results}`)
            conn.end()
        })
    })
})