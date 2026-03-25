// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DeskhubPilotComponent } from './deskhubpilot/deskhubpilot.component';

const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'deskpilot', component: DeskhubPilotComponent }, // optional deep link
  { path: '**', redirectTo: '' } // fallback
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
