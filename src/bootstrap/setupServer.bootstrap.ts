import { Application, json, urlencoded, Request, Response, NextFunction } from 'express';
import http from 'http';
import cors from 'cors';
import helmet from 'helmet';
import hpp from 'hpp';
import compression from 'compression';
import cookieSession from 'cookie-session';
import 'express-async-errors';
import { configenv } from '@configs/configEnvs';
import { logger } from '@configs/configLogs';
import Logger from 'bunyan';
import HTTP_STATUS from 'http-status-codes';
import { IErrorResponse } from '@helpers/errors/errorResponse.interface';
import { CustonError } from '@helpers/errors/customError';
import applicationRoutes from '@interfaces/http/routes';


const log: Logger = logger.createLogger('server');


export class CmvServer {
  private app: Application;

  constructor(app: Application) {
    this.app = app;
  }

  public start(): void {

    //  PATTERN DESING: CHAIN OF RESPONSABILITUY (Especificar cadenas de comportamientos que pueda tener esa ruta)
    this.securityMiddleware(this.app);
    this.standardMiddleware(this.app);
    this.routesMiddleware(this.app);
    this.globalErrorCMBackend(this.app);
    this.startServer(this.app);
  }

  private securityMiddleware(app: Application): void {
    app.use(
      cookieSession({
        name: 'session',
        keys: [configenv.SECRET_KEY_ONE!, configenv.SECRET_KEY_TWO!],
        maxAge: 14 * 24 * 60 * 60 * 1000, 
        secure: configenv.NODE_ENV !== 'development'
      })
    );
    app.use(hpp());
    app.use(helmet());
    app.use(
      cors({
        origin: configenv.CLIENT_URL,
        credentials: true,
        optionsSuccessStatus: 200,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
      })
    );
  }

  private routesMiddleware(app: Application): void {
    applicationRoutes(app);
  }

  private standardMiddleware(app: Application): void {
    app.use(compression());
    app.use(json({ limit: '60mb' }));
    app.use(urlencoded({ extended: true, limit: '60mb' }));
  }


  private globalErrorCMBackend(app: Application): void {
    app.all('*', (req: Request, res: Response ) => {
      res.status(HTTP_STATUS.NOT_FOUND).json({ message: `${req.originalUrl} not found`});
    });
 
    app.use((error: IErrorResponse, _: Request, res: Response, next: NextFunction) => {
      log.error(error);
      if (error instanceof CustonError) {
        return res.status(error.statusCode). json(error.serializeErrors());
      }
      next();
    });
  };

  private async startServer(app: Application): Promise<void> {
    try {
      const httpServer: http.Server = new http.Server(app);
      this.startHttpServer(httpServer);
    } catch (error) {
      log.error(error);
    }
  }

  private startHttpServer(httpServer: http.Server): void {
    log.info(`Server has started with process ${process.pid}`);
    const PORT = Number(configenv.SERVER_PORT);
    httpServer.listen(PORT, () => {
      log.info(`Server running at ${PORT} CV-Vidal`);
    });
  }
}
