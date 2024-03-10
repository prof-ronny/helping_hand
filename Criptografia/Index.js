import sha256 from 'crypto-js/sha256';
import { enc } from 'crypto-js';

export default function generateSHA256Hash(input) {
    const hash = sha256(input);
    return hash.toString(enc.Hex);
}
