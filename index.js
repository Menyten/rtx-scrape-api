const express = require('express');
const { scrape } = require('./scrape');

const app = express();
const PORT = process.env.PORT || 3001;

let clients = [];
let scrapedData = scrape();
let interval = null;

app.get('/product-status', async (req, res) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers':
      'Origin, X-Requested-With, Content-Type, Accept',
    'Content-Type': 'text/event-stream',
    Connection: 'keep-alive',
    'Cache-Control': 'no-cache',
  };
  res.writeHead(200, headers);

  const data = `data: ${JSON.stringify(await scrapedData)}\n\n`;
  res.write(data);

  const clientId = Date.now();
  const newClient = {
    id: clientId,
    res,
  };
  clients.push(newClient);

  req.on('close', () => {
    console.log(`${clientId} Connection closed`);
    clients = clients.filter((client) => client.id !== clientId);
    !clients.length && clearInterval(interval);
    !clients.length && (interval = null);
  });

  if (!interval) {
    interval = setInterval(async () => {
      scrapedData = await scrape();
      clients.forEach((client) => {
        client.res.write(`data: ${JSON.stringify(scrapedData)}\n\n`);
      });
    }, 60 * 10 * 1000);
  }
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
