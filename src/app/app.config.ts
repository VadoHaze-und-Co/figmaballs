import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {Account} from "./rest-objects/account";

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes)]
};
