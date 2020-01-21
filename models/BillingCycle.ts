import { Model, DataTypes } from 'sequelize';
import { DbInstance } from '../context/DbContext';
import { Attributes } from '../commons/Helpers';
import { InnerDate } from '../models/InnerDate';

var _instance = new DbInstance().getInstance();

class BillingCycle extends Model {
  id!: number;
  credit!: number;
  debit!: number;
  date!: string;
  innerDate!: InnerDate;

  constructor(json?: any) {
    super();
    this.id = Attributes.ReturnIfValid(json.id);
    this.credit = Attributes.ReturnIfValid(json.credit, 0) ? json.credit : 0;
    this.debit = Attributes.ReturnIfValid(json.debit, 0);
    this.date = Attributes.ReturnIfValid(json.date);
    this.innerDate = new InnerDate(Attributes.ReturnIfValid(json.date));
  }
}

BillingCycle.init({
  id: {
    type: new DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  credit: {
    type: new DataTypes.FLOAT
  },
  debit: {
    type: new DataTypes.FLOAT
  },
  date: {
    type: new DataTypes.STRING(10),
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

export { BillingCycle }