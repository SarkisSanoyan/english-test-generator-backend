import test from 'node:test';
import assert from 'node:assert/strict';
import express from 'express';
import { once } from 'node:events';

import resultsRouter from '../routes/results.routes.js';

test('POST /results returns 400 for missing required fields', async () => {
  const app = express();
  app.use(express.json());
  app.use('/results', resultsRouter);

  const server = app.listen(0);
  await once(server, 'listening');

  try {
    const address = server.address();
    const baseUrl = `http://127.0.0.1:${address.port}`;

    const response = await fetch(`${baseUrl}/results`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    });

    assert.equal(response.status, 400);
    const body = await response.json();
    assert.equal(body.message, 'Missing required fields');
  } finally {
    server.close();
  }
});
