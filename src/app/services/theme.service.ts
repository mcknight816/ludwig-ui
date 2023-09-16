import { Injectable,Renderer2,RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private renderer:Renderer2;
  private colorTheme:string = 'light-theme';
  constructor(private renderFactory:RendererFactory2) {
    this.renderer = renderFactory.createRenderer(null,null);
  }

  initTheme(){
    this.getColorTheme();
    this.renderer.addClass(document.body,this.colorTheme);
  }

  isDarkMode(){
    return this.colorTheme === 'dark-mode';
  }

  update(theme: 'dark-mode' | 'light-mode'){
    this.setColorTheme(theme);
    const previousColorTheme = theme === 'dark-mode' ? 'light-mode' : 'dark-mode';
    this.renderer.removeClass(document.body,previousColorTheme);
    this.renderer.addClass(document.body,theme);
  }

  setColorTheme(theme:string){
    this.colorTheme = theme;
    localStorage.setItem('user-theme',theme);
  }

  getColorTheme(){
    const theme = localStorage.getItem('user-theme');
    this.colorTheme = theme ? theme : 'light-mode';
  }
}
