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
      console.log(this.passDetail);
    });
  }

  copyUserName() {
    this.clipboard.copy(this.passDetail.username).then((res: any) => {
      this.msg.presentToast('密码已复制到剪切板');
    });
  }

  copyPass() {
    this.clipboard.copy(this.passDetail.password).then((res: any) => {
      this.msg.presentToast('密码已复制到剪切板');
    });
  }
}
