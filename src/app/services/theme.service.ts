import { Injectable,Renderer2,RendererFactory2 } from '@angular/core';
import {OverlayContainer} from "@angular/cdk/overlay";

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private renderer:Renderer2;

  constructor(private renderFactory:RendererFactory2,private _overlayContainer: OverlayContainer) {

    this.renderer = renderFactory.createRenderer(null,null);
  }
  initTheme(){

  }
  getTheme(): string {
    let theme = localStorage.getItem('user-theme');
    return theme && theme === 'dark-mode' ? 'dark-mode' : 'light-mode';
  }
  isDarkMode(){
    this.renderTheme(this.getTheme());
    return this.getTheme() === 'dark-mode';
  }
/*
const overlayContainerClasses = this._overlayContainer.getContainerElement().classList;
  const themeClassesToRemove = Array.from(overlayContainerClasses)
    .filter((item: string) => item.includes('app-theme-'));
  if (themeClassesToRemove.length) {
    overlayContainerClasses.remove(...themeClassesToRemove);
  }
  overlayContainerClasses.add(theme);
 */
  renderTheme(theme: string){
    this.renderer.removeClass(document.body,'dark-mode');
    this.renderer.removeClass(document.body,'light-mode');
    const overlayContainerClasses = this._overlayContainer.getContainerElement().classList;
    overlayContainerClasses.remove('dark-mode');
    overlayContainerClasses.remove('light-mode');
    this.renderer.addClass(document.body,theme);

    overlayContainerClasses.add(theme)
    localStorage.setItem('user-theme',theme);
  }
  toggleTheme(){
    this.renderTheme(this.isDarkMode() ? 'light-mode' : 'dark-mode');
    return this.isDarkMode();
  }

}
