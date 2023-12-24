const express = require('express')
const app = express()
const port = 3000
const router = require('./src/routes/index.js')

app.use(router)

// app.get('/', (req, res) => {
//   res.send('Hello World adwd!')
// })

// app.post('/login', (req, res) => {
//     res.send('Got a POST request')
// })

// app.put('/user', (req, res) => {
//     res.send('Got a PUT request at /user')
// })

// app.delete('/user', (req, res) => {
//     res.send('Got a DELETE request at /user')
// })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})