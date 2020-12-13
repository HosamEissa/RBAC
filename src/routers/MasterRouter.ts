import { Router } from 'express';
import bodyParser from 'body-parser'
import ResourceRouter from './Resource/ResourceRouter';

class MasterRouter {
	private _router = Router();
	private _resourceRouter = ResourceRouter;
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
	}
}

export = new MasterRouter().router;
