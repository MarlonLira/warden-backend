"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const DbContext_1 = require("../context/DbContext");
const Helpers_1 = require("../commons/Helpers");
const InnerDate_1 = require("../models/InnerDate");
var _instance = new DbContext_1.DbInstance().getInstance();
class Product extends sequelize_1.Model {
    constructor(json) {
        super();
        if (json != undefined) {
            let _currentDate = new InnerDate_1.InnerDate().Now();
            this.id = Helpers_1.Attributes.ReturnIfValid(json.id);
            this.status = Helpers_1.Attributes.ReturnIfValid(json.status);
            this.name = Helpers_1.Attributes.ReturnIfValid(json.name);
            this.code = Helpers_1.Attributes.ReturnIfValid(json.code);
            this.date = Helpers_1.Attributes.ReturnIfValid(json.date, _currentDate.FullDate);
            this.amount = Helpers_1.Attributes.ReturnIfValid(json.amount, 0);
            this.validity = Helpers_1.Attributes.ReturnIfValid(json.validity);
            this.obs = Helpers_1.Attributes.ReturnIfValid(json.obs);
        }
    }
}
exports.Product = Product;
Product.init({
    id: {
        type: new sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    status: {
        type: new sequelize_1.DataTypes.INTEGER
    },
    name: {
        type: new sequelize_1.DataTypes.STRING(30),
        allowNull: false
    },
    code: {
        type: new sequelize_1.DataTypes.STRING(12),
    },
    amount: {
        type: new sequelize_1.DataTypes.INTEGER
    },
    date: {
        type: new sequelize_1.DataTypes.DATEONLY
    },
    validity: {
        type: new sequelize_1.DataTypes.DATEONLY
    },
    obs: {
        type: new sequelize_1.DataTypes.STRING(20)
    }
}, {
    sequelize: _instance,
    tableName: 'Product',
    scopes: {
        public: {
            attributes: ['name', 'code', 'amount', 'date', 'validity', 'obs']
        }
    }
});
Product.sync({ force: false });
//# sourceMappingURL=Product.js.map