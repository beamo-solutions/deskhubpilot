import { Component } from '@angular/core';
import { InViewDirective } from '../directives/in-view.directive';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-footer',
  imports: [InViewDirective],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  readonly appVersion = environment.appVersion;
}
