
import ToDos from './../Models/Todo.js';


const controller = {

    getAllToDoLists: (req, res) => {
        ToDos.find().then((items) => {
            res.send(items)
        })
    },

    newToDoList: (req, res) => {
        console.log(req.body)
        console.log(req.body.text)
        // const newToDo = {
        //     id: String(req.body.newToDo.id),
        //     name: req.body.newToDo.text,
        //     toDos: req.body.newToDo.items
        // }

        ToDos.create(req.body.newToDo)

    },

    addToDo: (req, res) => {
        ToDos.update({ id: req.body.newItem.parentId }, { $push: { toDos: req.body.newItem } }).then(() => {
            console.log("done")
        })


    },
    getToDos: (req, res) => {
        ToDos.find({ id: req.body.id }, (err, toDos) => {
            res.send(toDos)
        })
    },

    deleteToDo: (req, res) => {
        ToDos.update({ id: req.body.parentId }, { toDos: req.body.updatedItems }).then(() => {
            console.log("done")
        })
    },

    marked: (req, res) => {
        ToDos.update({ id: req.body.parentId }, { toDos: req.body.updatedItems }).then(() => {
            console.log("done")
        })

    },

    deleteAList: (req, res) => {
        ToDos.remove({ id: req.body.itemId }).then(() => {
            console.log("done")
        })
    }


}


export default controller