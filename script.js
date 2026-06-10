// ===== SCRIPT DO PROJETO AGRINHO 2026 =====
// Funcionalidades: Acessibilidade (fonte, contraste) + Calculadora de agrotóxicos

// Aguarda o carregamento completo da página
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== 1. MENU DE ACESSIBILIDADE =====
    const btnAcessibilidade = document.getElementById('btnAcessibilidade');
    const menuAcessibilidade = document.getElementById('menuAcessibilidade');
    const body = document.body;
    
    // Abrir/fechar menu de acessibilidade
    btnAcessibilidade.addEventListener('click', () => {
        menuAcessibilidade.classList.toggle('escondido');
    });
    
    // Aumentar fonte (até 30px máximo)
    const aumentarFonte = document.getElementById('aumentarFonte');
    let tamanhoFonteAtual = 16; // tamanho padrão em px
    
    aumentarFonte.addEventListener('click', () => {
        if (tamanhoFonteAtual < 30) {
            tamanhoFonteAtual += 2;
            body.style.fontSize = tamanhoFonteAtual + 'px';
        }
    });
    
    // Diminuir fonte (mínimo 12px)
    const diminuirFonte = document.getElementById('diminuirFonte');
    
    diminuirFonte.addEventListener('click', () => {
        if (tamanhoFonteAtual > 12) {
            tamanhoFonteAtual -= 2;
            body.style.fontSize = tamanhoFonteAtual + 'px';
        }
    });
    
    // Alto contraste
    const btnContraste = document.getElementById('altoContraste');
    let contrasteAtivo = false;
    
    btnContraste.addEventListener('click', () => {
        if (contrasteAtivo) {
            body.classList.remove('alto-contraste');
            contrasteAtivo = false;
        } else {
            body.classList.add('alto-contraste');
            contrasteAtivo = true;
        }
    });
    
    // ===== 2. CALCULADORA DE CONSUMO DE AGROTÓXICOS =====
    const calcularBtn = document.getElementById('calcularBtn');
    const resultadoDiv = document.getElementById('resultadoCalculadora');
    
    function calcularConsumo() {
        // Obtém os valores digitados
        let hectares = parseFloat(document.getElementById('hectares').value);
        let litrosAgro = parseFloat(document.getElementById('litrosAgro').value);
        
        // Validação de entrada
        if (isNaN(hectares) || isNaN(litrosAgro) || hectares <= 0 || litrosAgro < 0) {
            resultadoDiv.innerHTML = '❌ Por favor, preencha área (hectares > 0) e litros (>= 0) corretamente.';
            resultadoDiv.style.backgroundColor = '#FFCDD2';
            resultadoDiv.style.color = '#B71C1C';
            return;
        }
        
        // Calcula litros por hectare
        let consumoPorHectare = litrosAgro / hectares;
        
        let classificacao = '';
        let corFundo = '';
        let mensagem = '';
        
        // Critérios de classificação:
        // Pouco: até 2 L/hectare
        // Médio: entre 2 e 5 L/hectare
        // Excessivo: acima de 5 L/hectare
        if (consumoPorHectare <= 2) {
            classificacao = '✅ POUCO';
            corFundo = '#C8E6C9';
            mensagem = 'Parabéns! O uso está dentro do recomendado para sustentabilidade. Continue assim ou invista em tecnologias ainda mais limpas.';
        } else if (consumoPorHectare <= 5) {
            classificacao = '⚠️ MÉDIO';
            corFundo = '#FFF9C4';
            mensagem = 'Atenção! O consumo está médio. Considere reduzir com controle biológico ou drones para aplicação localizada.';
        } else {
            classificacao = '🔴 EXCESSIVO';
            corFundo = '#FFCDD2';
            mensagem = 'Cuidado! O uso está muito alto. Isso prejudica o solo, a água e a saúde. Procure assistência técnica para alternativas sustentáveis.';
        }
        
        // Exibe o resultado
        resultadoDiv.innerHTML = `
            <strong>📊 Resultado:</strong><br>
            Consumo: ${consumoPorHectare.toFixed(2)} litros por hectare<br>
            Classificação: ${classificacao}<br>
            <strong>💚 ${mensagem}</strong>
        `;
        resultadoDiv.style.backgroundColor = corFundo;
        resultadoDiv.style.color = '#333';
    }
    
    // Adiciona evento ao botão calcular
    if (calcularBtn) {
        calcularBtn.addEventListener('click', calcularConsumo);
    }
    
    // Fechar menu de acessibilidade se clicar fora (opcional)
    document.addEventListener('click', function(event) {
        if (!btnAcessibilidade.contains(event.target) && !menuAcessibilidade.contains(event.target)) {
            if (!menuAcessibilidade.classList.contains('escondido')) {
                menuAcessibilidade.classList.add('escondido');
            }
        }
    });
});
