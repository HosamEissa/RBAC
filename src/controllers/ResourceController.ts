import Resource from '../models/Resource';
import { Schema } from 'mongoose'
import ErrorHandler from '../models/ErrorHandler';
class ResourceController {
	async createResource(name: string) {
		return await Resource.create({ name })
	}
	async listResources() {
		const resources = await Resource.find({}, "name")
		return resources
	}
	async deleteResource(name: string) {
		const resource = await Resource.findOneAndRemove({ name })

		if (!resource) {
			throw new ErrorHandler(404, 'Not found resource');
		}

		return true
	}
}

export = new ResourceController();
