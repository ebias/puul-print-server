const ThermalPrinter = require("node-thermal-printer").printer;
const PrinterTypes = require("node-thermal-printer").types;
const express = require('express');
require('dotenv-defaults').config()

const port = process.env.PORT;

let driver;

if (process.env.USEDRIVER) {
    driver = require("printer");
} else {
    driver = null;
}

const app = express();
app.use(express.json());

const interface = process.env.INTERFACE;

let printer = new ThermalPrinter({
    type: process.env.TYPE,
    //interface: '/dev/usb/lp0',
    interface: interface,
    driver: driver,
    characterSet: process.env.CHARSET
});

app.listen(port, function () {
    console.log("Http server listening on port " + port)
});

app.post('/print', function (req, res) {
    let doc = req.body.doc;
    printDocument(doc)
        .then(val => {
            printer.clear();
            res.json({success:true});
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({error: err});
        });
});


async function printDocument(doc) {
    for (const item of Object.keys(doc)) {
        if (typeof printer[item] === "function") {
            printer[item](...doc[item]);
        } else {
            console.log(item + ' is not a valid command.')
        }
    }
    try {
        let execute = printer.execute();
        return true;

    } catch (error) {
        throw new Error("Printing failed.");
    }
}



