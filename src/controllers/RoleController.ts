import Role, { Action } from '../models/Role';
import ErrorHandler from '../models/ErrorHandler';
import { Types } from 'mongoose';
class RoleController {
	async createRole(name: string, actions: Action[] = []) {

		return await Role.create({ name, actions })
	}
	async listRoles() {
		const roles = await Role.find({}, "name")
		return roles
	}
	async getRole(id: Types.ObjectId) {
		const role = await Role.findById(id, "name actions")
		if (!role) {
			throw new ErrorHandler(404, 'Not found role');
		}
		return role
	}
	async deleteRole(name: string) {
		const role = await Role.findOneAndRemove({ name })

		if (!role) {
			throw new ErrorHandler(404, 'Not found role');
		}

		return true
	}
}

export = new RoleController();
