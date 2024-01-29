import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class NavbarService {

    private subject = new BehaviorSubject<boolean>(false);
    public data$ = this.subject.asObservable();

    constructor() {
    }

    setData(data: boolean) {
        this.subject.next(data);
    }
}
