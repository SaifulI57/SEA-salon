import { AES, enc, mode, pad, lib, PBKDF2, algo } from 'crypto-js';
import dotenv from 'dotenv';
import { compare } from 'bcryptjs';

dotenv.config();

const keySize = 256;
const iterations = 1000;

const keyE = process.env._KEY || '';
const ivHex = process.env._IV || '';

const saltHex = lib.WordArray.create(enc.Hex.parse(keyE).words.slice(0, 4)).toString(enc.Hex) + lib.WordArray.create(enc.Hex.parse(ivHex).words.slice(0, 4)).toString(enc.Hex);

/**
 * Encrypts a message using AES encryption with CBC mode and PKCS7 padding.
 * @param {string} msg - The message to encrypt.
 * @param {string | lib.WordArray} keyI - Optional. The encryption key. Defaults to the value from environment variable `_KEY`.
 * @returns {string} The encrypted message as a base64-encoded string.
 */
export const encryptData = (msg: string, keyI: string | lib.WordArray = keyE): string => {
    try {
        const iv = enc.Hex.parse(ivHex);
        const salt = enc.Hex.parse(saltHex);
        const key = PBKDF2(keyI, salt, {
            keySize: keySize / 32,
            iterations: iterations,
            hasher: algo.SHA256
        });

        const encrypted = AES.encrypt(msg, key, {
            iv: iv,
            padding: pad.Pkcs7,
            mode: mode.CBC
        });

        return encrypted.toString();
    } catch (error) {
        console.error('Encryption failed:', error);
        return '';
    }
};

/**
 * Compares a plain text password with a hashed password.
 * @param {string} password - The plain text password to compare.
 * @param {string} hashedPassword - The hashed password to compare against.
 * @returns {Promise<boolean>} A promise that resolves to true if the passwords match, false otherwise.
 */
export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
    return password === hashedPassword;
};

/**
 * Decrypts an AES-encrypted message using CBC mode and PKCS7 padding.
 * @param {string} encryptedData - The base64-encoded encrypted data to decrypt.
 * @param {string | lib.WordArray} keyI - Optional. The decryption key. Defaults to the value from environment variable `_KEY`.
 * @returns {string} The decrypted message as a UTF-8 string.
 */
export const decryptData = (encryptedData: string, keyI: string | lib.WordArray = keyE): string => {
    try {
        const salt = enc.Hex.parse(saltHex);
        const iv = enc.Hex.parse(ivHex);
        const key = PBKDF2(keyI, salt, {
            keySize: keySize / 32,
            iterations: iterations,
            hasher: algo.SHA256
        });

        const decrypted = AES.decrypt(encryptedData, key, {
            iv: iv,
            padding: pad.Pkcs7,
            mode: mode.CBC
        });
        return decrypted.toString(enc.Utf8);
    } catch (error) {
        console.error('Decryption failed:', error);
        return '';
    }
};
