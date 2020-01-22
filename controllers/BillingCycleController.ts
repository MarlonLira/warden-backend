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
        response.status(HttpCode.Ok).send(GetHttpMessage(HttpCode.Ok, `${BillingCycle.name} cadastrado`, result));
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
		return new Promise((resolve, reject) => {
			let attributes: any = {}

			BillingCycle.findOne({
				where: {
					id: this.id
				}
			}).then(result => {
				attributes.credit = Attributes.ReturnIfValid(this.credit, result.credit);
				attributes.debit = Attributes.ReturnIfValid(this.debit, result.debit);
				attributes.date = Attributes.ReturnIfValid(this.date, result.date);

				BillingCycle.update(attributes, {
					where: {
						id: this.id
					}
				})
					.then(result => {
						response.status(HttpCode.Ok).send(GetHttpMessage(HttpCode.Ok, `${BillingCycle.name} atualizado`, result));
						resolve(result);
					})
					.catch(error => {
						resolve(response.status(HttpCode.Internal_Server_Error).send(GetHttpMessage(HttpCode.Internal_Server_Error, null, error)));
					})
			})
				.catch(error => {
					resolve(response.status(HttpCode.Not_Found).send(GetHttpMessage(HttpCode.Not_Found, `${BillingCycle.name} não encontrado`, error)));
				})
		})
	}
  Delete(response?: any) {
		return new Promise((resolve, reject) => {
			BillingCycle.destroy({
				where: {
					id: this.id
				}
			}).then(result => {
				if (result == 1) {
					response.status(HttpCode.Ok).send(GetHttpMessage(HttpCode.Ok, `${BillingCycle.name} apagado`, result));
				} else {
					resolve(response.status(HttpCode.Not_Found).send(GetHttpMessage(HttpCode.Not_Found, `${BillingCycle.name} não encontrado`, result)));
				}
				resolve(result);
			})
				.catch(error => {
					resolve(response.status(HttpCode.Internal_Server_Error).send(GetHttpMessage(HttpCode.Internal_Server_Error, null, error)));
				})
		})
	}
}