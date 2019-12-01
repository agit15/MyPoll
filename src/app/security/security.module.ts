import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { SecurityComponent } from './security/security.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistrerenComponent } from './registreren/registreren.component';



@NgModule({
  declarations: [SecurityComponent, RegistrerenComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SecurityModule { }