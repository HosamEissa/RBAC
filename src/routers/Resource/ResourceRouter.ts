import { NextFunction, Request, Response, Router } from 'express';
import ResourceController from '../../controllers/ResourceController';

class ResourceRouter {
	private _router = Router();
	private _controller = ResourceController;

	get router() {
		return this._router;
	}

	constructor() {
		this._configure();
	}

	/**
	 * Connect routes to their matching controller endpoints.
	 */
	private _configure() {
		this._router.get('/', async (req: Request, res: Response, next: NextFunction) => {
			try {
				const resources = await this._controller.listResources();
				return res.status(200).json(resources);
			}
			catch (error) {
				next(error);
			}
		});

		this._router.post('/', async (req: Request, res: Response, next: NextFunction) => {
			try {
				const recourse = await this._controller.createResource(req.body.name);
				res.status(200).json(recourse);
			}
			catch (error) {
				next(error);
			}
		});
		this._router.delete('/', async (req: Request, res: Response, next: NextFunction) => {
			try {
				const recourse = await this._controller.deleteResource(req.body.name);
				res.status(200).json(recourse);
			}
			catch (error) {
				next(error);
			}
		});
	}
}

export = new ResourceRouter().router;
