import { Model, DataTypes } from 'sequelize';
import { DbInstance } from '../context/DbContext';
import { Attributes } from '../commons/Helpers';
import { InnerDate } from '../models/InnerDate';

var _instance = new DbInstance().getInstance();

class Product extends Model {

	id!: number;
  status : number;
  name: string;
  code!: string;
  amount!: number;
  date!: any;
  validity!: Date;
  obs!: string;
  innerDate!: InnerDate;
  innerValidity!: InnerDate;

	constructor(json?: any) {
		super()
		if (json != undefined) {
			let _currentDate = new InnerDate().Now();
			console.log(json.date)
			console.log(_currentDate.FullDate);
			console.log(json);
			this.id = Attributes.ReturnIfValid(json.id);
      this.status = Attributes.ReturnIfValid(json.status);
      this.name = Attributes.ReturnIfValid(json.name);
      this.code = Attributes.ReturnIfValid(json.code);
			this.date = Attributes.ReturnIfValid(json.date, _currentDate.FullDate);
			this.amount = Attributes.ReturnIfValid(json.amount, 0);
      this.validity = Attributes.ReturnIfValid(json.validity);
      this.obs = Attributes.ReturnIfValid(json.obs);
		}
	}
}

Product.init({
	id: {
		type: new DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
	status: {
		type: new DataTypes.INTEGER
	},
	name: {
		type: new DataTypes.STRING(128),
		allowNull: false
	},
	code: {
		type: new DataTypes.STRING(12),
		allowNull: false
  },
  amount: {
		type: new DataTypes.INTEGER
  },
	date: {
		type: new DataTypes.DATEONLY
  },
  validity:{
    type: new DataTypes.DATEONLY
  },
  obs:{
    type: new DataTypes.STRING(255)
  }
}, {
	sequelize: _instance,
	tableName: 'Product',
	scopes: {
		public: {
			attributes: ['name', 'amount', 'date', 'validity']
		}
	}
});

Product.sync({force: false});

export { Product };