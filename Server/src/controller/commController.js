const Controller = require("./controller");

let sockets = {};
let boards = {};

const initial_board = [
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
        boards[chave] = JSON.parse(JSON.stringify(initial_board));

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

            if (body.type === 'move') {
                console.log("- Socket: Game");

                const move = JSON.parse(body.move);
                let game_over = false;

                if (boards[chave][move.tile_id].value === null) {
                    boards[chave][move.tile_id].value = 'X';
                    console.log("  - User move");

                    game_over = game_logic(boards[chave], 'X');
                    if (game_over) {
                        ws.send(JSON.stringify(boards[chave]));
                        let data = {
                            type: 'game',
                            message: 'User Won!'
                        };
                        ws.send(JSON.stringify(data));

                        delete boards[chave];
                        boards[chave] = JSON.parse(JSON.stringify(initial_board));

                        console.log("Game over");
                        return;
                    }

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

                    if (!playable) {
                        ws.send(JSON.stringify(boards[chave]));
                        let data = {
                            type: 'game',
                            message: 'Tie!'
                        };
                        ws.send(JSON.stringify(data));
                        delete boards[chave];
                        boards[chave] = JSON.parse(JSON.stringify(initial_board));

                        console.log("Game over");
                        return;
                    }   
                }

                ws.send(JSON.stringify(boards[chave]));
                game_over = game_logic(boards[chave], 'O');
                if (game_over) {
                    let data = {
                        type: 'game',
                        message: 'Server Won!'
                    };
                    ws.send(JSON.stringify(data));
                    delete boards[chave];
                    boards[chave] = JSON.parse(JSON.stringify(initial_board));

                    console.log("Game over");
                }
            }
        });

        ws.on('close', (msg) => {
            console.log("- Socket: Client Close");

            delete sockets[chave];
            delete boards[chave];
        });
    }

}

function game_logic(board, player) {
    const winning_moves = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

    for (let positions of winning_moves) {
        if (board[positions[0]].value === player && board[positions[0]].value === board[positions[1]].value && board[positions[1]].value === board[positions[2]].value) {
            return true;
        }
    }
    
    return false;
}

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
}

module.exports = CommController;
