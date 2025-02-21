import bcrypt from 'bcrypt';


export const hash = async (source: string): Promise<string> => {
  const salt: string = await bcrypt.genSalt(10);
  return await bcrypt.hash(source, salt);
};

export const compareHash = async (notHashed: string, hashed: string): Promise<boolean> => {
  return await bcrypt.compare(notHashed, hashed);
};