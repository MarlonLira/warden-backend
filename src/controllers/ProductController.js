"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Product_1 = require("../models/Product");
const Http_1 = require("../commons/enums/Http");
const Http_2 = require("../commons/functions/Http");
const InnerDate_1 = require("../models/InnerDate");
const Helpers_1 = require("../commons/Helpers");
class ProductController extends Product_1.Product {
    Save(response) {
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
                response.status(Http_1.HttpCode.Ok).send(Http_2.GetHttpMessage(Http_1.HttpCode.Ok, Product_1.Product, result));
                resolve(result);
            }).catch(error => {
                console.error(error.message);
                resolve(response.status(Http_1.HttpCode.Internal_Server_Error).send(Http_2.GetHttpMessage(Http_1.HttpCode.Internal_Server_Error, Product_1.Product, error)));
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
                    resolve(response.status(Http_1.HttpCode.Not_Found).send(Http_2.GetHttpMessage(Http_1.HttpCode.Not_Found, Product_1.Product)));
                }
                resolve(result);
            }).catch(error => {
                console.error(error);
                resolve(response.status(Http_1.HttpCode.Internal_Server_Error).send(Http_2.GetHttpMessage(Http_1.HttpCode.Internal_Server_Error, Product_1.Product, error)));
            });
        });
    }
    Update(response) {
        return new Promise((resolve, reject) => {
            let attributes = {};
            Product_1.Product.findOne({
                where: {
                    id: this.id
                }
            }).then(result => {
                attributes.name = Helpers_1.Attributes.ReturnIfValid(this.name, result.name);
                attributes.amount = Helpers_1.Attributes.ReturnIfValid(this.amount, result.amount);
                attributes.code = Helpers_1.Attributes.ReturnIfValid(this.code, result.code);
                attributes.date = Helpers_1.Attributes.ReturnIfValid(this.date, result.date);
                attributes.validity = Helpers_1.Attributes.ReturnIfValid(this.validity, result.validity);
                attributes.obs = Helpers_1.Attributes.ReturnIfValid(this.obs, result.obs);
                Product_1.Product.update(attributes, {
                    where: {
                        id: this.id
                    }
                })
                    .then(result => {
                    response.status(Http_1.HttpCode.Ok).send(Http_2.GetHttpMessage(Http_1.HttpCode.Ok, Product_1.Product, result));
                    resolve(result);
                })
                    .catch(error => {
                    resolve(response.status(Http_1.HttpCode.Internal_Server_Error).send(Http_2.GetHttpMessage(Http_1.HttpCode.Internal_Server_Error, Product_1.Product, error)));
                });
            })
                .catch(error => {
                resolve(response.status(Http_1.HttpCode.Not_Found).send(Http_2.GetHttpMessage(Http_1.HttpCode.Not_Found, Product_1.Product, error)));
            });
        });
    }
    Delete(response) {
        return new Promise((resolve, reject) => {
            Product_1.Product.destroy({
                where: {
                    id: this.id
                }
            }).then(result => {
                if (result == 1) {
                    response.status(Http_1.HttpCode.Ok).send(Http_2.GetHttpMessage(Http_1.HttpCode.Ok, Product_1.Product, result));
                }
                else {
                    resolve(response.status(Http_1.HttpCode.Not_Found).send(Http_2.GetHttpMessage(Http_1.HttpCode.Not_Found, Product_1.Product, result)));
                }
                resolve(result);
            })
                .catch(error => {
                resolve(response.status(Http_1.HttpCode.Internal_Server_Error).send(Http_2.GetHttpMessage(Http_1.HttpCode.Internal_Server_Error, Product_1.Product, error)));
            });
        });
    }
}
exports.default = ProductController;
//# sourceMappingURL=ProductController.js.map