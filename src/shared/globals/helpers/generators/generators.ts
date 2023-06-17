import { configenv } from '@configs/configEnvs';
import bcrypt from 'bcryptjs';

export class Generators {

  //Configuramos para que la primera letra sea mayusculas de cualquier caracter.
  static firstLetterUpperCase(str: string): string {
    const valueString = str.toLowerCase();
    return valueString
    .split(' ')
    .map((value: string) => `${value.charAt(0).toUpperCase()}${value.slice(1).toLowerCase()}`)
    .join(' ');
  }

  // Esta para que sean minusculas.
  static lowercase(str: string): string {
    return str.toLowerCase();
  }

  // para parsear a json (para redis)
  static parseJson(prop: string): unknown {
    try {
      JSON.parse(prop);
    } catch (error) {
      return prop;
    }
  }

  // Para generar identificadores de forma dinamica.
  static dinamicGenerateRandom(integerLength: number): number {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = ' ';
    const charactersLength = characters.length;
    for (let i = 0; i < integerLength; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));     
    }
    return parseInt(result, 10);
  }

  static hash(password: string): Promise<string> { // el hash lo que regresa es un apromesa
    return bcrypt.hash(password, Number(configenv.SALT_ROUND)); // Es importante destacar que a Number se pasa el parametro salt_round.
  }

}