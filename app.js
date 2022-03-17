const express = require('express')
const cors = require('cors')

const app = express();
const port = process.env.PORT || '8000'

const { isValid, getBirthLocation, getSerialNoAndGender, getBirthDate } = require('./middlewares')

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.get("/api/:id", isValid, getBirthDate, getBirthLocation, getSerialNoAndGender);

app.listen(port, () => console.log(`app running on port ${port}`));
