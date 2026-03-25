import { Component } from '@angular/core';
import { InViewDirective } from '../directives/in-view.directive';

@Component({
  selector: 'app-footer',
  imports: [InViewDirective],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {

}
