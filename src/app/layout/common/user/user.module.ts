import { NgModule } from '@angular/core';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyMenuModule as MatMenuModule } from '@angular/material/legacy-menu';
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
