import { ThemePalette } from '@angular/material/core';

export interface MatCarousel {
  // Animations.
  timings: string;
  autoplay: boolean;
  interval: number;
  // Navigation.
  loop: boolean;
  hideArrows: boolean;
  hideIndicators: boolean;
  // Appearance.
  color: ThemePalette;
  maxWidth: string;
  proportion: number;
  slides: number;
  svgIconOverrides: SvgIconOverrides | undefined;
  // Accessibility.
  useKeyboard: boolean;
  useMouseWheel: boolean;
  orientation: Orientation;
}

export type Orientation = 'ltr' | 'rtl';
export interface SvgIconOverrides {
  arrowBack: string | undefined;
  arrowForward: string | undefined;
}
