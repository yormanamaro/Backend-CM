import express, { Router } from 'express';
import { SignUp } from '@auth/controllers/signup';
import { SignIn } from '@auth/controllers/signin';
import { SignOut } from '@auth/controllers/signout';

class AuthRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {

    // PATTERN DESING: CHAIN OF RESPONSABILITUY (Especificar cadenas de comportamientos que pueda tener esa ruta)
    // PATTERN DESING: PROTOTYPE (Permite especificar el contexto de ejecucion de un build)
    this.router.post('/signup', SignUp.prototype.create);
    this.router.post('/signin', SignIn.prototype.read);

    return this.router;
  }

  public signoutRoute(): Router {
    this.router.get('/signout', SignOut.prototype.update);
    return this.router;
  }
}

export const authRoutes: AuthRoutes = new AuthRoutes();