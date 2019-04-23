import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { MapModalComponent } from './map-modal/map-modal.component';
import { NgModule } from '@angular/core';
import { LocationPickerComponent } from './location-picker/location-picker.component';

@NgModule({
    declarations: [LocationPickerComponent, MapModalComponent],
    imports: [CommonModule, IonicModule],
    exports: [LocationPickerComponent, MapModalComponent],
    entryComponents: [MapModalComponent]
})
export class ComponentesModule { }