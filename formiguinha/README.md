README — Pra Tu (site romântico local)

Como abrir:
1. Salve os arquivos: index.html, styles.css, scripts.js em uma pasta.
2. (Opcional) crie a pasta assets/ e coloque imagens extras.
3. Abra index.html no seu navegador (Chrome / Firefox / Safari) — não precisa de servidor.

Arquivos gerados:
- index.html  -> estrutura HTML principal
- styles.css  -> estilos e animações
- scripts.js  -> lógica: saudação, sky, galeria, cartinhas, jogo, localStorage
- assets/example.png -> placeholder inline SVG (referenciado em código)
- assets/legenda_coisas.txt -> instruções sobre a galeria
- assets/legenda_cartinhas.txt -> instruções sobre cartinhas

Persistência local:
- O site usa localStorage com a chave: "pra-tu-db-v1".
- Estrutura do DB (exemplo):
{
  "coisas": [
    {
      "id":"id-abc123",
      "title":"Ex: Seu sorriso",
      "text":"Descrição...",
      "image":"data:image/png;base64,...",
      "created_at":"2025-09-11T03:00:00Z"
    }
  ],
  "cartinhas":[ ... ],
  "mensagens":[ ... ],
  "gameScores":[ ... ]
}

Limitações / Observações:
- Todas as imagens adicionadas via upload são convertidas em base64 (FileReader). Isso consome espaço do localStorage rapidamente (limite ~5MB dependendo do browser).
- Se o localStorage encher, remova itens antigos ou exporte JSON e limpe DB.
- Para migrar para backend no futuro: envie os objetos (JSON) para um endpoint REST (POST /api/coisas) e armazene imagens em S3 ou similar. O frontend atual já gera JSON de exportação.

Testes mínimos:
- Abrir index.html → verificar saudação conforme horário (manhã/tarde/noite).
- Em "Coisas", adicionar 3 itens com imagens — recarregar a página e ver persistência.
- Criar 2 cartinhas — abrir/curtir.
- Jogar ~30s no joguinho — verificar colisões e reiniciar.
- Exportar JSON e importar novamente.

Como trocar paleta de cores:
- Abra styles.css e altere as variáveis :root (--rosa-claro, --rosa-escuro, --preto, --branco, --cinza-suave).

Como adicionar sprites (PNGs que atravessam o céu):
- No site há uma função global chamada `addSprite()` (disponível no console).
- Você pode testar no console do navegador: execute `addSprite()` e selecione um arquivo de imagem para adicionar.
- Os sprites também são usados se você adicionar imagens na galeria — você pode adaptar para ligar galeria ↔ sprites.

Como reduzir tamanho de imagens:
- Para reduzir localStorage use imagens pequenas/resized antes de enviar. O código poderia ser extendido para redimensionar via canvas antes de salvar — sugestão para versão futura.

OBS: TODOs no código indicam pontos fáceis de customização (velocidades, frases, arrays de palavras).

Se quiser eu posso:
- Compactar tudo em um .zip aqui (se precisar).
- Gerar versão em inglês do projeto.
- Adicionar redimensionamento automático de imagens via canvas (para reduzir base64).
- Implementar toggle de tema escuro/romântico usando uma classe no <body>.

Divirta-se! — Armandilho 😄
