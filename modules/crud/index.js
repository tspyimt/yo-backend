/**
 * Created by tungtouch on 2/4/15.
 */
var adapter = require('../adapter');
var conn = adapter.conn;


module.export = function(table){
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

      create : function (req, res) {
          var data = req.body;
          console.log("Created: ", JSON.stringify(req.body));

          r.table(table).insert(data).
              run(conn, function (err, result) {
                  if (err) throw err;
                  res.send(JSON.stringify({status: 'OK', location: '/'+table+result.generated_keys[0]}));
              })
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
