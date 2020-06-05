const express = require('express')

const mongoose =require('mongoose')

const bodyParser =  require('body-parser')


//to connect to database
mongoose.connect("mongodb+srv://test:ccttestuser@cluster0-sbohj.mongodb.net/blog?retryWrites=true&w=majority",{useNewUrlParser:true,useUnifiedTopology:true})

const app = express()

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({extended:true}))

app.use(express.static('views'));

app.set("view engine","ejs")

var postSchema = new mongoose.Schema({body:String})

var post = mongoose.model('post',postSchema)

app.post('/post',(req,res) => {
      var postData = new post(req.body)
      
      postData.save().then(result => {
          console.log(result)
            res.redirect('/')
            }).catch(err => {
                res.status(400).send("Unable to save data")
             })
})

app.get('/',(req, res) => {
  post.find({}, (err,posts) => {
      res.render('index',{posts:posts})
             })

})

app.listen(3000,() =>{
console.log("Server is listening on Port 3000")

})