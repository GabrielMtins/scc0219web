// Funções básicas do carrinho
function obterCarrinho() {
    const carrinho = sessionStorage.getItem('carrinho');
    return carrinho ? JSON.parse(carrinho) : [];
}

function salvarCarrinho(carrinho) {
    sessionStorage.setItem('carrinho', JSON.stringify(carrinho));
}

// Funções principais
function adicionarAoCarrinho(livro) {
    const carrinho = obterCarrinho();
    const existente = carrinho.find(item => item.titulo === livro.titulo);
    
    if (existente) {
        existente.quantidade += 1;
    } else {
        carrinho.push({ ...livro, quantidade: 1 });
    }
    
    salvarCarrinho(carrinho);
}

function removerDoCarrinho(titulo) {
    const carrinho = obterCarrinho().filter(item => item.titulo !== titulo);
    salvarCarrinho(carrinho);
    atualizarCarrinhoUI();
}

function alterarQuantidade(titulo, delta) {
    const carrinho = obterCarrinho();
    const item = carrinho.find(i => i.titulo === titulo);
    
    if (item) {
        item.quantidade += delta;
        if (item.quantidade <= 0) {
            removerDoCarrinho(titulo);
        } else {
            salvarCarrinho(carrinho);
            atualizarCarrinhoUI();
        }
    }
}

// Atualização da interface
function atualizarCarrinhoUI() {
    const listaCarrinho = document.getElementById('lista-carrinho');
    if (!listaCarrinho) return;
    
    const carrinho = obterCarrinho();
    listaCarrinho.innerHTML = '';
    
    if (carrinho.length === 0) {
        listaCarrinho.innerHTML = '<li class="vazio">Seu carrinho está vazio</li>';
        return;
    }
    
    carrinho.forEach(item => {
        const li = document.createElement('li');
        li.className = 'carrinho-item';
        li.innerHTML = `
            <div class="imagem">
                <img src="${item.img}" alt="${item.titulo}">
            </div>
            <div class="info">
                <h4 class="nome-livro">${item.titulo}</h4>
                <div class="preco-carrinho">
                    <p class="preco-livro">${item.preco}</p>
                    <div class="contador">
                        <i class="bx bx-minus" onclick="alterarQuantidade('${item.titulo}', -1)"></i>
                        <span>${item.quantidade}</span>
                        <i class="bx bx-plus" onclick="alterarQuantidade('${item.titulo}', 1)"></i>
                    </div>
                </div>
                <button class="btn-remover" onclick="removerDoCarrinho('${item.titulo}')">
                    <i class='bx bx-trash'></i> Remover
                </button>
            </div>
        `;
        listaCarrinho.appendChild(li);
    });
    
    // Atualizar total
    const total = carrinho.reduce((sum, item) => {
        const preco = parseFloat(item.preco.replace('R$ ', '').replace(',', '.'));
        return sum + (preco * item.quantidade);
    }, 0);
    
    const totalFormatado = 'R$ ' + total.toFixed(2).replace('.', ',');
    document.querySelector('.pagar').textContent = `Pagar ${totalFormatado}`;
}

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    atualizarCarrinhoUI();
    
    // Botão de voltar
    document.querySelector('.cabecalho-carrinho button').addEventListener('click', () => {
        window.history.back();
    });
    
    // Botão de pagar (mantém sua lógica original)
    document.querySelector('.pagar').addEventListener('click', function(e) {
        const logado = sessionStorage.getItem('clienteLogado');
        if (logado !== "true") {
            e.preventDefault();
            window.location.href = 'entrar.html';
        }
    });
});
