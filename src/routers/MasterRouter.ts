import { Router } from 'express';
import bodyParser from 'body-parser'
import RoleRouter from './Role/RoleRouter'
import ResourceRouter from './Resource/ResourceRouter';

class MasterRouter {
	private _router = Router();
	private _resourceRouter = ResourceRouter;
	private _roleRouter = RoleRouter;
	get router() {
		return this._router;
	}

	constructor() {
		this._configure();
	}

	/**
	 * Connect routes to their matching routers.
	 */
	private _configure() {
		this._router.use(bodyParser.json());
		this._router.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

		this._router.use('/resource', this._resourceRouter);
		this._router.use('/role', this._roleRouter);
	}
}

export = new MasterRouter().router;
