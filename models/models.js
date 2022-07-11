const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const User = sequelize.define("user", {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	name: { type: DataTypes.STRING, require: true, validate: { min: 3 } },
	email: {
		type: DataTypes.STRING,
		unique: true,
		validate: { isEmail: true, min: 3 },
	},
	phone: { type: DataTypes.STRING, defaultValue: "" },
	password: { type: DataTypes.STRING, validate: { min: 4 } },
	role: {
		type: DataTypes.STRING,
		defaultValue: "USER",
	},
});

const Basket = sequelize.define("basket", {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const BasketProduct = sequelize.define("basket_product", {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const Product = sequelize.define("product", {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	name: { type: DataTypes.STRING, allowNull: false },
	price: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
	weight: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
	img: { type: DataTypes.STRING, allowNull: false, defaultValue: "" },
	productCategory: {
		type: DataTypes.STRING,
		allowNull: false,
		defaultValue: "",
	},
	productType: { type: DataTypes.STRING, allowNull: false, defaultValue: "" },
	composition: {
		type: DataTypes.ARRAY(DataTypes.STRING),
		allowNull: false,
		defaultValue: [],
	},
	config: {
		type: DataTypes.JSON(DataTypes.STRING),
		allowNull: true,
		defaultValue: {},
	},
	additions: {
		type: DataTypes.ARRAY(DataTypes.JSON),
		allowNull: false,
		defaultValue: [],
	},
});
const ProductP = sequelize.define("productP", {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	name: { type: DataTypes.STRING, allowNull: false },
	price: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
	weight: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
	img: { type: DataTypes.STRING, allowNull: false, defaultValue: "" },
	productCategory: {
		type: DataTypes.STRING,
		allowNull: false,
		defaultValue: "",
	},
	productType: { type: DataTypes.STRING, allowNull: false, defaultValue: "" },
	composition: {
		type: DataTypes.ARRAY(DataTypes.STRING),
		allowNull: false,
		defaultValue: [],
	},
	config: {
		type: DataTypes.JSON(DataTypes.STRING),
		allowNull: true,
		defaultValue: {},
	},
	additions: {
		type: DataTypes.ARRAY(DataTypes.JSON),
		allowNull: false,
		defaultValue: [],
	},
});
const Type = sequelize.define("type", {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	name: { type: DataTypes.STRING, unique: true, allowNull: false },
});
const Category = sequelize.define("category", {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	name: { type: DataTypes.STRING, unique: true, allowNull: false },
});

const About = sequelize.define("about", {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	title: { type: DataTypes.TEXT, allowNull: false, defaultValue: "" },
	subtitle: { type: DataTypes.TEXT, allowNull: false, defaultValue: "" },
	text1: { type: DataTypes.TEXT, allowNull: false, defaultValue: "" },
	text2: { type: DataTypes.TEXT, allowNull: false, defaultValue: "" },
	img1: { type: DataTypes.STRING, allowNull: false, defaultValue: "" },
	img2: { type: DataTypes.STRING, allowNull: false, defaultValue: "" },
	img3: { type: DataTypes.STRING, allowNull: false, defaultValue: "" },
});
const Contacts = sequelize.define("contacts", {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	phone1: { type: DataTypes.STRING, allowNull: false, defaultValue: "" },
	phone2: { type: DataTypes.STRING, allowNull: false, defaultValue: "" },
	facebook: { type: DataTypes.STRING, allowNull: false, defaultValue: "" },
	map: { type: DataTypes.STRING, allowNull: false, defaultValue: "" },
	adress: {
		type: DataTypes.ARRAY(DataTypes.JSON),
		allowNull: false,
		defaultValue: [],
	},
	email: { type: DataTypes.STRING, allowNull: false, defaultValue: "" },
	img: { type: DataTypes.STRING, allowNull: false, defaultValue: "" },
	text_delivery: {
		type: DataTypes.STRING,
		allowNull: false,
		defaultValue: "",
	},
});
const Actions = sequelize.define("actions", {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	title: { type: DataTypes.STRING, allowNull: false, defaultValue: "" },
	img: { type: DataTypes.STRING, allowNull: false, defaultValue: "" },
	text: { type: DataTypes.TEXT, allowNull: false, defaultValue: "" },
});
const Promocodes = sequelize.define("promocodes", {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	title: { type: DataTypes.STRING, allowNull: false, defaultValue: "" },
	promo: { type: DataTypes.STRING, allowNull: false, defaultValue: "" },
	count: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
});

const Banner = sequelize.define("banner", {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	title: { type: DataTypes.STRING, allowNull: false, defaultValue: "" },
	img: { type: DataTypes.STRING, allowNull: false, defaultValue: "" },
	link: { type: DataTypes.STRING, allowNull: false, defaultValue: "" },
});

User.hasOne(Basket);
Basket.belongsTo(User);

Basket.hasMany(BasketProduct);
BasketProduct.belongsTo(Basket);

Category.hasMany(Product);
Product.belongsTo(Category);

Type.hasMany(Product);
Product.belongsTo(Type);

Type.hasMany(Category);
Category.belongsTo(Type);

Product.hasMany(BasketProduct);
BasketProduct.belongsTo(Product);

module.exports = {
	User,
	Basket,
	BasketProduct,
	Product,
	Type,
	ProductP,
	Category,
	About,
	Contacts,
	Actions,
	Promocodes,
	Banner,
};
