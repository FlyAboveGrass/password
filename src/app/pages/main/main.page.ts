import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DbService } from 'src/app/service/db.service';
import { MessageService } from 'src/app/service/message.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  passList: Array<any> ;
  constructor(
    private  router: Router,
    private dbService: DbService,
    private msg: MessageService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.searchPass();
  }

  searchPass() {
    const sql = 'select * from password';
    this.qryMessage(sql).then((row: any) => {
      console.log('所有密码：', row);
      this.passList = row;
    });
  }


  jumpAddPass(){
    this.router.navigate(['/add']);
  }

  deletePass(id) {
    const delSql = `delete from password where id = ${id}`;
    this.qryMessage(delSql).then((res) => {
      this.msg.presentToast('删除成功');
      this.searchPass();
    }, (err) => {
      this.msg.presentToast('删除失败');
    });
  }

  // 展示密码详细
  showPassDetail(id) {
    this.router.navigate(['/detail'], {
      queryParams: id
    });
  }

  // 根据条件查询所有密码
  qryMessage(sql): Promise<any> {
    return new Promise((resolve, reject) => {
      this.dbService.executeSql(sql).then((row) => {
        console.log(`消息查询[${sql}]成功`);
        resolve(row);
      }, (err) => {
        console.log(`消息查询[${sql}]失败`);
        console.log(err);
      });
    });
  }
}
