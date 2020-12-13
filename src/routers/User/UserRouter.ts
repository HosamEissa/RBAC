import { NextFunction, Request, Response, Router } from 'express';
import { Types } from 'mongoose';
import UserController from '../../controllers/UserController';

class UserRouter {
	private _router = Router();
	private _controller = UserController;

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
				const user = await this._controller.listUsers();
				return res.status(200).json(user);
			}
			catch (error) {
				next(error);
			}
		});

		this._router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
			try {
				const id = Types.ObjectId(req.params.id)
				const role = await this._controller.getUser(id);
				return res.status(200).json(role);
			}
			catch (error) {
				next(error);
			}
		});
		this._router.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
			try {
				const id = Types.ObjectId(req.params.id)
				const roleId = Types.ObjectId(req.body.roleId)
				const role = await this._controller.addRole(id, roleId);
				return res.status(200).json(role);
			}
			catch (error) {
				next(error);
			}
		});

		this._router.post('/', async (req: Request, res: Response, next: NextFunction) => {
			try {
				const user = await this._controller.createUser(req.body.name);
				res.status(200).json(user);
			}
			catch (error) {
				next(error);
			}
		});
		this._router.post('/isAllowed', async (req: Request, res: Response, next: NextFunction) => {
			try {
				const resource = req.body.resource
				const permission = req.body.permission
				const userId = req.body.userId
				const isAllowed = await this._controller.isAllowed(userId, resource, permission);
				res.status(200).json(isAllowed);
			}
			catch (error) {
				next(error);
			}
		});
	}
}

export = new UserRouter().router;
