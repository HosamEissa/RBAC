import mongoose, { Schema, Document, Types } from 'mongoose'


const ActionSchema: Schema = new Schema({
	resource: {
		// type: Schema.Types.ObjectId,
		// ref: "Resource",
		type: String,
		required: true
	},
	permission: {
		type: String,
		enum: ['get', 'put', 'delete', 'all'],
		default: 'get',
		required: true
	}
},
	{ '_id': false }
)
export enum PermissionEnum {
	get = "get",
	put = "put",
	delete = "delete",
	all = "all",
}

export interface Action {
	resource: String,
	// resource: Types.ObjectId,
	permission: PermissionEnum
}

const RoleSchema: Schema = new Schema({
	name: { type: String, required: true, unique: true },
	actions: [{
		type: ActionSchema
	}
	]
})

export interface IRole extends Document {
	name: string,
	actions: [
		Action
	]
}


export default mongoose.model<IRole>('Role', RoleSchema);
