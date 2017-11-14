import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SearchPipe } from './search.pipe';

@NgModule({
    imports: [
        BrowserModule
    ],
    declarations: [
        SearchPipe
    ],
    exports: [
        SearchPipe
    ]
})
export class PipesModule {}
