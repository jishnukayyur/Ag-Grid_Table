import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportComponent } from './report.component';
import { GalleryComponent } from './gallery/gallery.component';
import { GridComponent } from './grid/grid.component';

const routes: Routes = [
                        { path: '', redirectTo:'grid',pathMatch:'full' },
                        { path: 'grid', component: GridComponent },
                        { path: 'gallery', component: GalleryComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
