const mysql = require('mysql');
let pool = undefined;
const query = function (sql, cb) {
    console.log('query = ' + sql);
    pool.getConnection(function (err, connection) {
        if (err) {
            console.log('connection my sql err = ' + err);
            cb(err);
            throw err;
        } else {
            connection.query(sql, function (err, result, fileds) {
                if (err) {
                    console.log('query err = ' + err);
                    cb(err);
                } else {
                    cb(null, result);
                }
                connection.release();
            })
        }

    })
};
const insertSql = function (tabel, data) {
    let sql = 'insert into ' + tabel;
    let valuesStr = 'values(';
    let keyStr = ' (';
    for (let i in data) {
        keyStr += i + ',';
        if ((typeof data[i]).indexOf('string') === 0) {
            valuesStr += "'" + data[i] + "'" + ',';
        } else {
            valuesStr += data[i] + ',';
        }
    }
    keyStr = keyStr.substring(0, keyStr.length - 1);
    keyStr += ') ';
    valuesStr = valuesStr.substring(0, valuesStr.length - 1);
    valuesStr += ') ';
    sql += keyStr + valuesStr;
    return sql;
};
const updateSql = function (tabel, mainKey, mainValue, data) {
    let sql = 'update ' + tabel + ' set ';
    for (let i in data) {
        if ((typeof data[i]).indexOf('string') === 0) {
            sql += i + '=' + "'" + data[i] + "'" + ',';
        } else {
            sql += i + '=' + data[i] + ',';
        }
    }
    sql = sql.substring(0, sql.length - 1);
    if ((typeof mainValue).indexOf('string') === 0) {
        sql += ' where ' + mainKey + '= ' + "'" + mainValue + "'";
    } else {
        sql += ' where ' + mainKey + '=' + mainValue + ',';
    }
    return sql;
};
exports.checkPlayer=function (uniqueID, cb) {
    let sql ='select * from t_playerinfo where unique_id = '+uniqueID+';';
    query(sql,function (err, data) {
        if(err){
            console.log('err = '+err);
        }else{
            console.log('check player  data = '+JSON.stringify(data));
        }
        cb(err,data);
    });
};
exports.insertPlayerInfo=function (data) {
    let sql =insertSql('t_playerinfo',data);
    query(sql,function (err, data) {
        if(err){
            console.log('err = '+err);
        }else{
            console.log('insert data = '+data);
        }
    })
};
exports.updatePlayerInfo=function (mainKey, mainValues, data) {
    let sql =updateSql('t_playerinfo',mainKey,mainValues,data);
    query(sql,function (err, data) {
        if(err){
            console.log('err = '+data);
        }else{
            console.log('update data = '+data);
        }
    })
};
exports.connect=function (config) {
    pool=mysql.createPool(config);
};
