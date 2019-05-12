
export default async function roomCreate(ws, req: any) {
  ws.on('message', function(msg) {
    console.log(msg)
    console.log(req);
  });
}