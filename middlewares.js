const fs = require('fs');
const moment = require('moment')

function sendError(req, res, message) {
    return res.status(400).json({
        "status": false,
        "message": `${message}. Please recheck entered ID.`,
    })
}


exports.isValid = (req, res, next) => {
    var id = req.params.id.trim();

    // checking if ID entered is 12 chars
    if (id.length != 14) {
        return sendError(req, res, "Invalid length");
    }

    // checking if all chars are digits (1 -> 9)
    let isNumDigits = /^\d+$/.test(id);

    if (!isNumDigits) {
        return sendError(req, res, "Invalid fromat");
    }

    // initialize reponse object
    req.data = {
        "status": true,
        "id": id
    };

    next();
}

exports.getBirthDate = (req, res, next) => {
    var id = req.data.id;

    // 1st digit is a code representing century
    var centuryDigit = parseInt(id.substring(0, 1));

    // extract 2nd and 3rd digit representing birth year
    var year = parseInt(id.substring(1, 3));

    // extract next 2 digits -> birth month
    var month = id.substring(3, 5);

    // extract next 2 digits -> birth day
    var day = id.substring(5, 7);


    // century code | century
    //            1 | 1800
    //            2 | 1900
    //            3 | 2000

    // get century from code
    var century = 1700 + (centuryDigit * 100);


    // get actual birth year by adding century to year
    var birthYear = century + year;

    // get formatted birth date
    var date = `${day}/${month}/${birthYear}`

    // checking if date is valid
    // ex: 31/2/2020 should't get accepted
    var isValid = moment(date, "DD/MM/YYYY", true).isValid();

    if (!isValid)
        return sendError(req, res, 'Invalid date format')

    req.data.birth_date = date;
    next();
}


exports.getBirthLocation = (req, res, next) => {
    var id = req.data.id;

    // code representing birth location in the id
    var code = parseInt(id.substring(7, 9));

    // read the json and parse it
    let rawdata = fs.readFileSync('./data.json');
    let locations = JSON.parse(rawdata);

    // get the location corresponding to the code
    var birthLocation = locations[code];

    // if the code is invalid -> no entry in json
    // -> send error
    if (!birthLocation) {
        return sendError(req, res, 'Invalid location code');
    }

    req.data.birth_location = locations[code]

    next();
}

exports.getSerialNoAndGender = (req, res, next) => {
    var id = req.data.id;

    // serial is last 5 digits
    var serialNo = id.substring(9);

    // gender code is 2nd digit from the right
    var genderCode = parseInt(serialNo.substring(3, 4))

    // if gender code is:
    // odd -> male
    // even -> female

    req.data.gender = genderCode % 2 == 0 ? 'Female' : 'Male';
    req.data.serial_no = serialNo

    return res.status(200).send(req.data);
}





