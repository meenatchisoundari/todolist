const userList = require('./users');

const appRouter = (app, fs) => {
    app.get('/', (req, res) => {
        res.send('welcome to the api_service');
    });
    userList(app, fs);
};
module.exports = appRouter;