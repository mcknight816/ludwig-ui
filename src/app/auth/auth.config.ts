import {AuthConfig} from 'angular-oauth2-oidc';

export const authConfig: AuthConfig = {
  issuer: 'https://keycloak.bluntsoftware.com/auth/realms/ludwig',
  redirectUri: window.location.origin + '/callback',
  clientId: "cf-pkce",
  scope: 'openid profile email roles offline_access',
  responseType: 'code',
  showDebugInformation: false,
  logoutUrl: 'https://keycloak.bluntsoftware.com/auth/realms/ludwig/protocol/openid-connect/logout'
};
