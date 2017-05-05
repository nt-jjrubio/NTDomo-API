/**
 * Created by juanjoserubio on 03/05/2017.
 */

'use strict';

// Mongoose
const mongoose = require('mongoose');

// This constant is to define environment - [dev]elop or [prod]uction
const env = 'dev';

// Config file
const config = require(`./config/${env}.config.js`);

// Express server script
const server  = require('./app/server.js');


server.listen(config.port, function() {
    console.log(`[OK] - NTDomo API - Listening at port ${config.port}`);
});

// mongoose.connect( , function (err, res) {
//     if(err) {
//         return console.error('[ERROR] Error establishing a database connection: '+err);
//     }
//     console.log('[OK] - database connection');
//
//     server.listen(port, function() {
//         console.log('[OK] - NTDomo API - Listening at port '+port);
//     });
// });
