# Documentação do portfólio

## O que fazemos

Este site apresenta o portfólio acadêmico e pessoal de João Pedro Pereira da Silva Lima. Reúne uma breve apresentação, conhecimentos de desenvolvimento web, projetos de estudo e meios de contato.

## Como o site funciona

É um site estático, de página única. A navegação superior leva às seções por rolagem suave; no celular, os links ficam em um menu recolhível. O JavaScript destaca a seção atual, oferece um botão para voltar ao topo e permite alternar o tema claro/escuro. A preferência do tema fica somente no `localStorage` do navegador.

O formulário valida os campos e usa `mailto:` para abrir o aplicativo de e-mail padrão com destinatário, assunto e conteúdo. A pessoa precisa revisar e enviar a mensagem. Não há servidor, serviço de formulário ou envio automático configurado. Se não houver aplicativo de e-mail configurado, o contato pode ser feito diretamente por `joaopereitdf@gmail.com`.

## Projetos apresentados

O portfólio apresenta os dez projetos (`At1` a `At10`) e três desafios. Os cards usam ícones com proporções iguais; cada botão abre o respectivo HTML na mesma guia.

- **At1 — Apresentação pessoal:** apresentação e hobbies (HTML e CSS).
- **At2 — Cadastro:** formulário com dados pessoais e contato (HTML e CSS).
- **At3 — Calculadora:** operações com dois valores (HTML, CSS e JavaScript).
- **At4 — Lista de tarefas:** inclusão de tarefas em uma lista (HTML, CSS e JavaScript).
- **At5 — Página responsiva:** layout adaptável a diferentes telas (HTML e CSS).
- **At6 — Galeria:** coleção de imagens com visualização ampliada (HTML, CSS e JavaScript).
- **At7 — Relógio:** exibição dinâmica do horário (HTML, CSS e JavaScript).
- **At8 — Quiz:** perguntas interativas e resultado (HTML, CSS e JavaScript).
- **At9 — Consulta de CEP:** consulta de localização por API (HTML, CSS, JavaScript e API externa).
- **At10 — Controle de notas:** cadastro de alunos e notas (HTML, CSS e JavaScript).
- **Desafio At6 — Galeria interativa:** versão de desafio da galeria (HTML, CSS e JavaScript).
- **Desafio 1 — Cadastro de produtos:** cadastro, pesquisa e listagem de produtos (HTML, CSS, Bootstrap e JavaScript).
- **Desafio 2 — Órbita:** central para agenda, eventos e favoritos (HTML, CSS, Bootstrap e JavaScript).

Os links apontam para os arquivos locais dos projetos no repositório; não há endereços de publicação externa cadastrados.

## Páginas e seções

- **Páginas:** 1 (`ArquivosPrincipais/index.html`).
- **Seções navegáveis (6):** Início, Quem sou, Projetos, Habilidades, Contato e Privacidade.
- Não existem páginas separadas nem subpáginas HTML.

## Tecnologias utilizadas

- HTML5 semântico e acessível.
- CSS3, estilos responsivos próprios e Bootstrap 5.3.7 via CDN.
- JavaScript para navegação, tema, botão de topo e validação nativa do formulário.
- Bootstrap Icons via CDN.
- SVGs e fotografia local na pasta `ArquivosPrincipais/img`.

## Estrutura do projeto

```text
Trabalho-Web/
├── DOCUMENTACAO.md
└── ArquivosPrincipais/
    ├── index.html
    ├── style.css
    ├── script.js
    ├── img/
    │   ├── FotoPerfil.jpeg
    │   ├── sobre.svg
    │   ├── cliente1.svg
    │   ├── cliente2.svg
    │   └── cliente3.svg
    └── Projetos/
        ├── At1/ a At10/
        └── Desafios/ (At6, desafio1, Desafio2)
```

Os SVGs de cliente e a ilustração `sobre.svg` permanecem no projeto, mas não são exibidos na versão atual. O site carrega Bootstrap e ícones de CDNs, portanto esses recursos dependem de conexão com a internet.

## Privacidade e LGPD

O formulário pede somente nome, e-mail, assunto e mensagem, e apresenta autorização para uso desses dados com a finalidade de responder ao contato. Este site estático não armazena nem transmite o formulário; ele solicita ao cliente de e-mail do próprio visitante que componha a mensagem. O envio é uma ação do visitante e as regras do provedor escolhido também se aplicam. A seção Privacidade explica esse fluxo e disponibiliza e-mail para solicitações relativas a mensagens já enviadas. O modo de tema salva uma preferência não identificável localmente no navegador.

Este aviso descreve o funcionamento técnico implementado e não substitui uma revisão jurídica. Antes de conectar analytics, hospedagem com coleta de logs, cookies ou um serviço de formulário, atualizar o aviso para refletir os dados, finalidades, operadores, retenção e canais de atendimento reais.

## Observações de desenvolvimento

- A fotografia profissional fornecida está em `ArquivosPrincipais/img/FotoPerfil.jpeg` e aparece na apresentação e na seção Quem sou.
- Os links internos mantêm o usuário na mesma página/guia; os cards abrem projetos locais por caminhos relativos.
- O template original foi adaptado para remover conteúdo fictício de empresa, estatísticas sem fonte, depoimentos de exemplo e mapa irrelevante.
- Para publicar, hospedar a pasta `ArquivosPrincipais` em uma hospedagem estática, mantendo juntos o HTML, CSS, JavaScript e a pasta `img`.
