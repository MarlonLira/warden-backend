"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const DbContext_1 = require("../context/DbContext");
var _instance = new DbContext_1.DbInstance().getInstance();
class BillingCycles extends sequelize_1.Model {
    constructor(json) {
        super();
        if (json != undefined) {
            this.id = json.id;
            this.credit = json.credit;
            this.debit = json.debit;
        }
    }
}
exports.BillingCycles = BillingCycles;
BillingCycles.init({
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
    }
}, {
    sequelize: _instance,
    tableName: 'billingCycles'
});
BillingCycles.sync({ force: false });
//# sourceMappingURL=BillingCycles.js.map