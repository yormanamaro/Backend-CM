import { Application } from 'express';
import { authRoutes } from '@auth/routes/AuthRoutes';
import { configenv } from '@configs/configEnvs';


//const BASE_PATH = '/api/v1'; // Esto es para ciertas rutas

export default (app: Application) => { // Sistema de rutas.
  
  const routes = () => {
    app.use(configenv.BASE_PATH!, authRoutes.routes());
    app.use(configenv.BASE_PATH!, authRoutes.signoutRoute());
  };
  routes();
};