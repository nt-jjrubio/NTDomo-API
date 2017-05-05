/**
 * Created by juanjoserubio on 03/05/2017.
 */

'use strict';

const mongoose = require('mongoose');
const server  = require('./app/server.js');

const port = process.env.PORT || 3001;

const dbhost = 'localhost';
const dbport = 27017;


console.log(`mongodb://${dbhost}:${dbport}/ntdomo`);

server.listen(port, function() {
    console.log('[OK] - NTDomo API - Listening at port '+port);
});

// mongoose.connect(`mongodb://${dbhost}:${dbport}/ntdomo`, function (err, res) {
//     if(err) {
//         return console.error('[ERROR] Error establishing a database connection: '+err);
//     }
//     console.log('[OK] - database connection');
//
//     server.listen(port, function() {
//         console.log('[OK] - NTDomo API - Listening at port '+port);
//     });
// });
