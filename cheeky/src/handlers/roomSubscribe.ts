
export default async function roomCreate(ws, req: any) {
  ws.on('connect', () => {
    console.log('connected')
    ws.send('Hiya!')
  })
  ws.on('message', function(msg) {
    console.log(msg)
    console.log(req);
  });
}