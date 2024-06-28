// import User from '../Schema/UserSchema';
// import { hashPassword, encryptData, decryptData } from '../utils/encrypt';
// import { compare } from 'bcryptjs';
// import { db } from './ServiceSurreal';

// export const loginLogic = async (username: string, password: string, iv: string[], ua: string, ip: string): Promise<{ isUser: boolean; session: string }> => {
//     try {
//         const dec = decryptData(password, iv);

//         const user: any[] = await db.query('SELECT username FROM user where username == $username', {
//             username: username
//         });

//         if (!user) return { isUser: false, session: '' };

//         const isMatch = await compare(password, user[0].password);

//         return isMatch ? { isUser: true, session: '' } : { isUser: false, session: '' };
//     } catch (e) {
//         console.log('Error login', e);
//         return { isUser: false, session: '' };
//     }
// };

// export const logoutLogic = async (user: User): Promise<any> => {};

// export const signUps = async (user: User): Promise<any> => {};

// export const resetPassword = async (user: User): Promise<any> => {};

// export const editProfile = async (user: User): Promise<any> => {};
