const SALT: number = 1234567890;

export function encodeId(id1: number, id2: number): string {
    const sum = id1 + id2; 
    const product = id1 * id2; 
    return `${sum}-${product}`;
}

export function decodeId(chatId: string): {userId1: number, userId2: number} {
    const [sumStr, productStr] = chatId.split("-");    
    const sum = parseInt(sumStr, 10);
    const product = parseInt(productStr, 10);

    const discriminant = Math.sqrt(sum * sum - 4 * product);
    const userId1 = (sum + discriminant) / 2;
    const userId2 = (sum - discriminant) / 2;
  
    return { userId1: Math.round(userId1), userId2: Math.round(userId2) };
}

