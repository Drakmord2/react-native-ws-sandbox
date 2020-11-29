const Controller = require("./controller");
let sockets = {};
let boards = {};

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
}

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
        boards[chave] = [
            {
                tile_id: 0,
                value: null,
            },
            {
                tile_id: 1,
                value: null,
            },
            {
                tile_id: 2,
                value: null,
            },
            {
                tile_id: 3,
                value: null,
            },
            {
                tile_id: 4,
                value: null,
            },
            {
                tile_id: 5,
                value: null,
            },
            {
                tile_id: 6,
                value: null,
            },
            {
                tile_id: 7,
                value: null,
            },
            {
                tile_id: 8,
                value: null,
            },
        ];

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
                delete boards[chave];
            }

            if (body.type === 'message') {
                console.log("- Socket: Client Message");
                console.log("  - "+body.message);
            }

            if (body.type === 'move') {
                console.log("- Socket: Move");
                console.log("  - "+body.move);

                const move = JSON.parse(body.move);

                if (boards[chave][move.tile_id].value === null) {
                    boards[chave][move.tile_id].value = 'X';
                    console.log("  - User move");

                    let playable = false;
                    for(let tile of boards[chave]) {
                        if (tile.value === null) {
                            playable = true;
                            break;
                        }
                    }

                    if (playable) {
                        while(true) {
                            let tile = randomIntFromInterval(0, 8);

                            if (boards[chave][tile].value === null) {
                                boards[chave][tile].value = 'O';
                                console.log("  - Server move");
                                break;
                            }
                        }
                    }
                }

                ws.send(JSON.stringify(boards[chave]));
            }
        });

        ws.on('close', (msg) => {
            console.log("- Socket: Client Close");

            delete sockets[chave];
            delete boards[chave];
        });
    }

}

module.exports = CommController;
