import { Hono, Context } from 'hono';
import { encryptData, decryptData } from '../utils/encrypt';
import { authMiddleware } from './../middleware/authMiddleware';

const route = new Hono();

route.post('/enc', async (c: Context) => {
    try {
        const body = await c.req.json();
        if (!body || !body.plaintext) {
            return c.json({ error: 'Invalid request body' }, 400);
        }

        const plaintext = body.plaintext;
        const enc = encryptData(plaintext);

        return c.json({ encrypted: enc });
    } catch (error) {
        console.error('Encryption route failed:\n', error);
        return c.json({ error: 'Encryption failed' }, 500);
    }
});

route.post('/dec', authMiddleware, async (c: Context) => {
    try {
        const body = await c.req.json();
        if (!body || !body.encryptData) {
            return c.json({ error: 'Invalid request body' }, 400);
        }

        const encryptedData = body.encryptData;
        const decr = decryptData(encryptedData);
        if (decr === '') {
            throw new Error('Decryption failed, please prove your encryption data');
        }
        return c.json({ decrypted: decr });
    } catch (error) {
        if (error instanceof TypeError) {
            return c.json({ error: 'Please provide encrypted data' }, 400);
        }
        console.error('Decryption route failed:\n', error);
        return c.json({ error: 'Decryption failed' }, 500);
    }
});

export default route;
