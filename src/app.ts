import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import { connect, set } from 'mongoose';
import { AppConfig } from '@/config';
import { Routes } from '@interfaces/routes.interface';
import errorMiddleware from '@middlewares/error.middleware';
import { Logger } from '@nestjs/common';
import { LoggerMiddleware } from './middlewares/http-logger.middleware';
import passport from 'passport';
import session from 'express-session';
import { GoogleStrategy } from './config/google-strategy';
import { JwtStrategy } from './config/jwt-strategy';

class App {
  public app: express.Application;
  public env: string;
  public port: string | number;
  public logger = new Logger();

  constructor(routes: Routes[]) {
    this.app = express();
    this.env = AppConfig.env || 'development';
    this.port = AppConfig.port || 3000;

    this.connectToDatabase();
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    // this.initializeSwagger();
    this.initializeErrorHandling();
    new LoggerMiddleware();
  }

  public listen() {
    this.app.listen(this.port, () => {
      this.logger.log(`=================================`);
      this.logger.log(`======= ENV: ${this.env} =======`);
      this.logger.log(`🚀 App listening on the port ${this.port}`);
      this.logger.log(`=================================`);
    });
  }

  public getServer() {
    return this.app;
  }

  private connectToDatabase() {
    if (this.env !== 'production') {
      set('debug', true);
    }

    connect(AppConfig.dbConnection);
  }

  private initializeMiddlewares() {
    const stream = {
      write: (message: string) => {
        this.logger.log(message.substring(0, message.lastIndexOf('\n')));
      },
    };
    this.app.use(morgan(AppConfig.log_format, { stream }));
    this.app.use(cors({ origin: AppConfig.origin, credentials: AppConfig.credential }));
    this.app.use(hpp());
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
    this.app.use(
      session({
        secret: AppConfig.secret,
        resave: true,
        saveUninitialized: true,
        cookie: {
          maxAge: 1000 * 60 * 60 * 24, // 1 day
        },
      }),
    );
    this.app.use(passport.initialize());
    this.app.use(passport.session());
    passport.use(new GoogleStrategy());
    passport.use(new JwtStrategy());
    passport.serializeUser((user, done) => {
      done(null, user);
    });
    passport.deserializeUser((user, done) => {
      done(null, user);
    });
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach(route => {
      this.app.use('/', route.router);
    });
  }

  // private initializeSwagger() {
  //   const options = {
  //     swaggerDefinition: {
  //       info: {
  //         title: 'REST API',
  //         version: '1.0.0',
  //         description: 'Example docs',
  //       },
  //     },
  //     apis: ['swagger.yaml'],
  //   };

  //   const specs = swaggerJSDoc(options);
  //   this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
  // }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }
}

export default App;
