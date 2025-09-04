require('dotenv').config()
const app = require('./src/app')

app.listen(2000, () => {
    console.log('server is running on http://localhost:2000')
})