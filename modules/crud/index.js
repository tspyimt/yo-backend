/**
 * Created by tungtouch on 2/4/15.
 */
var as = require('aerospike');
var conn = require('../adapter/connect');

var client = as.client(conn.asConfig);
var dbStatusCode = null;

conn.connect( client, function (res) {
    dbStatusCode = res;
});

module.export = function(){
  return {
      findAll : function (req, res) {
          r.table(table).run(conn, function (err, cursor) {
              if (err) throw err;
              cursor.toArray(function (err, result) {
                  if (err) throw err;
                  res.send(JSON.stringify(result, null, 2));
              })
          })
      },

      findById : function (req, res) {
          var id = req.params.id;
          r.table(table).get(id).
              run(conn, function (err, result) {
                  if (err) throw err;
                  res.send(JSON.stringify(result, null, 2));
              });
      },

      create : function (key, value, callback) {
          var key = as.key(conn.asDB.defaultNameSpace, conn.asDB.defaultSet, key);

      },

      update : function (req, res) {
          var data = req.body;
          var id = req.params.id;

          r.table(table).get(id).update(data).
              run(conn, function (err, result) {
                  if (err) throw err;
                  res.send(JSON.stringify({status: 'OK', data: result}))
              })
      },

      delete : function (req, res) {
          var id = req.params.id;
          r.table(table).get(id).delete().
              run(conn, function (err, result) {
                  if (err) throw err;
                  res.send(JSON.stringify( {status: "OK", id: id} ));
              })
      }
  }
};
