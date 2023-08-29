import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable, Optional} from '@angular/core';
import {Observable} from 'rxjs';
import {IdName, SaasyService, Tenant} from './saasy-service';
import {OAuthModuleConfig, OAuthResourceServerErrorHandler, OAuthStorage} from 'angular-oauth2-oidc';

@Injectable()
export class SaasyInterceptor implements HttpInterceptor {
    constructor(
        private authStorage: OAuthStorage,
        private errorHandler: OAuthResourceServerErrorHandler,
        @Optional() private moduleConfig: OAuthModuleConfig
    ) {}

    private checkUrl(url: string): boolean {
        return !!this.moduleConfig?.resourceServer?.allowedUrls?.find(u => url.startsWith(u));
    }

    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const tenant: IdName = SaasyService.getTenant();

        const TENANT_KEY = tenant.id ? tenant.id : null;
        let url = req.url.toLowerCase();

        if (!this.moduleConfig) return next.handle(req);
        if (!this.moduleConfig.resourceServer) return next.handle(req);
        if (!this.moduleConfig.resourceServer.allowedUrls) return next.handle(req);
        if (!this.checkUrl(url)) return next.handle(req);

        let sendAccessToken = this.moduleConfig.resourceServer.sendAccessToken;

        if (sendAccessToken) {
            let token = this.authStorage.getItem('access_token');
            let headers = null;
            if(token){
                let header = 'Bearer ' + token;
                headers = req.headers.set('Authorization', header);
            }
            if(TENANT_KEY){
                //headers = req.headers.set("TENANT_KEY",TENANT_KEY);
                headers = req.headers.set("tenant-id",TENANT_KEY);
            }
            if(headers){
                req = req.clone({ headers });
            }
        }
        return next.handle(req);
    }
}
