import express from 'express'
import bodyparser from 'body-parser'
import './Models/db_connect.js'
import controller from './Controllers/controllers.js'
import cors from 'cors'


const app = express()

app.use(express.json())
app.use(bodyparser.urlencoded({ extended: true }))
app.use(cors())


app.get('/', (req, res) => {
    res.send("it's working")
})


app.post('/newToDoList', controller.newToDoList)
app.get('/getAllToDoLists', controller.getAllToDoLists)
app.post('/addToDo', controller.addToDo)
app.post('/getToDos', controller.getToDos)
app.post('/deleteToDo', controller.deleteToDo)
app.post('/marked', controller.marked)
app.post('/deleteAList', controller.deleteAList)


app.listen(process.env.PORT || 5000, () => {
    console.log('Server listening on port 5000')
})

