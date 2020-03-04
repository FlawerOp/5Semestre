import { Component, OnInit } from '@angular/core';
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
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
  constructor(
    private http: HttpClient,
    private acti: ActivatedRoute,
    private alertController: AlertController,
    private menu: MenuController,
    private webview: WebView,
    private rou: Router,
    private platform: Platform,
    private camera: Camera, private file: File,
    private actionSheetController: ActionSheetController, private toastController: ToastController,
    private storage: Storage, private plt: Platform, private loadingController: LoadingController,
    private filePath: FilePath
  ) { }
  buscarr;
  tipousuario;
  id;
  todatos: any;
  api = 'https://ionicbd.000webhostapp.com/api.php';
  api2 = 'https://ionicbd.000webhostapp.com/api2.php';
  datos: any;
  async buscar(){
    if(this.buscarr!="")
    {
      const loading = await this.loadingController.create({
        message: "cargando datos del usuario",
      });
      await loading.present();
      let buscar={
        accion:"buscar",
        numero:this.buscarr
      }
      this.http.post(this.api2, JSON.stringify(buscar)).pipe(finalize(() => { loading.dismiss() })).subscribe(
        datos => {
          console.log(datos);
          this.todatos = datos;
        }
      )
    } 
   }


  async ngOnInit() {
    const loading = await this.loadingController.create({
      message: "cargando datos del usuario",
    });
    await loading.present();
    this.tipousuario = this.acti.snapshot.paramMap.get("tipo_usu");
    this.id = this.acti.snapshot.paramMap.get("id");
    let id = {
      id: this.id,
      accion: "consultar"
    }

    this.http.post(this.api, JSON.stringify(id)).pipe(finalize(() => { loading.dismiss() })).subscribe(
      datos => {
        console.log(datos);
        this.datos = datos;
      }
    )
    let lo = {
      accion: "lo"
    }
    const loading2 = await this.loadingController.create({
      message: "listando de usuarios",
    });
    await loading.present();
    this.http.post(this.api, JSON.stringify(lo)).pipe(finalize(() => { loading2.dismiss() })).subscribe(
      res => {
        console.log(res);
        this.todatos = res;
      }
    )
  }

  sidemenu() {
    this.menu.enable(true,"admi1");
    this.menu.open("admi1");
  }
  
  async eliminar(id) {
    const loading = await this.loadingController.create({
      message: "Aplicando Modificacion....",
    });
    await loading.present();
    let info={
      id:id,
      accion:"eliminar"
    }
    this.http.post(this.api2, JSON.stringify(info)).pipe(finalize(() => { loading.dismiss() })).subscribe(
      me => {
        console.log(me);
        this.alerta()
      }
    )

  }

  async alerta() {
    const alert = await this.alertController.create({
      header: 'Accion Finalizada!',
      message: ' <strong>usuario eliminado</strong>!!!',
      buttons: [
        {
          text: 'Aceptar',
          handler: () => {
           this.ngOnInit()
          }
        }
      ]
    });
    await alert.present();
  }

  redirecionar(redirec) {
    if (redirec == "Modificar") {
      this.rou.navigate(["/modificar", this.tipousuario, this.id]);
    } else {
      if (redirec == "Registrar") {
        this.rou.navigate(["/home", this.tipousuario, this.id]);
      } else {
        if (redirec == "eliminar") {
          
        }else{
        this.rou.navigate([redirec]);}
     }
    }

  }

}
