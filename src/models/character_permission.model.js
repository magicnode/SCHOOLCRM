/*
 * Module description: character 角色 权限permission 关系
 */

import mongoose from 'mongoose'

const Schema = mongoose.Schema
const characterPermissionSchema = new Schema({
	  character: {type: Schema.Types.ObjectId, ref: 'Character'},
	  permission: {type: Schema.Types.ObjectId, ref: 'Permission'},
    CreateAt: { type: Number, default: new Date().getTime() }
})

characterPermissionSchema.statics = {

}

export default mongoose.model('CharacterPermission', characterPermissionSchema, 'character_permission');