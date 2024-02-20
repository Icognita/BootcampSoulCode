//chamar o express
var express =require("express");
const app =express();
var mongoose =require("mongoose");

const port =3000;
 
mongoose.connect("mongodb+srv://mirian_menezes:mirian_menezes@cluster0.ktqwr.mongodb.net/EscolaMVC?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })

app.set("view engine", "ejs")
app.set("views", __dirname, "views");
app.use(express.urlencoded({extended:true}));
app.use(express.json());

const router = require('./routers/students-router')

app.use('/',router)

 app.get("/", (req,res)=>{
     res.send("Página inicial");
 });


//conexão com o servidor
app.listen(port, ()=>{
    console.log("Servidor conectador a porta ", port)
});