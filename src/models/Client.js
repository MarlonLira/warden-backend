"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const DbContext_1 = require("../context/DbContext");
var _instance = new DbContext_1.DbInstance().getInstance();
class Client extends sequelize_1.Model {
    constructor(json) {
        super();
        if (json != undefined) {
            this.id = json.id;
            this.firstName = json.firstName;
            this.lastName = json.lastName;
            this.status = json.status;
            this.registryCode = json.registryCode;
            this.phone = json.phone;
        }
    }
}
exports.Client = Client;
Client.init({
    id: {
        type: new sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    status: {
        type: new sequelize_1.DataTypes.INTEGER
    },
    firstName: {
        type: new sequelize_1.DataTypes.STRING(128),
        allowNull: false
    },
    lastName: {
        type: new sequelize_1.DataTypes.STRING(128),
        allowNull: false
    },
    registryCode: {
        type: new sequelize_1.DataTypes.STRING(12),
        allowNull: false
    },
    phone: {
        type: new sequelize_1.DataTypes.STRING(12)
    }
}, {
    sequelize: _instance,
    tableName: 'Client',
    scopes: {
        public: {
            attributes: ['id', 'firstName', 'lastName', 'phone', 'registryCode']
        }
    }
});
Client.sync({ force: false });
//# sourceMappingURL=Client.js.map