//importando os modulos express e mongoose
var express = require("express");
var mongoose = require("mongoose");//é a ferramenta para realizar a modelagem do banco

const app= express();//criando uma aplicação do express
const port= 3000;//definindo aporta
//conexao com o banco de dados, com uso de flags para tratamento de erros
//evita depreciação de codigos.
mongoose.connect("mongodb+srv://mirian_menezes:mirian_menezes@cluster0.ktqwr.mongodb.net/vendas?retryWrites=true&w=majority",{useNewUrlParser: true, useUnifiedTopology:true})//
//criando o modelo que irá compor a collection de banco
const Produtos = mongoose.model("Produtos",{
    nome: String,
    vlUnit:Number,
    codigoBarras:String,
});
//chamando o motor de visualização ejs
app.set("view engine","ejs");
 app.set("views",__dirname,"/views")


 //permitindo que meus dados transitem entre as paginas em formato json
app.use(express.urlencoded());
app.use(express.json());
// criar a rota principal
 app.get("/",(req,res)=>{
     res.send("pagina inicial");

 });
 //rota  para listar produtos cadastrados
 app.get("/produtos",(req,res)=>{
     let produtos = Produtos.find({},(err,produto)=>{//trando a variavel dentro ela mesmo
        if(err)// se hover erro etatus 500
           return res.staus(500).send("Erro ao consultar Produto")
        res.render("produtos",{produtos:produto});// se nao tiver err
     });
    
 });
 //rota para renderizar a página de fomulario/cadastro
 app.get("/cadastrarProdutos",(req,res)=>{//trazendo o formulário
     res.render("formprodutos")
 })
 //metodo post-pra salvar os produtos no banco
 app.post("/cadastrarProdutos",(req,res)=>{ //recebendo o formulário
  let produto =new Produtos();// criando um objeto do tipo produto/ vai passar a ser um objeto do tipo produto/
 
  produto.nome=req.body.nome;  // req -requisição // "name" o que tem no input
  produto.vlUnit=req.body.valor// body é o corpo da requisição
  produto.codigoBarras=req.body.codBarras;

  produto.save((err)=>{// atraves do save  vai salvar no banco de dados
    if(err)// erro do servidor// if 
         return res.status(500).send("erro ao cadastrar")
    return res.redirect("/produtos");   //se nao der erro vai retorna para tela de produto
  });
 });



 app.get("/deletarProduto/:id", (req, res)=>{
    var id = req.params.id

    Produtos.deleteOne({_id:id}, (err, result)=>{
        if(err){
            return res.status(500).send("Erro ao excluir registro")
        }
        res.redirect("/produtos")

    })

})


//definindo a porta que irei acesar a minha aplicação
 app.listen(port,()=>{
     console.log("servidor rodando na porta"+port);
 });


