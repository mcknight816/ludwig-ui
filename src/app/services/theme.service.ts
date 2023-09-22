import { Injectable,Renderer2,RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private renderer:Renderer2;

  constructor(private renderFactory:RendererFactory2) {
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

  renderTheme(theme: string){
    this.renderer.removeClass(document.body,'dark-mode');
    this.renderer.removeClass(document.body,'light-mode');
    this.renderer.addClass(document.body,theme);
    localStorage.setItem('user-theme',theme);
  }
  toggleTheme(){
    this.renderTheme(this.isDarkMode() ? 'light-mode' : 'dark-mode');
    return this.isDarkMode();
  }

}
