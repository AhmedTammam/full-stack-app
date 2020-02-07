const express = require('express');
const path = require('path');


const app = express();

//body parser
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

// users api router
app.use('/api/users', require('./routes/api/users'));


const PORT = process.env.PORT || 5000;


app.listen(PORT, () => console.log(`app is running on port: ${PORT}`));