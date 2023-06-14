import express, { Express } from 'express';
import { CmvServer } from '@bootstrap/setupServer.bootstrap';
import databaseConnection from '@bootstrap/setupDatabase.bootstrap';
import { configenv } from '@configs/configEnvs';

class Application {

  public initialize(): void {
    this.loadConfig();
    databaseConnection();
    const app: Express = express();
    const server: CmvServer = new CmvServer(app);
    server.start();
  }

  private loadConfig(): void {
    configenv.validateconfig();
  }
}

const application: Application = new Application();
application.initialize();

