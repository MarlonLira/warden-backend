"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = require("sequelize");
const BillingCycle_1 = require("../models/BillingCycle");
const Http_1 = require("../commons/enums/Http");
const Http_2 = require("../commons/functions/Http");
const InnerDate_1 = require("../models/InnerDate");
class BillingCycleController extends BillingCycle_1.BillingCycle {
    Save(response) {
        return new Promise((resolve, reject) => {
            BillingCycle_1.BillingCycle.create({
                credit: this.credit,
                debit: this.debit,
                date: this.date
            }).then(result => {
                response.status(Http_1.HttpCode.Ok).send(Http_2.GetHttpMessage(Http_1.HttpCode.Ok, null, result));
                resolve(result);
            }).catch(error => {
                console.error(error.message);
                resolve(response.status(Http_1.HttpCode.Internal_Server_Error).send(Http_2.GetHttpMessage(Http_1.HttpCode.Internal_Server_Error)));
            });
        });
    }
    Search(response, isAll) {
        let date = new InnerDate_1.InnerDate().Now();
        let query = {};
        let _result = [];
        if (!isAll) {
            query.attributes = [
                [sequelize_1.Sequelize.fn('SUM', sequelize_1.Sequelize.col('credit')), 'credit'],
                [sequelize_1.Sequelize.fn('SUM', sequelize_1.Sequelize.col('debit')), 'debit']
            ];
            query.where = {
                date: {
                    [sequelize_2.Op.like]: `${date.Year}-${date.Month}%`
                }
            };
        }
        return new Promise((resolve, reject) => {
            BillingCycle_1.BillingCycle.findAll(query)
                .then(result => {
                if (result != null && result != undefined) {
                    result.forEach(found => {
                        found.setDataValue('innerDate', new InnerDate_1.InnerDate(found.date));
                        _result.push(found);
                    });
                    response.status(Http_1.HttpCode.Ok).send(_result);
                    resolve(_result);
                }
                else {
                    resolve(response.status(Http_1.HttpCode.Not_Found).send(Http_2.GetHttpMessage(Http_1.HttpCode.Not_Found)));
                }
                resolve(result);
            }).catch(error => {
                console.error(error);
                resolve(response.status(Http_1.HttpCode.Internal_Server_Error).send(Http_2.GetHttpMessage(Http_1.HttpCode.Internal_Server_Error)));
            });
        });
    }
    Update(response) {
        throw new Error("Method not implemented.");
    }
    Delete(response) {
        throw new Error("Method not implemented.");
    }
}
exports.default = BillingCycleController;
//# sourceMappingURL=BillingCycleController.js.map