import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import {SaasyInterceptor} from './saasy-interceptor';
import {OAuthModule} from 'angular-oauth2-oidc';
import {authConfig} from './auth.config';
import {SaasyService} from './saasy-service';
import {AuthService} from "./auth.service";

@NgModule({
    imports  : [
        HttpClientModule,
        OAuthModule.forRoot({
            resourceServer: {
                allowedUrls: ['http://localhost:9096/api/v1/','http://localhost:9094/','https://saasy-service.bluntsoftware.com/api/v1/'],
                sendAccessToken: true
            }
        })
    ],
    providers: [
        SaasyService,
        AuthService,
        {
            provide : HTTP_INTERCEPTORS,
            useClass: SaasyInterceptor,
            multi   : true
        }
    ]
})
export class AuthModule {
    constructor(private authService: AuthService) {
        this.authService.configure(authConfig);
        this.authService.runInitialLoginSequence().then();
    }
}
