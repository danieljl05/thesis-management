import { finalize, tap } from 'rxjs/operators';
import { HttpHandler, HttpEvent, HttpRequest } from '@angular/common/http';
import { NgxSpinnerService } from "ngx-spinner";
import { Observable } from 'rxjs';

export class SpinnerHttpRequest {

    count = 0;
    constructor(private spinner: NgxSpinnerService) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.spinner.show();
        this.count++;
        return next.handle(req)
            .pipe(tap(), finalize(() => {
                this.count--;
                if (this.count == 0) this.spinner.hide()
            })
            );
    }
}