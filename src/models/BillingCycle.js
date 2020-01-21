"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const DbContext_1 = require("../context/DbContext");
const Helpers_1 = require("../commons/Helpers");
const InnerDate_1 = require("../models/InnerDate");
var _instance = new DbContext_1.DbInstance().getInstance();
class BillingCycle extends sequelize_1.Model {
    constructor(json) {
        super();
        this.id = Helpers_1.Attributes.ReturnIfValid(json.id);
        this.credit = Helpers_1.Attributes.ReturnIfValid(json.credit, 0) ? json.credit : 0;
        this.debit = Helpers_1.Attributes.ReturnIfValid(json.debit, 0);
        this.date = Helpers_1.Attributes.ReturnIfValid(json.date);
        this.innerDate = new InnerDate_1.InnerDate(Helpers_1.Attributes.ReturnIfValid(json.date));
    }
}
exports.BillingCycle = BillingCycle;
BillingCycle.init({
    id: {
        type: new sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    credit: {
        type: new sequelize_1.DataTypes.FLOAT
    },
    debit: {
        type: new sequelize_1.DataTypes.FLOAT
    },
    date: {
        type: new sequelize_1.DataTypes.STRING(10),
        allowNull: false
    }
}, {
    sequelize: _instance,
    tableName: 'billingCycle',
    scopes: {
        public: {
            attributes: ['credit', 'debit', 'date']
        },
        consolidated: {
            attributes: ['credit', 'debit']
        }
    }
});
BillingCycle.sync({ force: false });
//# sourceMappingURL=BillingCycle.js.map