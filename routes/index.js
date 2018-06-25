var express = require('express');
var router = express.Router();
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' , thing: process.env.THING});
});

router.get('/fart', function(req, res, next) {
  res.render('index', { title: 'Fart' , thing: process.env.THING});
});

router.get('/db', async (req, res) => {
  try {
    const client = await pool.connect()
    const result = await client.query('SELECT * FROM test_table');
    let names = result.rows.map( row => row.name ).join(', ');
    res.render('index', {title: names});
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
});

module.exports = router;
