const Data = require('../models/data')
module.exports = app => {
    const controller = {};
    controller.get = (req, res) => {
        Data.GET(req, res)
    }
    controller.post = (req, res) => {
        Data.POST(req, res)
    }
    return controller;

}