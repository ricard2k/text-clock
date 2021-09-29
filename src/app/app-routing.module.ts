import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClockMainComponent } from './clock-main/clock-main.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes =[
  { path: '', redirectTo: '/clock-main-component', pathMatch: 'full' },
  { path: 'clock-main-component', component: ClockMainComponent },
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, { useHash: true})
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }


