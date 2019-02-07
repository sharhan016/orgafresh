import { NgModule } from '@angular/core';
import { MyPipe } from './my/my';
import { LoadImagePipe } from './load-image/load-image';
@NgModule({
	declarations: [MyPipe,
    LoadImagePipe],
	imports: [],
	exports: [MyPipe,
    LoadImagePipe]
})
export class PipesModule {}
