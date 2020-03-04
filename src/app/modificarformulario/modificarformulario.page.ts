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
  selector: 'app-modificarformulario',
  templateUrl: './modificarformulario.page.html',
  styleUrls: ['./modificarformulario.page.scss'],
})
export class ModificarformularioPage {


  constructor(
    private http: HttpClient,
    private acti: ActivatedRoute,
    private menu: MenuController,
    public alertController: AlertController,
    private webview: WebView,
    private rou: Router,
    private platform: Platform,
    private camera: Camera, private file: File,
    private actionSheetController: ActionSheetController, private toastController: ToastController,
    private storage: Storage, private plt: Platform, private loadingController: LoadingController,
    private filePath: FilePath
  ) { }
  tipousuario;
  id;
  idconsultar;
  api = 'https://ionicbd.000webhostapp.com/api.php';
  api2 = 'https://ionicbd.000webhostapp.com/api2.php';
  re={}
  async ngOnInit() {
    this.tipousuario = this.acti.snapshot.paramMap.get("tipo_usu");
    this.id = this.acti.snapshot.paramMap.get("id");
    this.idconsultar = this.acti.snapshot.paramMap.get("idconsultar");
    let id = {
      id: this.idconsultar,
      accion: "consultar"
    }
    const loading = await this.loadingController.create({
      message: "cargando datos del usuario",
    });
    await loading.present();
    this.http.post(this.api, JSON.stringify(id)).pipe(finalize(() => { loading.dismiss() })).subscribe(
      datos => {
        console.log(datos);
        this.re = datos;
      }
    )
  }

  async modificar(){
    const loading = await this.loadingController.create({
      message: "Aplicando Modificacion....",
    });
    await loading.present();
    this.re["accion"]="modificar"
    this.http.post(this.api2, JSON.stringify(this.re)).pipe(finalize(() => { loading.dismiss() })).subscribe(
      me => {
        console.log(me);
        this.alerta()
      }
      )
      
  }

  async alerta() {
    const alert = await this.alertController.create({
      header: 'Accion Finalizada!',
      message: ' <strong>Actualizacion de informacion exitosa</strong>!!!',
      buttons: [
        {
          text: 'Aceptar',
          handler: () => {
            this.rou.navigate(["/modificar", this.tipousuario, this.id])
          }
        }
      ]
    });
    await alert.present();
  }
}
