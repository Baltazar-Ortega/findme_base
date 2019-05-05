import { FIREBASE_CONFIG } from './../../../firebase.config';
import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  Input
} from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Platform } from '@ionic/angular';
import { storage, initializeApp } from 'firebase';


@Component({
  selector: 'app-image-picker',
  templateUrl: './image-picker.component.html',
  styleUrls: ['./image-picker.component.scss'],
})
export class ImagePickerComponent implements OnInit {
  @ViewChild('filePicker') filePickerRef: ElementRef<HTMLInputElement>;
  @Output() imagePick = new EventEmitter<string | File>();
  @Input() showPreview = false; // para resetear si se vuelve a entrar
  selectedImage: any;
  usePicker = false;

  constructor(private platform: Platform, private camera: Camera) { 
    
  }

  ngOnInit() {
    initializeApp(FIREBASE_CONFIG);
    console.log('Mobile:', this.platform.is('mobile'));
    console.log('Hybrid:', this.platform.is('hybrid'));
    console.log('iOS:', this.platform.is('ios'));
    console.log('Android:', this.platform.is('android'));
    console.log('Desktop:', this.platform.is('desktop'));
    if (
      (this.platform.is('mobile') && !this.platform.is('hybrid')) ||
      this.platform.is('desktop')
    ) {
      this.usePicker = true;
    }
  }

  async onPickImage() {
    try {
      // Defining camera options
      const options: CameraOptions = {
        quality: 50,
        targetHeight: 600,
        targetWidth: 600,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        correctOrientation: true
      };
      const result = await this.camera.getPicture(options);
      const image = `data:image/jpeg;base64,${result}`;
      this.selectedImage = image;
      this.imagePick.emit(this.selectedImage);
      /*const pictures = storage().ref('pictures');
      pictures.putString(image, 'data_url');*/
    } catch(e) {
      console.log('Error ', e);
    }
  }

  // Para desktop 
  onFileChosen(event: Event) {
    const pickedFile = (event.target as HTMLInputElement).files[0];
    if (!pickedFile) {
      return;
    }
    const fr = new FileReader();
    fr.onload = () => {
      const dataUrl = fr.result.toString();
      this.selectedImage = dataUrl;
      this.imagePick.emit(pickedFile); // manda directamente el File, sin convertirlo
    };
    fr.readAsDataURL(pickedFile); // convierte a base64string
  }

}
