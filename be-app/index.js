const express = require( 'express');
const connectToDatabase = require ('./db');
const schools = require('./routes/about/schools.route');
const schoolAbout = require('./routes/about/school-about.route');
const schoolCourses = require('./routes/courses/courses-route')

const app = express();
app.use(express.json());
connectToDatabase();

app.use('/api/schools', schools);
app.use('/api/schools', schoolAbout);
app.use('/api/schools', schoolCourses);

const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello World!');
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
