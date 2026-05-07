const express = require('express')
const postRouter = require('./routers/posts')
const handleError = require('./middleware/handleError')
const notFound = require('./middleware/notFound')
const app = express()
const port = 3000
const connection = require('./data/db')

app.use(express.json());
app.use('/posts', postRouter)
app.use(express.static('public'))

app.get('/', (req,res) => {
 res.json('benvenuti nella mia api')
}) 

app.use(handleError)

app.use(notFound)

app.listen(port, () => {
    console.log(`example app listening on port ${port}`)
})

