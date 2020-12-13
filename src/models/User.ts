import mongoose, { Schema, Document, Types } from 'mongoose'

const UserSchema: Schema = new Schema({
	name: { type: String, required: true, unique: true },
	roles: [{
		type: Schema.Types.ObjectId,
		ref: "Role"
	}]

})
export interface IUser extends Document {
	name: string,
	roles: Types.ObjectId[]
}


export default mongoose.model<IUser>('User', UserSchema);
