import { Application } from 'express';
import { authRoutes } from '@auth/routes/AuthRoutes';
import { configenv } from '@configs/configEnvs';


//  PATTERN DESING: CHAIN OF RESPONSABILITUY (Especificar cadenas de comportamientos que pueda tener esa ruta)

export default (app: Application) => {
  
  const routes = () => {
    app.use(configenv.BASE_PATH!, authRoutes.routes());
    app.use(configenv.BASE_PATH!, authRoutes.signoutRoute());
  };
  routes();
};