import { Sequelize } from 'sequelize';
import { Op } from 'sequelize';

import IEntitie from '../interfaces/IEntitie';
import { Product } from '../models/Product';
import { HttpCode } from '../commons/enums/Http';
import { GetHttpMessage } from '../commons/functions/Http';
import { InnerDate } from '../models/InnerDate';

export default class ProductController extends Product implements IEntitie {
  Save(response?: any) {
    console.log(this);
    return new Promise((resolve, reject) => {
      Product.create({
        name: this.name,
        status: 1,
        code: this.code,
        amount: this.amount,
        date: this.date,
        validity: this.validity,
        obs: this.obs
      }).then(result => {
        response.status(HttpCode.Ok).send(GetHttpMessage(HttpCode.Ok, null, result));
        resolve(result);
      }).catch(error => {
        console.error(error.message);
        resolve(response.status(HttpCode.Internal_Server_Error).send(GetHttpMessage(HttpCode.Internal_Server_Error)));
      })
    })
  }

  Search(response?: any, isAll?: boolean) {
    let _result: any = [];
    return new Promise((resolve, reject) => {
      Product.findAll()
        .then(result => {
          if (result != null && result != undefined) {
            result.forEach(found => {
              found.setDataValue('innerDate', new InnerDate(found.date));
              found.setDataValue('innerValidity', new InnerDate(found.validity));
              _result.push(found);
            })
            response.status(HttpCode.Ok).send(_result);
            resolve(_result);
          }
          else {
            resolve(response.status(HttpCode.Not_Found).send(GetHttpMessage(HttpCode.Not_Found)));
          }
          resolve(result);
        }).catch(error => {
          console.error(error)
          resolve(response.status(HttpCode.Internal_Server_Error).send(GetHttpMessage(HttpCode.Internal_Server_Error)));
        });
    })
  }
  Update(response?: any) {
    throw new Error("Method not implemented.");
  }
  Delete(response?: any) {
    throw new Error("Method not implemented.");
  }
}