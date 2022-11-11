const express = require('express');
const { engine } = require('express-handlebars');
const { join } = require('path');

// Initializations
const app = express();

// Settings
app.set("views", join(__dirname, "views"));
app.engine('.hbs', engine({
    defaultLayout: 'main',
    layoutsDir: join(app.get('views'), 'layouts'),
    partialsDir: join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Routes
app.use(require('./routes/index'));

// Static Files
app.use(express.static(join(__dirname, 'public')));

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
