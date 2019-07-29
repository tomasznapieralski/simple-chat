export const btoa = (decoded: string): string => Buffer.from(decoded).toString('base64');

export const atob = (encoded: string): string => Buffer.from(encoded, 'base64').toString();
