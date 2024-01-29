import {NgModule} from '@angular/core';
import {CnpjPipe} from "../cnpj.pipe";

@NgModule({
    declarations: [
        CnpjPipe
    ],
    exports: [
        CnpjPipe
    ]
})
export class CnpjModule {
}
