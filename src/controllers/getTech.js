const dbConnection = require('../../db/db_connection')

const getTech = (techName, cb) => {
    dbConnection.query(`SELECT * FROM tech WHERE name = techName VALUES $1`,
    [techName], 
    (err, res) => {
        if (err){
            cb(err);
        } else {
            cb(null, res.rows);
        }
    })
}


module.exports = getTech;
