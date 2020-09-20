import { Component, OnInit, ViewChild } from '@angular/core';
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
  activeType = 0;
  passType = [
    {name: '常用', icon: 'icon-changyong1', color: '#C57132'},
    {name: '购物', icon: 'icon-gouwu', color: '#F3E334'},
    {name: '社交', icon: 'icon-13', color: 'rgb(34,131,246)'},
    {name: '学习', icon: 'icon-xuexi1', color: '#5AB273'},
    {name: '生活', icon: 'icon-shenghuo1', color: '#EF4815'},
    {name: '工作', icon: 'icon-gongzuo', color: '#25A6B0'},
  ];


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
    const sql = 'select * from password' + (this.activeType === 0 ? '' : ` where type = '${this.activeType}'`) +  ' order by times';
    this.qryMessage(sql).then((row: any) => {
      console.log('所有密码：', row);
      this.passList = row;
    });
  }

  // 选择密码类型，重新获取密码列表
  changePassType(index) {
    this.passList = [];
    this.activeType = index;
    this.searchPass();
  }

  // 跳转添加密码页
  jumpAddPass(){
    this.router.navigate(['/add']);
  }

  // 删除某个密码
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
      queryParams: {
        id
      }
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
