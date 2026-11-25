# Roteiro de apresentação — BookUMJ

Use este roteiro para estudar o projeto e dividir a explicação entre os quatro integrantes. Cada pessoa deve conhecer o funcionamento geral do aplicativo, mesmo que apresente uma parte diferente.

## Sugestão de divisão entre quatro integrantes

### Integrante 1 — Proposta e tela inicial

- Apresentar o problema e o objetivo do BookUMJ.
- Mostrar a tela inicial, o campo de pesquisa e as sugestões de leitura.
- Explicar que a tela utiliza `useState` para guardar o texto digitado.

### Integrante 2 — API e resultados

- Explicar que o aplicativo consulta a Open Library pela internet.
- Mostrar `src/services/openLibrary.js`.
- Explicar que `fetch` faz a requisição e que a resposta JSON é transformada em uma lista de livros.
- Demonstrar uma pesquisa e a tela de resultados.

### Integrante 3 — Detalhes e navegação

- Abrir um livro e mostrar capa, título, autor, ano, descrição e assuntos quando disponíveis.
- Explicar que o React Navigation troca entre as telas.
- Mostrar que a tela de detalhes faz uma nova requisição para buscar dados da obra.

### Integrante 4 — Favoritos e estado global

- Adicionar um livro aos favoritos e abrir a tela “Meus favoritos”.
- Remover o livro e demonstrar a atualização da lista.
- Explicar que `useContext` permite que várias telas acessem a mesma lista.
- Explicar que AsyncStorage guarda os favoritos no aparelho para continuarem disponíveis depois de fechar o app.

## Conceitos para todos estudarem

### `useState`

É um Hook do React usado para guardar um valor que pode mudar durante o uso do aplicativo. Exemplos no BookUMJ: texto da pesquisa, livros recebidos da API, indicador de carregamento e mensagem de erro.

Exemplo simplificado:

```javascript
const [query, setQuery] = useState('');
```

`query` é o valor atual e `setQuery` altera esse valor.

### `useContext`

Permite compartilhar informações entre componentes sem precisar passar os dados manualmente por vários níveis. No BookUMJ, o `FavoritesProvider` disponibiliza a lista de favoritos e as funções para adicionar, remover e verificar um livro.

### API externa

Uma API permite que o aplicativo solicite dados a outro serviço. O BookUMJ consulta a Open Library usando `fetch`. A resposta chega em JSON e é utilizada para montar os cartões e a tela de detalhes.

### Carregamento e erros

Enquanto espera a resposta, o aplicativo mostra um indicador de carregamento. Se a conexão falhar ou a API responder com erro, mostra uma mensagem e oferece uma opção para tentar novamente.

## Demonstração prática sugerida

1. Abrir a tela inicial.
2. Pesquisar “Harry Potter”.
3. Mostrar os resultados e abrir um livro.
4. Exibir os detalhes da obra.
5. Adicionar o livro aos favoritos.
6. Abrir “Meus favoritos”.
7. Remover o livro.
8. Explicar rapidamente onde ficam a API, `useState` e `useContext` no código.

## Checklist do GitHub

- [ ] Repositório público.
- [ ] Código completo enviado.
- [ ] Quatro integrantes adicionados como colaboradores, se o trabalho for feito em um repositório de uma pessoa.
- [ ] Cada integrante fez commits com sua própria conta e alterações reais.
- [ ] README atualizado com nomes, turma e disciplina.
- [ ] Aplicativo testado em um aparelho ou emulador.
