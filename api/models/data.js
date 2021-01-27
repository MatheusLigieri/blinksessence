const fs = require('fs');
const csv = require('csv-parser');
const moment = require('moment');
const json2csv = require('json2csv');
var newLine = '\r\n';


const results = [];
const filterResults = []
let startDate, endDate;

class Data {
    GET(req, res) {
        fs.createReadStream('database.csv')
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', () => {
                if (req.query.startDate == undefined || req.query.endDate == undefined) {
                    res.status(200).json(results);
                } else {
                    startDate = req.query.startDate.split('-');
                    endDate = req.query.endDate;
                    startDate = moment(startDate, 'DD-MM-YYYY');
                    endDate = moment(endDate, 'DD-MM-YYYY');
                    console.log(startDate);
                    console.log(endDate);
                    results.forEach((result, idx) => {
                        var x = result.date
                        x = result.date.split('/');
                        x = moment(x, 'DD-MM-YYYY');
                        if (x.diff(startDate, 'days') >= 0 && x.diff(endDate, 'days') <= 0) {
                            filterResults.push(result);
                        }
                        if (idx === results.length - 1) {
                            console.log("Last callback call at index " + idx + " with value " + result);
                            res.status(200).json(filterResults)
                        }
                    })
                }
            });

    }
    POST(req, res) {
        var data = [

        ];

        req.body.forEach(item => {
            var x = {
                date: item.date,
                media: item.media,
                client_id: item.client_id,
                client_name: item.client_name,
                campaign_id: item.campaign_id,
                campaign_name: item.campaign_name,
                clicks: item.clicks,
                impressions: item.impressions,
                investment: item.investment
            }
            data.push(x)
        });
        console.log(data)

        fs.stat('database.csv', function (err, stat) {
            if (err == null) {
                console.log('File exists');

                //write the actual data and end with newline
                var csv = json2csv.parse(data) + newLine;

                fs.appendFile('database.csv', csv, function (err) {
                    if (err) throw err;
                    console.log('The "data to append" was appended to file!');
                    res.status(200).json(data)
                });
            } else {
                //write the headers and newline
                console.log('New file, just writing headers');
                fields = fields + newLine;

                fs.writeFile('database_temp.csv', fields, function (err) {
                    if (err) throw err;
                    console.log('file saved');
                });
            }
        });
    }
}
module.exports = new Data;