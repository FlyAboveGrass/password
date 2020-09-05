import { Component, OnInit } from '@angular/core';
import { DbService } from 'src/app/service/db.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

  private name = '';
  private password = '';
  private password2 = '';
  // 1.普通密码
  // 2.购物类
  // 3.社交类
  // 4.学习类
  // 5.生活类
  // 6.工作类
  private type = 1;
  constructor(
      private  db: DbService
  ) { }

  ngOnInit() {
  }
  submitPass(){
    console.log('ready submit');
    if (this.password === '') {
      console.log('密码不能为空');
    }
    if (this.password.length < 8){
      console.log('密码的长度不得少于8位');
    }
    if (this.password !== this.password2){
      console.log('两次密码不一致，请重新确认');
      this.password = '';
      this.password2 = '';
      return ;
    }
    const operation = `insert into password(id,name,password,type) values(
                          ${Date.now().toString()}, ${this.name}, ${this.password}, ${this.type}
                    )`;
    this.db.executeSql(operation).then(rs => {
      console.log('保存消息: 执行sql成功,name--pass', this.name, this.password);
    }).catch(e => {
      console.log('保存消息: 执行sql失败');
      throw e;
    });
  }

}
