import { Component, OnInit } from '@angular/core';
import { DbService } from 'src/app/service/db.service';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/service/message.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

  private type = 1;
  private name = '';
  private password = '';
  private password2 = '';
  // 1.普通密码
  // 2.购物类
  // 3.社交类
  // 4.学习类
  // 5.生活类
  // 6.工作类

  constructor(
      private  db: DbService,
      private router: Router,
      private msg: MessageService
  ) { }

  ngOnInit() {
  }
  submitPass(){
    console.log('ready submit');
    if (this.password === '') {
      console.log('密码不能为空');
      return ;
    }
    if (this.password.length < 8){
      console.log('密码的长度不得少于8位');
      return ;
    }
    if (this.password !== this.password2){
      console.log('两次密码不一致，请重新确认');
      this.password = '';
      this.password2 = '';
      return ;
    }
    const operation = `insert into password(id,name,password,type) values(
                          ${Date.now().toString()}, '${this.name}', '${this.password}', '${this.type}'
                    )`;
    this.db.executeSql(operation).then(rs => {
      console.log('保存消息: 执行sql成功,name--pass', this.name, this.password);
      this.msg.presentToast('密码保存成功');
      this.router.navigate(['/main']);
    }).catch(e => {
      this.msg.presentToast('密码保存失败');
      throw e;
    });
  }

}
