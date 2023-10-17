const express = require('express')
const path = require('path')
const app = express()
const port = 3000
const multer  = require('multer')
const {mergepdfs}  = require('./index')
const upload = multer({ dest: 'uploads/' })

app.use(express.static("public"));
app.use('/static', express.static('public'))


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,"/index.html"))
})
app.post('/merge', upload.array('pdfs', 2),  async(req, res, next) =>{
 console.log(req.files)
 await mergepdfs(path.join(__dirname, req.files[0].path),( __dirname, req.files[1].path))
res.redirect("http://localhost:3000/static/merged.pdf")
//  res.send({data: req.files})
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)    
})
