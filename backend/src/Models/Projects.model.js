import mongoose from 'mongoose'

const ProjectSchema = new mongoose.Schema({
    projectName:{
        type: String,
        required: true,
    },
    description:{
        type: String,
    },
    members:[{  
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Member',
        required: true,
    }],
    projectTags:[{
        type:String,
        // enum : [ ''],
        // default : '',
    }],
    projectLink:{
        type: String,
    },
    projectRepo:{
        type: String,
    },
    projectStatus:{
        type: String,
        default: 'ongoing',
        enum: [ 'ongoing','completed'],
    },
    progress:{
        type: Number, 
        default: 0,
    },
    projectLead:[{
        type:String,
    }],
    deadline:{
        type:String,
    },
        
    }

,{timestamps: true})

export const ProjectModel = mongoose.model('Project',ProjectSchema)