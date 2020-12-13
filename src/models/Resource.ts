import mongoose, { Schema, Document } from 'mongoose'

const ResourceSchema: Schema = new Schema({
	name: { type: String, required: true, unique: true },

})
export interface IResources extends Document {
	name: string,
}


export default mongoose.model<IResources>('Resource', ResourceSchema);
