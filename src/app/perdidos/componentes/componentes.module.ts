import { ImagePickerComponent } from './image-picker/image-picker.component';
import { LocationPickerAnuncioComponent } from './location-picker-anuncio/location-picker-anuncio.component';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { MapModalComponent } from './map-modal/map-modal.component';
import { NgModule } from '@angular/core';
import { LocationPickerComponent } from './location-picker/location-picker.component';
import { MapModalAnuncioComponent } from './map-modal-anuncio/map-modal-anuncio.component';

@NgModule({
    declarations: [LocationPickerComponent, 
        MapModalComponent, LocationPickerAnuncioComponent, MapModalAnuncioComponent, ImagePickerComponent],
    imports: [CommonModule, IonicModule],
    exports: [LocationPickerComponent, MapModalComponent, LocationPickerAnuncioComponent, MapModalAnuncioComponent, ImagePickerComponent],
    entryComponents: [MapModalComponent, MapModalAnuncioComponent, ImagePickerComponent]
})
export class ComponentesModule { }