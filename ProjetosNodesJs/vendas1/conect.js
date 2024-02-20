var mongoose =require("mongoose"); // chamando mongoose para aplicação
mongoose.connect("mongodb+srv://mirian_menezes:mirian_menezes@cluster0.ktqwr.mongodb.net/vendas?retryWrites=true&w=majority").then(()=>{
console.log("banco conectado")//se
}).catch((err)=>{ /// tratamento de erro
    console.log("Deu ruim!"+err)

});
