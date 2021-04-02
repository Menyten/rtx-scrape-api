const express = require('express');
const { scrape } = require('./scrape');

const app = express();
const PORT = process.env.PORT || 3001;

let clients = [];

app.get('/product-status', async (req, res) => {
  const headers = {
    'Content-Type': 'text/event-stream',
    Connection: 'keep-alive',
    'Cache-Control': 'no-cache',
  };
  res.writeHead(200, headers);

  const scrapedData = await scrape();
  const data = `data: ${JSON.stringify(scrapedData)}\n\n`;
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
  });

  setInterval(async () => {
    const scrapedAgain = await scrape();
    clients.forEach((client) => {
      client.res.write(`data: ${JSON.stringify(scrapedAgain)}\n\n`);
    });
  }, 60 * 1000);
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
