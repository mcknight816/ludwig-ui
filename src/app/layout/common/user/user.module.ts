import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import {CommonModule} from "@angular/common";
import {UserComponent} from "./user.component";

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
