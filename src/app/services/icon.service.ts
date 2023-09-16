import {Injectable} from "@angular/core";
import {MatIconRegistry} from "@angular/material/icon";
import {DomSanitizer} from "@angular/platform-browser";

export enum Icons {
  github='github',
  appIcon='app-icon',
  profile='profile'
}

@Injectable({
  providedIn: 'root'
})
export class IconService {

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) { }

  public registerIcons(): void {
    this.loadIcons(Object.values(Icons), '../assets/svg/icons');
  }

  private loadIcons(iconValues: string[], iconUrl: string): void {
    iconValues.forEach(value => {
      console.log('registering icon ' + value + ' at ' + iconUrl + '/' +  value +'.svg');
      this.matIconRegistry.addSvgIcon(value, this.domSanitizer.bypassSecurityTrustResourceUrl(`${iconUrl}/${value}.svg`));
    });
  }
}
