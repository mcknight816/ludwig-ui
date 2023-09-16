import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import {DefaultLayoutModule} from "./layouts/default-layout/default-layout.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "../material-module";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatCarouselModule} from "../carousel/carousel.module";
import {AuthModule} from "../auth/auth.module";
import {UserModule} from "./common/user/user.module";
@NgModule({
    declarations: [
        LayoutComponent
    ],
    imports: [
        AuthModule,
        UserModule,
        CommonModule,
        DefaultLayoutModule,
        FormsModule,
        MaterialModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        MatCarouselModule
    ]
})
export class LayoutModule { }
