
class Controller {

    static success(res, data, code=200) {
        res.statusCode = code;
        res.setHeader('Content-Type', 'application/json');

        res.json(data);
    }

    static error(res, msg, err, code=400) {
        res.statusCode = code;
        res.setHeader('Content-Type', 'application/json');

        res.json({
            message: msg,
            error: err.message
        });
    }
}

module.exports = Controller;