import expressWs = require("express-ws");

export default async function roomCreate(ws, req: expressWs.WebsocketRequestHandler) {
  ws.on('message', function(msg) {
    console.log(msg)
    console.log(req);
  });
}