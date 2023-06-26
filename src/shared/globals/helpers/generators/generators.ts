import { configenv } from '@configs/configEnvs';
import bcrypt from 'bcryptjs';

export class Generators {

  static firstLetterUpperCase(str: string): string {
    const valueString = str.toLowerCase();
    return valueString
    .split(' ')
    .map((value: string) => `${value.charAt(0).toUpperCase()}${value.slice(1).toLowerCase()}`)
    .join(' ');
  }

  static lowercase(str: string): string {
    return str.toLowerCase();
  }

  static parseJson(prop: string): unknown {
    try {
      JSON.parse(prop);
    } catch (error) {
      return prop;
    }
  }

  static dinamicGenerateRandom(integerLength: number): number {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = ' ';
    const charactersLength = characters.length;
    for (let i = 0; i < integerLength; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));     
    }
    return parseInt(result, 10);
  }

  static hash(password: string): Promise<string> { 
    return bcrypt.hash(password, Number(configenv.SALT_ROUND));
  }

}