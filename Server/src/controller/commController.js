const Controller = require("./controller");
let sockets = {};

class CommController extends Controller {

    static async notify(req, res) {
        try {
            let msg = 'Client not connected.';
            const id_comm = req.params.comm;
            const id_user = req.params.user
            const chave = id_comm + '-' + id_user;

            const ws = sockets[chave];

            if (ws) {
                console.log('- Socket: Notification');

                let payload = {
                    type: "notification",
                    id_comm: id_comm,
                    date: Date.now()
                };

                ws.send(JSON.stringify(payload));
                msg = "Notification sent.";
            }

            return super.success(res, {date: msg});
        } catch (e) {
            return super.error(res, 'Unable to send notification.', e);
        }
    }

    static async connect(ws, req) {
        console.log('- Socket: Client Open');
        const id_comm = req.params.comm;
        const id_user = req.params.user

        let chave = id_comm + '-' + id_user;

        sockets[chave] = ws;
        let payload = {
            type: "connection",
            message: "Connected to Node Server.",
            date: Date.now()
        };
        ws.send(JSON.stringify(payload));

        ws.on('message', (msg) => {
            const body = JSON.parse(msg);

            if (body.type === 'close') {
                console.log("- Socket: Client Close");

                let payload = {
                    type: "connection",
                    message: "Connection closed.",
                    date: Date.now()
                };
                ws.send(JSON.stringify(payload));

                delete sockets[chave];
            }

            if (body.type === 'message') {
                console.log("- Socket: Client Message");
                console.log("  - "+body.message);
            }
        });

        ws.on('close', (msg) => {
            console.log("- Socket: Client Close");

            delete sockets[chave];
        });
    }

}

module.exports = CommController;
