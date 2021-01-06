import mongoose from 'mongoose'

const schema = mongoose.Schema

const toDoSchema = new schema({


    id: {
        type: String
    },
    name : {
    type : String
    }, 
    toDos: {
        type: []
    }

})

const ToDos = mongoose.model('ToDos', toDoSchema)

export default ToDos