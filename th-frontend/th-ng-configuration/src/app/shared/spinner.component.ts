import {
  Component,
  Input,
  OnDestroy,
  Inject,
  ViewEncapsulation
} from '@angular/core';
import {
  Router,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError
} from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-spinner',
  template: `
    <ngx-spinner size="medium" [color]="color" [bdColor]="spinnerBackground" [type]="type"></ngx-spinner>
  `,
  encapsulation: ViewEncapsulation.None
})
export class SpinnerComponent implements OnDestroy {

  @Input()
  public color = '#1e88e5';
  @Input()
  public type = 'square-jelly-box';
  @Input()
  public spinnerBackground = 'rgba(51,51,51,0.8)';

  constructor(
    private router: Router,
    private spinner: NgxSpinnerService
  ) {
    this.router.events.subscribe(
      event => {
        if (event instanceof NavigationStart) {
          this.spinnerBackground = 'rgba(255, 255, 255, 1)';
          this.spinner.show();
        } else if (
          event instanceof NavigationEnd ||
          event instanceof NavigationCancel ||
          event instanceof NavigationError
        ) {
          this.spinner.hide();
          this.spinnerBackground = 'rgba(51, 51, 51, 0.5)';
        }
      },
      () => {
        this.spinner.hide();
      }
    );
  }

  ngOnDestroy(): void {
    this.spinner.hide();
  }
}
