import { NextFunction, Request, Response, Router } from 'express';
import { Types } from 'mongoose';
import RoleController from '../../controllers/RoleController';

class RoleRouter {
	private _router = Router();
	private _controller = RoleController;

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
				const roles = await this._controller.listRoles();
				return res.status(200).json(roles);
			}
			catch (error) {
				next(error);
			}
		});

		this._router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
			try {
				const id = Types.ObjectId(req.params.id)
				const role = await this._controller.getRole(id);
				return res.status(200).json(role);
			}
			catch (error) {
				next(error);
			}
		});

		this._router.put('/:id/addActions', async (req: Request, res: Response, next: NextFunction) => {
			try {
				const id = Types.ObjectId(req.params.id)
				const role = await this._controller.getRole(id);
				return res.status(200).json(role);
			}
			catch (error) {
				next(error);
			}
		});


		this._router.post('/', async (req: Request, res: Response, next: NextFunction) => {
			try {
				const actions = req.body.actions
				const recourse = await this._controller.createRole(req.body.name, actions);
				res.status(200).json(recourse);
			}
			catch (error) {
				next(error);
			}
		});
		this._router.delete('/', async (req: Request, res: Response, next: NextFunction) => {
			try {
				const recourse = await this._controller.deleteRole(req.body.name);
				res.status(200).json(recourse);
			}
			catch (error) {
				next(error);
			}
		});
	}
}

export = new RoleRouter().router;
