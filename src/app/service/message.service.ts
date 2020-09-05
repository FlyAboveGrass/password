import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private toast;
  constructor(
    private toastCtrl: ToastController
  ) { }


  async presentToast(msg: string, duration?: number, position?: 'bottom'|'top') {
    this.toast = await this.toastCtrl.create({
      message: msg,
      duration: duration || 2000,
      position: position || 'bottom'
    });
    await this.toast.present();
  }
  hideToast() {
    if (this.toast) {
      return this.toast.dismiss();
    }
  }

}
