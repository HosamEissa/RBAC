import { Types } from 'mongoose';
import ErrorHandler from '../models/ErrorHandler';
import Role, { PermissionEnum, Action } from '../models/Role';
import User from '../models/User';

class UserController {
	async createUser(name: string) {
		return await User.create({ name, roles: [] })
	}
	async addRole(userId: Types.ObjectId, roleId: Types.ObjectId) {
		const user = await User.findById(userId, "name")
		if (!user) {
			throw new ErrorHandler(404, 'Not found user');
		}
		const role = await Role.findById(roleId)
		if (!role) {
			throw new ErrorHandler(404, 'Not found role');
		}
		if (!user.roles) {
			user.roles = []
		}
		user.roles.push(roleId)
		await user.save()
		return true
	}

	async getUser(id: Types.ObjectId) {
		const user = await User.findById(id, "name").populate("roles", "name -_id").exec()
		if (!user) {
			throw new ErrorHandler(404, 'Not found role');
		}
		return user
	}
	async listUsers() {
		const u = await User.find()
		return u
	}
	async isAllowed(id: Types.ObjectId, resource: string, permission: PermissionEnum) {
		let action: any
		const user = await User
			.findById(id, "name")
			.populate({
				path: 'roles',
				match: {
					actions: action
				}
			})
		if (!user) {
			throw new ErrorHandler(404, 'Not found user');
		}
		if (user.roles && user.roles.length) {
			return true
		}
		return false
	}
}

export = new UserController();
