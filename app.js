const dotenv = require('dotenv');
dotenv.config()
const express = require('express');
const readdirSync = require('fs').readdirSync;
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const ejs = require('ejs');
const path = require('path');
const flash = require('connect-flash');

const { log } = require('./config/config')

const app = express();
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
}));

//flash
app.use(flash());
// Global Flash Messages
app.use(function(req, res, next) {
    res.locals.message = req.flash();
    next();
});

//middlewares
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

// app.use(formidableMiddleware({
//     encoding: 'utf-8',
//     // uploadDir: '/uploads',
//     // multiples: true, // req.files to be arrays of files
//   }))

//   app.use(
//     fileUpload({
//         limits: {
//             fileSize: 1 * 1024 * 1000, // (1mb validation) I am revalidating here with the express-fileUpload.. I had already done that in my form.js file
//         },
//         abortOnLimit: true,
//         responseOnLimit: '⚠️ Error! File size is bigger than 1mb',
//         createParentPath: true,
//         safeFileNames: true,
//         preserveExtension: true,
//         debug: true,
//         useTempFiles : true,
//         tempFileDir : '/tmp/'
//     })
//   );

//template engine
app.engine('ejs', ejs.renderFile);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//routes using readdir to read all the files in the routes folder and import them
readdirSync('./routes').map((r) => app.use('/', require('./routes/' + r)));

// handle 404 errors
app.get('*', (req, res) => {
    res.send("Error Page! Try again later!");
});


const port = process.env.PORT || 5000;
const host = process.env.HOST || '127.0.0.1';
const env = process.env.NODE_ENV || 'development'

// start server
log.info(`🚀 Server is starting in ${env} mode...`)

app.listen(port, host, () => {
    log.info(`🚀 Server is up and running on http://${host}:${port}`);
});