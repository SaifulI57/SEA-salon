import { Context } from 'hono';
import UserM from '../Models/UserModel';
import User from '../Schema/UserSchema';
import { encryptData, comparePassword } from '../utils/encrypt';
import { generateToken } from '../utils/jwt';

const containsHTMLTags = (input: string): boolean => /<[^>]*>/g.test(input);

function validateEmail(email: string): boolean {
    const regex = /^\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/;
    return regex.test(email);
}

export const register = async (c: Context) => {
    try {
        const { username, password, email } = await c.req.json();
        let path = c.req.url.split('/');

        if (!username || !password || !email) {
            return c.json({ error: 'Please provide required fields' }, 400);
        }

        const role = path.filter((e) => e === '181b4bbe') ? 'ADMIN' : 'CUSTOMER';

        if (!validateEmail(email)) {
            return c.json({ error: 'Invalid input: email is not valid' }, 400);
        }

        if (containsHTMLTags(username) || containsHTMLTags(password) || containsHTMLTags(email)) {
            return c.json({ error: 'Invalid input: HTML tags are not allowed' }, 400);
        }

        const encryptedPassword = encryptData(password);

        const user: User = {
            username: username.toString(),
            password: encryptedPassword,
            email: email,
            role: role
        };

        if (await UserM.existingUser(username, email, role)) {
            return c.json({ error: 'Email / Username already taken' }, 400);
        }

        const userCreated = await UserM.createUser(user);
        if (!userCreated) {
            console.error('Error Creating users');
            return c.json({ error: 'Error while creating users, Server side problem' }, 500);
        }

        return c.json({ message: 'User registered successfully', credential: { username: username, email: email, role: role } });
    } catch (error) {
        console.error('Error processing request', error);
        if (error instanceof SyntaxError) {
            return c.json({ error: 'Error Parsing Json, Please Provide require field (username, password, email)' });
        } else {
            return c.json({ error: 'Server error' }, 500);
        }
    }
};

export const login = async (c: Context) => {
    try {
        let { username, password } = await c.req.json();

        password = encryptData(password);

        if (!username || !password) {
            return c.json({ error: 'Please provide username and password' }, 400);
        }
        let path = c.req.url.split('/');

        const role = path.filter((e) => e === '181b4bbe') ? 'ADMIN' : 'CUSTOMER';

        const user: any = await UserM.getUsername(username, role);
        if (!user) {
            return c.json({ error: 'Invalid username or password' }, 401);
        }
        console.log(user, password);
        const passwordMatch = await comparePassword(password, user.password);
        if (!passwordMatch) {
            return c.json({ error: 'Invalid username or password' }, 401);
        }

        const token = generateToken({ id: user.id, username: user.username, role: user.role });

        return c.json({ message: 'Login successful', token: token });
    } catch (error) {
        console.error('Error processing login request', error);
        if (error instanceof SyntaxError) {
            return c.json({ error: 'Error Parsing Json, Please Provide require field (username, password)' });
        } else {
            return c.json({ error: 'Server error' }, 500);
        }
    }
};
