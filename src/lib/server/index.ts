// @ts-expect-error dw about it
import { handler } from '../../../build/handler.js';
import express from 'express';
const app = express();

// place custom routes here

app.use(handler);

const port = 3000;
app.listen(port, () => {
	console.log(`listening on https://localhost:${port}`);
});
