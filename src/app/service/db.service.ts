import { Injectable } from '@angular/core';
import {SQLite, SQLiteObject} from '@ionic-native/sqlite/ngx';


@Injectable({
  providedIn: 'root'
})
export class DbService {

  private db: SQLiteObject = null;

  private dbname = 'password.db';

  private environment = 'qinwanping';

  constructor(private sqlite: SQLite) {
  }

  /**
   * 创建和打开数据库
   * 同时会创建不存在的表
   * @param name 用户loginid||userid
   */
  initDB(name) {
    this.dbname = name + '.' + this.environment;
  }

  /**
   * 关闭数据，用户注销时使用
   */
  closeDB(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this.db) {
        this.db.close().then(() => {
          this.db = null;
          this.dbname = 'password.db';
          console.log('关闭数据库成功');
          resolve();
        }).catch(e => {
          console.log(e);
          console.log('关闭数据失败');
          this.db = null;
          this.dbname = 'password.db';
          reject(e);
        });
      } else {
        resolve();
      }
    });
  }

  /**
   * 获取数据库
   */
  getDB(): Promise<SQLiteObject> {
    return new Promise((resolve, reject) => {
      if (this.db) {
        resolve(this.db);
      } else {
        this.sqlite.create({
          name: this.dbname,
          location: 'default'
        }).then((db: SQLiteObject) => {
          this.db = db;

          // 同时创建表
          db.executeSql(
              `create table if not exists password (
                id primary key,
                name,
                username,
                password,
                times,
                type)`, null
          ).then(() => {
            console.log('[password] 表创建成功');
            resolve(this.db);
          }, error => {
            console.log('[password] 表创建失败');
            reject(error);
          }).catch((e) => {
            console.log(e);
            console.log('[password] 表创建失败');
            throw e;
          });
        }).catch(e => {
          alert('数据文件打开或创建失败\n请检查应用是否具有写入的权限');
          throw e;
        });
      }
    });
  }

  executeSql(sql) {
    return new Promise((resolve, reject) => {
      this.getDB().then((db: SQLiteObject) => {
        db.executeSql(sql, []).then((res) => {
          const rows = [];
          for (let index = 0; index < res.rows.length; index++) {
            rows.push(res.rows.item(index));
          }
          resolve(rows);
        }).catch(e => {
          console.log(e);
          throw e;
        });
      });
    });
  }

}
