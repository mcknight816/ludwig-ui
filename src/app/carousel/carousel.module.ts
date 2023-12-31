import {NgModule, Injectable, ModuleWithProviders} from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';

import { MatCarouselComponent } from './carousel.component';
import { MatCarouselSlideComponent } from './carousel-slide/carousel-slide.component';
import {
  HammerGestureConfig,
  HAMMER_GESTURE_CONFIG,
  HammerModule
} from '@angular/platform-browser';
import {MatButtonModule} from "@angular/material/button";


@Injectable()
export class MatCarouselHammerConfig extends HammerGestureConfig {
  overrides = {
    pinch: { enable: false },
    rotate: { enable: false }
  };
}
@NgModule({
  declarations: [MatCarouselComponent, MatCarouselSlideComponent],
  imports: [CommonModule, MatButtonModule, MatIconModule, HammerModule],
  exports: [MatCarouselComponent, MatCarouselSlideComponent]
})
export class MatCarouselModule {
  static forRoot(): ModuleWithProviders<MatCarouselModule> {
    return {
      ngModule: MatCarouselModule,
      providers: [
        { provide: HAMMER_GESTURE_CONFIG, useClass: MatCarouselHammerConfig }
      ]
    };
  }
}
