import express from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
const host = '0.0.0.0';
const porta = 3000;


const app = express();
var listaProd = [];

app.use(cookieParser());

app.use(session({
    secret: 'M1nh4Ch4v3S3cr3t4',
    resave: true, 
    saveUninitialized: true, 
    cookie: {
        secure: false, 
        httpOnly: true, 
        maxAge: 1000 * 60 * 15 
    }
}));


app.use(express.urlencoded({extended: true}));
app.get('/', estaAutenticado, (req, res) => {
    res.write(`
    <html lang="pt-br">
    <head>
        <meta charset="UTF-8">
        <title>Cadastro</title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet">

        <link href="style.css" rel="stylesheet">
    </head>
    <body>
    `);
    res.write(`
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
<div class="container-fluid">

<a class="navbar-brand" href="#">PPI</a>

<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#menu">
<span class="navbar-toggler-icon"></span>
</button>

<div class="collapse navbar-collapse" id="menu">

<ul class="navbar-nav me-auto">
<li class="nav-item">
<a class="nav-link active" href="/listaProdutos">Produtos</a>
</li>

<li class="nav-item">
<a class="nav-link" href="/produtos">Cadastro</a>
</li>

<li class="nav-item dropdown">
<a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
Opções
</a>

<ul class="dropdown-menu">
<li><a class="dropdown-item" href="/logout">Logout</a></li>
</ul>

</li>
</ul>

<form class="d-flex">
<input class="form-control  me-2" type="search" placeholder="pesquisar">
<button class="btn btn-outline-light">Pesquisar</button>
</form>


</div>
</div>
</nav>

<div class="d-flex w-100 flex-direction-column align-items-center justify-content-center" style="height: 400px">

  <h1>FORMULÁRIO DE CADASTRO DE PRODUTOS</h1>
</div>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
        
        `);
    res.end();
});

app.get("/produtos", estaAutenticado, (requisicao, resposta) => {

    resposta.write(`
    <html lang="pt-br">
    <head>
        <meta charset="UTF-8">
        <title>Cadastro</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet">
    </head>

    <body>

    <div class="container mt-5">

    <form method="POST" action="/produtos" class="row gy-2 gx-3 align-items-center border p-3">

    <legend><h3>Cadastro de Produto</h3></legend>

    <div class="row">
    <label for="cod">Codigo de Barras</label>
    <input type="number" class="form-control mb-2" id="cod" name="cod">
    </div>

    <div class="row">
    <label for="razao">Descrição do Produto</label>
    <input type="text" class="form-control mb-2" id="nome" name="nome">
    </div>
    <div class="row">
    <label for="custo">Preço de custo</label>
    <input type="number" class="form-control mb-2" id="custo" name="custo">
    </div>
    <div class="row">
    <label for="venda">Preço de venda</label>
    <input type="number" class="form-control mb-2" id="venda" name="venda">
    </div>
      <div class="row">
    <label for="validade">Data de validade</label>
    <input type="date" class="form-control mb-2" id="date" name="date">
    </div>
    <div class="row">
    <label for="estoque">Qnt em Estoque</label>
    <input type="number" class="form-control mb-2" id="estoque" name="estoque">
    </div>
     <div class="row">
    <label for="fabricante">Nome do Fabricante</label>
    <input type="text" class="form-control mb-2" id="fabricante" name="fabricante">
    </div>
   
    <div class="row">
    <button type="submit" class="btn btn-primary">Cadastrar Produto</button>
    </div>

    </form>
    </div>

    </body>
    </html>
    `);

    resposta.end();
});


app.post("/produtos", estaAutenticado, (requisicao, resposta) => {

    const cod = requisicao.body.cod;
    const nome = requisicao.body.nome;
    const custo = requisicao.body.custo;
    const venda = requisicao.body.venda;
    const date = requisicao.body.date;
    const estoque = requisicao.body.estoque;
    const fabricante = requisicao.body.fabricante;


    if (!cod || !nome || !custo || !venda || !date || !estoque || !fabricante) {

        let html = `
        <html lang="pt-br">
        <head>
        <meta charset="UTF-8">
        <title>Cadastro</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet">
        </head>

        <body>

        <div class="container mt-5">

        <form method="POST" action="/produtos" class="row gy-2 gx-3 align-items-center border p-3">

        <legend><h3>Cadastro de Produto</h3></legend>

        <div class="row">

        <label for="cod">Codigo de Barras</label>

        <input type="number" class="form-control mb-2" id="cod" name="cod" value="${cod || ""}">
        `;

        if (!cod) {
            html += `
            <div class="alert alert-danger">
            Por favor informe o código de barras
            </div>
            `;
        }

        html += `
        </div>

        <div class="row">

    <label for="razao">Descrição do Produto</label>

            <input type="text" class="form-control mb-2" id="nome" name="nome" value="${nome || ""}">
        `;

        if (!nome) {
            html += `
            <div class="alert alert-danger">
            Por favor informe a descrição do produto
            </div>
            `;
        }
        html += `
        </div>

        <div class="row">

        <label for="Nome fantasia">Preço de custo</label>

            <input type="number" class="form-control mb-2" id="custo" name="custo" value="${custo || ""}">
        `;

        if (!custo) {
            html += `
            <div class="alert alert-danger">
            Por favor informe o preço de custo
            </div>
            `;
        }
        html += `
        </div>

        <div class="row">

    <label for="email">Preço de venda</label>

            <input type="number" class="form-control mb-2" id="venda" name="venda" value="${venda || ""}">
        `;

        if (!venda) {
            html += `
            <div class="alert alert-danger">
            Por favor informe o preço de venda
            </div>
            `;
        }
        html += `
        </div>

        <div class="row">

    <label for="date">Data de Validade</label>

            <input type="date" class="form-control mb-2" id="date" name="date" value="${date || ""}">
        `;

        if (!date) {
            html += `
            <div class="alert alert-danger">
            Por favor informe a data de validade
            </div>
            `;
        }
        html += `
        </div>

        <div class="row">

    <label for="email">Estoque</label>

            <input type="number" class="form-control mb-2" id="estoque" name="estoque" value="${estoque || ""}">
        `;

        if (!estoque) {
            html += `
            <div class="alert alert-danger">
            Por favor informe o estoque
            </div>
            `;
        }
        html += `
        </div>

        <div class="row">

    <label for="email">Fabricante</label>

            <input type="text" class="form-control mb-2" id="fabricante" name="fabricante" value="${fabricante || ""}">
        `;

        if (!fabricante) {
            html += `
            <div class="alert alert-danger">
            Por favor informe o fabricante
            </div>
            `;
        }
        html += `

        </div>

        <div class="row">
        <button type="submit" class="btn btn-primary">Cadastrar Produto</button>
        </div>

        </form>
        </div>

        </body>
        </html>
        `;

        resposta.write(html);
        resposta.end();

    } else {

        listaProd.push({
            cod: cod,
            nome: nome,
            custo: custo,
            venda: venda,
            date: date,
            estoque: estoque,
            fabricante: fabricante
        });

        resposta.redirect("/listaProdutos");

    }
});

app.get("/listaProdutos", estaAutenticado, (requisicao, resposta) => {

    resposta.write(`
    <html lang="pt-br">
    <head>
    <meta charset="UTF-8">
    <title>Lista de Produtos</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet">
    </head>

    <body>

    <div class="container mt-5">

    <table class="table table-striped table-hover">

    <thead>
    <tr>
    <th>Id</th>
    <th>Código</th>
    <th>Descrição</th>
    <th>Preço de Custo</th>
    <th>Preço de Venda</th>
    <th>Data de Validade</th>
    <th>Estoque</th>
    <th>Fabricante</th>
    </tr>
    </thead>

    <tbody>
    `);

    for (let i = 0; i < listaProd.length; i++) {

        const produto = listaProd[i];

        resposta.write(`
        <tr>
        <td>${i + 1}</td>
        <td>${produto.cod}</td>
        <td>${produto.nome}</td>
        <td>${produto.custo}</td>
        <td>${produto.venda}</td>
        <td>${produto.date}</td>
        <td>${produto.estoque}</td>
        <td>${produto.fabricante}</td>
        </tr>
        `);
    }

    resposta.write(`
    </tbody>
    </table>

    <a href="/produtos" class="btn btn-primary">
    Continuar cadastrando
    </a>

    </div>

    </body>
    </html>
    `);

    resposta.end();

});
app.get('/login', (requisicao, resposta) => {
    const ultimoAcesso = requisicao.cookies?.ultimoAcesso || "Nunca acessou";
    console.log("Último acesso:", ultimoAcesso);
    resposta.write(`
        <html lang="pt-br">
    <head>
        <meta charset="UTF-8">
        <title>Cadastro</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet">
    </head>

    <body>
        `)
    resposta.write(`<section class="vh-100 gradient-custom">
  <div class="container py-5 h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-12 col-md-8 col-lg-6 col-xl-5">
        <div class="card bg-dark text-white" style="border-radius: 1rem;">
          <div class="card-body p-5 text-center">

            <div class="mb-md-5 mt-md-4 pb-5">

              <h2 class="fw-bold mb-2 text-uppercase">Login</h2>
              <p class="text-white-50 mb-5">Preencha seu login e senha!</p>

              <form method="POST" action="/login">
              <div data-mdb-input-init class="form-outline form-white mb-4">
                <input type="email" id="email" name="email" class="form-control form-control-lg" />
                <label class="form-label" for="email">Email</label>
              </div>

              <div data-mdb-input-init class="form-outline form-white mb-4">
                <input type="password" id="senha" name="senha" class="form-control form-control-lg" />
                <label class="form-label" for="senha">Senha</label>
              </div>

              <p class="small mb-5 pb-lg-2"><a class="text-white-50" href="#!">não tem senha?</a></p>

              <button data-mdb-button-init data-mdb-ripple-init class="btn btn-outline-light btn-lg px-5" type="submit">Login</button>
            `)
    resposta.write(`
                <p class="mt-5 mb-3 text-white-50">Último acesso: ${ultimoAcesso}</p>
    `);
    resposta.write(`
        </form>
    
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
</body>
</html>
`)
    resposta.end();
})

app.post('/login', (requisicao, resposta) => {
    const email = requisicao.body.email;
    const senha = requisicao.body.senha;

    if (email === "admin@example.com" && senha === "admin123") {
        requisicao.session.logado = true; 
        const dataUltimoAcesso = new Date();
        resposta.cookie("ultimoAcesso", dataUltimoAcesso.toLocaleString(), {maxAge: 1000 * 60 * 60 * 24 * 30, httpOnly: true});
        resposta.redirect("/");
    } else {
        resposta.write(`
        <html lang="pt-br">
    <head>
        <meta charset="UTF-8">
        <title>Cadastro</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet">
    </head>

    <body>
        `)
        resposta.write(`<section class="vh-100 gradient-custom">
  <div class="container py-5 h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-12 col-md-8 col-lg-6 col-xl-5">
        <div class="card bg-dark text-white" style="border-radius: 1rem;">
          <div class="card-body p-5 text-center">

            <div class="mb-md-5 mt-md-4 pb-5">

              <h2 class="fw-bold mb-2 text-uppercase">Login</h2>
              <p class="text-white-50 mb-5">Preencha seu login e senha!</p>
            <form method="POST" action="/login">
              <div data-mdb-input-init class="form-outline form-white mb-4">
                <input type="email" id="email" name="email" class="form-control form-control-lg" />
                <label class="form-label" for="email">Email</label>
              </div>

              <div data-mdb-input-init class="form-outline form-white mb-4">
                <input type="password" id="senha" name="senha" class="form-control form-control-lg" />
                <label class="form-label" for="senha">Senha</label>
              </div>

              <p class="small mb-5 pb-lg-2"><a class="text-white-50" href="#!">não tem senha?</a></p>

              <button data-mdb-button-init data-mdb-ripple-init class="btn btn-outline-light btn-lg px-5" type="submit">Login</button>
            </form>

            </div>
            <span>
                <p class="text-danger">Email ou senha inválidos!</p>
            </span>
        
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
</body>
</html>
`)
        resposta.end();
    }
});

app.get("/logout", (requisicao, resposta) => {
    requisicao.session.destroy();
    resposta.redirect("/login");
});


function estaAutenticado(requisicao, resposta, proximo) {
    if (requisicao.session?.logado) {
        proximo();
    }
    else {
        resposta.redirect("/login");
    }
}


app.listen(porta, host, () => {
    console.log(`Servidor rodando em http://${host}:${porta}`);
});