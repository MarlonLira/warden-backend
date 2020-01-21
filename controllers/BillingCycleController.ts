import { Sequelize } from 'sequelize';
import { Op } from 'sequelize';

import IEntitie from '../interfaces/IEntitie';
import { BillingCycle } from '../models/BillingCycle';
import { HttpCode } from '../commons/enums/Http';
import { GetHttpMessage } from '../commons/functions/Http';
import { Attributes } from '../commons/Helpers';
import { InnerDate } from '../models/InnerDate';

export default class BillingCycleController extends BillingCycle implements IEntitie {
  Save(response?: any) {
    return new Promise((resolve, reject) => {
      BillingCycle.create({
        credit: this.credit,
        debit: this.debit,
        date: this.date
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
    let date = new InnerDate().Now();
    let query: any = {};
    let _result: any = [];

    if (!isAll) {
      query.attributes = [
        [Sequelize.fn('SUM', Sequelize.col('credit')), 'credit'],
        [Sequelize.fn('SUM', Sequelize.col('debit')), 'debit']
      ];
      query.where = {
        date: {
          [Op.like]: `${date.Year}-${date.Month}%`
        }
      }
    }

    return new Promise((resolve, reject) => {
      BillingCycle.findAll(query)
        .then(result => {
          if (result != null && result != undefined) {
            result.forEach(found => {
              found.setDataValue('innerDate', new InnerDate(found.date))
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