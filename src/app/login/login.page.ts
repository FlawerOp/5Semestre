import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ActionSheetController, ToastController, Platform, LoadingController } from '@ionic/angular';
import { finalize } from 'rxjs/operators'


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  dat={
    accion:"logerar"
  };
  datos:any
  api = 'https://ionicbd.000webhostapp.com/api.php'
  constructor(private http: HttpClient, private Router: Router, private actionSheetController: ActionSheetController, private toastController: ToastController,
    private loadingController: LoadingController) { }

  ngOnInit() {
  }

  async login(){
    const loading = await this.loadingController.create({
      message: "verificando informacion",
    });
    await loading.present();
    this.http.post(this.api, JSON.stringify(this.dat)).pipe(finalize(() => { loading.dismiss() })).subscribe(
      datos => {
        this.datos=datos
        if (this.datos.tipous == "admi" || this.datos.tipous == "estudiante"){
          this.Router.navigate(["/home/", this.datos.tipous,this.datos.id]);
        }else{
            this.presentToast("infromacion incorrecta");
        }
        
      }
    )
  }
  async presentToast(text) {
    const toast = await this.toastController.create({
      message: text,
      position: 'bottom',
      duration: 4000
    });
    toast.present();
  }
}
