/**
 * Node Basic Server
 * Updated by jefferson.wu on 2017.11.20
 */

 // ====================
 // MODULES ============
 // ====================

 const fs           = require('fs');
 const express      = require('express');
 const app          = express();
 const http         = require('http').Server(app);
 const https        = require('https');
 const chalk        = require('chalk');
 const clear        = require('clear');

 // --- custom modules ---
 const promise_db   = require('./modules/get_dummy_data_es6.js');

// -------------------------------------------
// HTTPS -------------------------------------
// -------------------------------------------
const hskey = fs.readFileSync(`${process.cwd()}/hacksparrow-key.pem`);
const hscert = fs.readFileSync(`${process.cwd()}/hacksparrow-cert.pem`);

const credentials = {key: hskey, cert: hscert};
const https_server  = https.createServer(credentials, app);

// -------------------------------------------
// CONFIG ------------------------------------
// -------------------------------------------
const port  = process.env.PORT || 3443;


// -------------------------------------------
// MIDDLEWARE --------------------------------
// -------------------------------------------

// --- header information ---
app.use((req, res, next) => {
    res.setHeader('X-Powered-By', 'Go Team Go!');
    next();
});

// --- basic logger ---
app.use((req, res, next) => {
    console.log(`${new Date()} ${req.method} ${req.ip} ${req.url}`);
    console.log(`Browser default language: ${chalk.green(req.headers['accept-language'])}`);
    next();
});

// --- enable body parser ---

// --- enabled cookie parser ---


// -------------------------------------------
// ROUTES ------------------------------------
// -------------------------------------------

var sample_data = {
    status: 'success',
    payload: {
        message: 'This is a payload message.',
        data: {
            yum1: 'Yummy byte of chocolate.',
            yum2: 'Yummy byte of apple pie.'
        }
    }
};

app.get('/', (req, res) => {
    console.log('root hit.');
    res.status(200);
    res.sendFile(process.cwd() + '/public/index.html');
});

// create API router
var api_router = express.Router();

// API router middleware
api_router.use((req, res, next) => {
    console.log(chalk.yellow('[[ API router hit. ]]'));
    next();
});

api_router.get('/', (req, res) => {
    res.status(200);
    res.json({data: ''});
});

// API router test route
api_router.get('/promise', (req, res) => {

    promise_db.time_promise_gen(100, 2000).then((val) => {
        res.status(200);
        console.log(val);
        sample_data.payload.data.yum3 = val;
        res.json(sample_data);

    }).catch((reason) =>{
        res.status(200);
        console.log(reason);
        res.json(reason);
    });

    // // promisified dummy
    // res.json(sample_data);
});

// register API route
app.use('/api', api_router);


// -------------------------------------------
// CATCH ALL MIDDLEWARE ----------------------
// -------------------------------------------
// status files
app.use(express.static('public/'));

// 404
app.use((req, res, next) => {
    res.status(404);
    res.send('404: Page not found!');
});

// 500
app.use((req, res, next) => {
    res.status(500);
    res.render('500: Server error!');
});

// --------------------------------------------
// START SERVER -------------------------------
// --------------------------------------------

if (port == '3443') {

    https_server.listen(port, (err) => {

        if (err) {
            console.log(Error(`Error: ${err}`));
        } else {
            clear();                        
            console.log(chalk.blue('[SECURE] Basic Server on port ' + port));
        }
        
    });

} else {

    http.listen(port, (err) => {

        if (err) {
            console.log(Error(`Error: ${err}`));
        } else {
            clear();                        
            console.log(chalk.yellow('[UNSECURE] Basic Server on port ' + port));
        }

    });
}