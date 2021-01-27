module.exports = app => {
    const controller = app.controllers.data
    app.route('/api/v1/data')
        .get(controller.get)
        .post(controller.post)
    app.route('/api/v1/data?:startDate&:endDate')
        .get(controller.get)
}