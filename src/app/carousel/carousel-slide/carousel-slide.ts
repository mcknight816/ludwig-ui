import { SafeStyle } from '@angular/platform-browser';

export interface MatCarouselSlide {
  image: SafeStyle | undefined;
  overlayColor: string;
  hideOverlay: boolean;
  disabled: boolean;
}
