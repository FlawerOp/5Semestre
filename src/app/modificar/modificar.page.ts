import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/Camera/ngx';
import { ActionSheetController, ToastController, Platform, LoadingController } from '@ionic/angular';
import { File, FileEntry } from '@ionic-native/File/ngx';
import { Storage } from '@ionic/storage';
import { FilePath } from '@ionic-native/file-path/ngx';
import { finalize } from 'rxjs/operators'
import { WebView } from '@ionic-native/ionic-webview/ngx';

@Component({
  selector: 'app-modificar',
  templateUrl: './modificar.page.html',
  styleUrls: ['./modificar.page.scss'],
})
export class ModificarPage  {
buscarr;
  constructor(
    private http: HttpClient,
    private acti: ActivatedRoute,
    private menu: MenuController,
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
  todatos:any;
  api = 'https://ionicbd.000webhostapp.com/api.php';
  api2 = 'https://ionicbd.000webhostapp.com/api2.php';
  datos: any;
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
      message: "listado de usuarios",
    });
    await loading.present();
    this.http.post(this.api, JSON.stringify(lo)).pipe(finalize(() => { loading2.dismiss() })).subscribe(
      res => {
        console.log(res);
        this.todatos = res;
      }
    )
    if (this.tipousuario == "admi") {
      this.menu.enable(true, "admi");
    }
  }
  modificar(id){
    this.rou.navigate(["/modificarformulario",this.tipousuario,this.id,id])
  }

  openFirst() {
    if (this.tipousuario=="admi"){
      this.menu.enable(true, "admi2");
      this.menu.open("admi2");
    }
  }
  async buscar() {
    if (this.buscarr != "") {
      const loading = await this.loadingController.create({
        message: "cargando datos del usuario",
      });
      await loading.present();
      let buscar = {
        accion: "buscar",
        numero: this.buscarr
      }
      this.http.post(this.api2, JSON.stringify(buscar)).pipe(finalize(() => { loading.dismiss() })).subscribe(
        datos => {
          console.log(datos);
          this.todatos = datos;
        }
      )
    }
  }

  redirecionar(redirec) {
    if (redirec == "eliminar") {
      this.rou.navigate(["/list", this.tipousuario, this.id]);
    } else {
      if (redirec == "Registrar") {
        this.rou.navigate(["/home", this.tipousuario, this.id]);
      } else {
        if (redirec == "Modificar") {
          
        }else{
        this.rou.navigate([redirec]);
        }
      }
    }

  }

}
