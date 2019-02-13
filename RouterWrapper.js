let Routes = require('./routes/index');

let RouterWrapper = class {
	constructor(middleware) {
		this.routes = new Routes(middleware);
		this.router = this.routes.router;
	}
};

module.exports = RouterWrapper;