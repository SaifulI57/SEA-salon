import { Hono, Context } from 'hono';
import { encryptData, decryptData } from '../utils/encrypt';

const route = new Hono();

route.post('/enc', async (c: Context) => {
    try {
        const body = await c.req.json();
        if (!body || !body.plaintext) {
            return c.json({ error: 'Invalid request body' }, 400);
        }

        const plaintext = body.plaintext;
        const enc = encryptData(plaintext);

        return c.json({ encrypted: enc, decrypted: decryptData(enc) });
    } catch (error) {
        console.error('Encryption route failed:', error);
        return c.json({ error: 'Encryption failed' }, 500);
    }
});

route.post('/dec', async (c: Context) => {
    try {
        const body = await c.req.json();
        if (!body || !body.encryptData) {
            return c.json({ error: 'Invalid request body' }, 400);
        }

        const encryptedData = body.encrypted;
        const decr = decryptData(encryptedData);

        return c.json({ decrypted: decr });
    } catch (error) {
        console.error('Decryption route failed:', error);
        return c.json({ error: 'Decryption failed' }, 500);
    }
});

export default route;
