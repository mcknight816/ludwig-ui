import { NgModule } from '@angular/core';

import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

import {CommonModule} from "@angular/common";
import {UserComponent} from "./user.component";
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";

@NgModule({
    declarations: [
        UserComponent
    ],
    imports     : [
        CommonModule,
        MatButtonModule,
        MatDividerModule,
        MatIconModule,
        MatMenuModule
    ],
    exports     : [
        UserComponent
    ]
})
export class UserModule
{
}
