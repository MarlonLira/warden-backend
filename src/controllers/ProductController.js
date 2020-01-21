"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Product_1 = require("../models/Product");
const Http_1 = require("../commons/enums/Http");
const Http_2 = require("../commons/functions/Http");
const InnerDate_1 = require("../models/InnerDate");
class ProductController extends Product_1.Product {
    Save(response) {
        console.log(this);
        return new Promise((resolve, reject) => {
            Product_1.Product.create({
                name: this.name,
                status: 1,
                code: this.code,
                amount: this.amount,
                date: this.date,
                validity: this.validity,
                obs: this.obs
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
        let _result = [];
        return new Promise((resolve, reject) => {
            Product_1.Product.findAll()
                .then(result => {
                if (result != null && result != undefined) {
                    result.forEach(found => {
                        found.setDataValue('innerDate', new InnerDate_1.InnerDate(found.date));
                        found.setDataValue('innerValidity', new InnerDate_1.InnerDate(found.validity));
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
exports.default = ProductController;
//# sourceMappingURL=ProductController.js.map