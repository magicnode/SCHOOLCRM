/*
 * Module description: 用户user与permission 关系
 */
import mongoose from 'mongoose'

const Schema = mongoose.Schema
const userPermissionSchema = new Schema({
	  user: {type: Schema.Types.ObjectId, ref: 'User'},
	  permission: [{type: Schema.Types.ObjectId, ref: 'Permission'}],
    CreateAt: { type: Number, default: new Date().getTime() }
})

userPermissionSchema.statics = {

}

export default mongoose.model('UserPermission', userPermissionSchema, 'user_permission')
