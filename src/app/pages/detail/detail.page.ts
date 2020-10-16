import { Component, OnInit, ApplicationRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DbService } from 'src/app/service/db.service';
import { Clipboard } from '@ionic-native/clipboard/ngx';
import { MessageService } from 'src/app/service/message.service';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  passDetail: any = null;
  public message = [
    '山重水复疑无路，柳暗花明又一村',
    '应用虽好，可不要贪玩哦',
    '你的密码，由我来守护！',
    '无限接近死亡，更能体会生存的真谛',
    '可可爱爱，没有脑袋',
    '主人的密码，外人可不要乱看才是呢',
    '行走江湖多年，凭的便是这张不输世子殿下的脸'
  ];
  public msgPresent = this.message[0];

  @ViewChild('username', {static: true}) username;
  @ViewChild('password', {static: true}) password;
  constructor(
    private route: ActivatedRoute,
    private db: DbService,
    private clipboard: Clipboard,
    private msg: MessageService
  ) { }

  ngOnInit() {
    this.queryPass(this.route.snapshot.queryParams.id);
  }

  queryPass(id) {
    const sql = `select * from password where id = ${id}`;
    this.db.executeSql(sql).then((res: any) => {
      this.passDetail = res[0];
      this.msgPresent = this.message[res[0].times];
      this.changeTimes(id, res[0].times + 1);
      console.log(this.passDetail, this.msgPresent);
    });
  }

  changeTimes(id, time){
    if (time === this.message.length) {
      time = 0;
    }
    const sql = `UPDATE password SET times=${time} WHERE id=${id}`;
    this.db.executeSql(sql).then((res: any) => {
      console.log('更新访问次数成功');
    });
  }

  copyUserName() {
    this.clipboard.copy(this.passDetail.username).then((res: any) => {
      this.msg.presentToast('用户名/账号已复制到剪切板');
    });
  }

  copyPass() {
    this.clipboard.copy(this.passDetail.password).then((res: any) => {
      this.msg.presentToast('密码已复制到剪切板');
    });
  }
}
