import dotenv from 'dotenv';

dotenv.config({});

class Config {
  public DATABASE_URL: string | undefined;
  public NODE_ENV: string | undefined;
  public CLIENT_URL: string | undefined;
  public JWT_TOKEN: string | undefined;
  public SECRET_KEY_ONE: string | undefined;
  public SECRET_KEY_TWO: string | undefined;
  public SERVER_PORT: string | undefined;

  constructor() {
    this.DATABASE_URL = process.env.DATABASE_URL;
    this.NODE_ENV = process.env.NODE_ENV;
    this.CLIENT_URL = process.env.CLIENT_URL;
    this.JWT_TOKEN = process.env.JWT_TOKEN;
    this.SECRET_KEY_ONE = process.env.SECRET_KEY_ONE;
    this.SECRET_KEY_TWO = process.env.SECRET_KEY_TWO;
    this.SERVER_PORT = process.env.SERVER_PORT;
  }
  

  public validateconfig(): void {
    console.log(this);
    for (const [key, value] of Object.entries(this)) {
      if (value === undefined) {
        throw new Error(`Configuration ${key} is undefined`);
      }
    }
  }
}

export const configenv: Config = new Config();
