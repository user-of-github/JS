import url from 'node:url';
import path from 'node:path';

export const __filename = url.fileURLToPath(import.meta.url);

// @TODO: ATTENTION: it now depends on folders structure
export const __dirname = path.resolve(path.dirname(__filename), '../../');