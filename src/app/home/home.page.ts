import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuController, AlertController } from '@ionic/angular';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/Camera/ngx';
import { ActionSheetController, ToastController, Platform, LoadingController } from '@ionic/angular';
import { File, FileEntry } from '@ionic-native/File/ngx';
import { Storage } from '@ionic/storage';
import { FilePath } from '@ionic-native/file-path/ngx';
import { finalize } from 'rxjs/operators'
import { WebView } from '@ionic-native/ionic-webview/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
  cad="abc1234"
  STORAGE_KEY = 'my_images';
  re={}
  tipousuario;
  id;
  datos:any;
  checki=true;
  api ='https://ionicbd.000webhostapp.com/api.php'
  api2 = 'https://ionicbd.000webhostapp.com/api2.php'
  constructor(
    private http: HttpClient,
    public alertController: AlertController,
    private acti: ActivatedRoute,
    private menu: MenuController,
    private webview: WebView,
    private rou:Router,
    private platform:Platform,
    private camera: Camera, private file: File,
    private actionSheetController: ActionSheetController, private toastController: ToastController,
    private storage: Storage, private plt: Platform, private loadingController: LoadingController,
     private filePath: FilePath
  ){}
 async ngOnInit() {
   const loading = await this.loadingController.create({
     message: "cargando datos del usuario",
   });
   await loading.present();
      this.tipousuario = this.acti.snapshot.paramMap.get("tipo_usu");
      this.id = this.acti.snapshot.paramMap.get("id");
        let id={
          id:this.id,
          accion:"consultar"
        }
        this.http.post(this.api, JSON.stringify(id)).pipe(finalize(() => {loading.dismiss()})).subscribe(  
          datos=>{
          console.log(datos);
          this.datos=datos;
        }
      )
   if (this.tipousuario == "admi") {
     this.menu.enable(true, "admi");
    
   } else {
     this.menu.enable(true, "estudiante");
    
   }
    }

  openFirst() {
    if (this.tipousuario == "admi") {
      this.menu.enable(true, "admi");
      this.menu.open("admi");
    }else{
      this.menu.enable(true, "estudiante");
      this.menu.open("estudiante");
    }
  }

  redirecionar(redirec){
    if (redirec =="Modificar"){
      this.rou.navigate(["/modificar",this.tipousuario,this.id]);
    }else{
      if (redirec =="eliminar"){
        this.rou.navigate(["/list", this.tipousuario, this.id]);
      }else{
        if (redirec == "Registrar") {
          
        } else {
      this.rou.navigate([redirec]);
        }
    }
    }
  }
  

  pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      let converted = this.webview.convertFileSrc(img);
      return converted;
    }
  }

  async tomar(){
    const actionSheet = await this.actionSheetController.create({
      header: "Selecciona un foto",
      buttons: [{
        text: 'cargar desde libreria',
        handler: () => {
          this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
      }
            },
      {
        text: 'usar camara',
        handler: () => {
        this.takePicture(this.camera.PictureSourceType.CAMERA);
      }
            },
            {
      text: 'Cancel',
      role: 'cancel'
      }
        ]
    });
await actionSheet.present();
  }


  check(){
    if(this.re["check"]){
      this.checki=false;
    }
    else{
      this.checki = true;
    }
  }
  

  
takePicture(sourceType: PictureSourceType) {
  var options: CameraOptions = {
    quality: 100,
    sourceType: sourceType,
    saveToPhotoAlbum: false,
    correctOrientation: true
  };
  this.camera.getPicture(options).then(imagePath => {
    if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
      this.filePath.resolveNativePath(imagePath)
        .then(filePath => {
          let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
          let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
          this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
        });
    } else {
      var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
      var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
      this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
    }
  });

}


  createFileName() {
    var d = new Date(),
      n = d.getTime(),
      newFileName = n + ".jpg";
    return newFileName;
  }

  copyFileToLocalDir(namePath, currentName, newFileName) {
    this.file.copyFile(namePath, currentName, this.file.dataDirectory, newFileName).then(success => {
      this.updateStoredImages(newFileName);
    }, error => {
    });
  }

  updateStoredImages(name) {
    this.storage.get(this.STORAGE_KEY).then(images => {
      let arr = JSON.parse(images);
      if (!arr) {
        let newImages = [name];
        this.storage.set(this.STORAGE_KEY, JSON.stringify(newImages));
      } else {
        arr.push(name);
        this.storage.set(this.STORAGE_KEY, JSON.stringify(arr));
      }

      let filePath = this.file.dataDirectory + name;
      let resPath = this.pathForImage(filePath);

      this.re["img"] = resPath;
      this.re["imagen"] = filePath;
    });
  }





  async presentToast(text) {
    const toast = await this.toastController.create({
      message: text,
      position: 'bottom',
      duration: 4000
    });
    toast.present();
  }

  startUpload() {
    if (this.re["nombre"] == null || this.re["apellido"] == null || this.re["username"] == null || this.re["contrasena"] == null || this.re["edad"] == null || this.re["sexo"] == null || this.re["td"] == null || this.re["ndocumento"] == null || this.re["email"] == null || this.re["direccion"] == null || this.re["telefono"] == null || this.re["carrera"] == null || this.re["jornada"] == null) {
      this.presentToast("Tienes que diligenciar todo el formulario");
    } else {
           this.re["tipo"] = "Estudiante"
          this.file.resolveLocalFilesystemUrl(this.re["imagen"])
            .then(entry => {
              (<FileEntry>entry).file(file => this.readFile(file))
            })
            .catch(err => {
              this.presentToast('tienes que seleccionar una foto');
            });
        }
  }

  readFile(file: any) {
    const reader = new FileReader();
    reader.onloadend = () => {
      const formData = new FormData();
      const imgBlob = new Blob([reader.result], {
        type: file.type
      });
      formData.append('file', imgBlob, file.name);
      this.uploadImageData(formData);
    };
    reader.readAsArrayBuffer(file);
  }

  async uploadImageData(formData: FormData) {
    const loading = await this.loadingController.create({
      message: 'registrando...',
    });
    this.re["accion"]="registrar"
    await loading.present();
    this.http.post(this.api2,formData)
      .subscribe(res => {
        this.re["imagen"]=res;
        this.http.post(this.api2, JSON.stringify(this.re))
          .pipe(
            finalize(() => {
              loading.dismiss();
            })
          )
          .subscribe(lo => {
          });
          this.alerta()
        });
  }

  async alerta(){
    const alert = await this.alertController.create({
      header: 'Accion Finalizada!',
      message: ' <strong>registro exitoso</strong>!!!',
      buttons: [
        {
          text: 'Okay',
          handler: () => {
            location.reload();
          }
        }
      ]
    });
    await alert.present();
  }
}
