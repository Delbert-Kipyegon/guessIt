const express = require('express');
const bodyParser = require('body-parser');
// const africasTalking = require('africastalking');
const cors = require('cors');

const credentials = {
    apiKey: 'b4bb5c2d5db04722558280f4e7698912943d1cc307669c3729a832b4f5b4ee1c',
    username: 'testprime',  
}
// Set up the Africa's Talking API0743380666
const connectAt = require('africastalking')(credentials);
// console.log(connectAt);
const airtime = connectAt.AIRTIME;

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Route to handle user attempts
app.post('/attempts', (req, res) => {
    // numAttempts++;
    const { attemptsCount, phoneNumber } = req.body; //frontend
    console.log(`Attempts count received: ${attemptsCount}` );
    console.log(phoneNumber);
    if (attemptsCount % 2 === 0) {
        // const phoneNumber = req.body.phoneNumber;
        const amount = 5; // award of 2 KES airtime
        const currencyCode = 'KES';
        const options = {
            maxNumRetry: 3, // Will retry the transaction every 60seconds for the next 3 hours.
            recipients: [{
                phoneNumber: phoneNumber,
                currencyCode: currencyCode,
                amount: amount
            }]
        };
    
        airtime.send(options)
            .then(response => {
                console.log(response);
                res.status(200).json({ message: 'Airtime awarded successfully.' });
            })
            .catch(error => {
                console.log(error);
                res.status(500).json({ message: 'Failed to award airtime.' });
            });
    } else {
        res.status(200).json({ message: 'Attempts recorded.' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});