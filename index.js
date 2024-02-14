
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
import 'dotenv/config';
import { MongoClient } from 'mongodb';
require("./models/SchemaApi");

const URI = process.env.MONGO_URI
const client = new MongoClient(URI);
const database = client.db('test');
const maqs = database.collection('artigos');

const PORT = process.env.PORT

client.connect();
console.log('conected to mongodb');

const app = express();
app.use(cors());
app.use(express.json());


app.listen(PORT, () => console.log(`api running ${PORT}`));


const Maq = mongoose.model('maq');

// const app = express();

// // forma de ler JSON / middlewares
// app.use(
//     express.urlencoded({
//       extended: true,
//     })
//   );

// app.use(express.json());



// app.use((req, res, next) => {
//     //console.log("Acessou o Middleware!");
//     res.header("Access-Control-Allow-Origin", "*");
//     // res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
//     app.use(cors());
//     next();
// });



app.get("/maq", (req, res) => {
    Maq.find({}).then((maq) => {
        return res.json(maq);
    }).catch((erro) => {
        return res.status(400).json({
            error: true,
            message: "Nenhum artigo encontrado!"
        })
    })
});

app.get("/maq/:id", (req, res) => {
    Maq.findOne({ _id: req.params.id }).then((maq) => {
        return res.json(maq);
    }).catch((erro) => {
        return res.status(400).json({
            error: true,
            message: "Nenhum artigo encontrado!"
        })
    })
})

app.post("/maq", (req, res) => {
    const maq = Maq.create(req.body, (err) => {
        if (err) return res.status(400).json({
            error: true,
            message: "Error: Artigo não foi cadastrado com sucesso!"
        });

        return res.status(200).json({
            error: false,
            message: "Artigo cadastrado com sucesso!"
        })
    });
});

app.put("/maq/:id", (req, res) => {
    const maq = Maq.updateOne({ _id: req.params.id}, req.body, (err) => {
        if(err) return res.status(400).json({
            error: true,
            message: "Error: Artigo não foi editado com sucesso!"
        });

        return res.json({
            error: false,
            message: "Artigo editado com sucesso!"
        });
    });
});

app.delete("/maq/:id", (req, res) => {
    const maq = Maq.deleteOne({_id: req.params.id}, (err) => {
        if(err) return res.status(400).json({
            error: true,
            message: "Error: Artigo não foi apagado com sucesso!"
        });

        return res.json({
            error: false,
            message: "Artigo apagado com sucesso!"
        });
    });
});

// const DB_USER = process.env.DB_USER
// const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD);

// mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@chico.hupeflu.mongodb.net/?retryWrites=true&w=majority`, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }).then(() => {
//     console.log("Conexão com MongoDB realizada com sucesso!");
// }).catch((erro) => {
//     console.log("Erro: Conexão com MongoDB não foi realizada com sucesso!");
// });

// app.listen(port, () => {
//     console.log(`Servidor iniciado na porta ${port}`);
// });