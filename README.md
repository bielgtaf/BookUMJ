# BookUMJ — Catálogo de Livros

Aplicativo mobile desenvolvido com **React Native + Expo** para pesquisar livros, consultar informações e organizar uma lista de favoritos.

## Funcionalidades

- Tela inicial com campo de pesquisa e sugestões de leitura.
- Pesquisa por título, autor ou assunto.
- Tela de resultados com capas, títulos, autores e ano de publicação quando disponível.
- Tela de detalhes com descrição e assuntos relacionados quando a API disponibiliza esses dados.
- Adicionar e remover livros dos favoritos.
- Lista global de favoritos compartilhada entre telas por `useContext`.
- Favoritos persistidos no aparelho com AsyncStorage.
- Estados de carregamento, erro, lista vazia e opção de tentar novamente.
- Navegação entre telas com React Navigation.

## Tecnologias

- React Native
- Expo SDK 58
- JavaScript
- React Navigation (Stack e Bottom Tabs)
- Hooks `useState`, `useEffect`, `useContext`, `useCallback` e `useMemo`
- AsyncStorage
- API externa Open Library

## API utilizada

O aplicativo utiliza a API pública da [Open Library](https://openlibrary.org/developers/api), sem exigir chave de acesso:

- Pesquisa: `https://openlibrary.org/search.json?q=TERMO`
- Detalhes de uma obra: `https://openlibrary.org/works/ID_DA_OBRA.json`
- Capas: `https://covers.openlibrary.org/b/id/ID_DA_CAPA-M.jpg`

Os dados dependem do catálogo da Open Library. Algumas obras podem não ter capa, descrição, ano ou autor disponível.

## Como executar

### 1. Instalar o Node.js

Instale uma versão LTS do Node.js no computador: https://nodejs.org/

### 2. Abrir a pasta do projeto

Extraia o ZIP, abra a pasta `BookUMJ` no Visual Studio Code e abra um terminal dentro dela.

### 3. Instalar as dependências

```bash
npm install
npx expo install --fix
```

O comando `expo install --fix` ajusta as dependências nativas para a versão do Expo instalada.

### 4. Iniciar o aplicativo

```bash
npx expo start
```

Instale o aplicativo **Expo Go** no celular e leia o QR Code exibido no terminal ou no navegador. O computador e o celular devem estar na mesma rede Wi-Fi. Se a rede bloquear a conexão local, tente:

```bash
npx expo start --tunnel
```

## Organização das pastas

```text
BookUMJ/
├── App.js
├── app.json
├── package.json
├── README.md
├── ROTEIRO_APRESENTACAO.md
└── src/
    ├── components/       # Componentes reutilizáveis
    ├── context/          # Estado global dos favoritos
    ├── navigation/       # Rotas e navegação
    ├── screens/          # Telas do aplicativo
    ├── services/         # Comunicação com a API
    ├── styles/           # Cores e espaçamentos
    └── utils/            # Funções auxiliares
```

## Onde estão os requisitos da atividade?

| Requisito | Onde foi implementado |
|---|---|
| React Native com Expo | `package.json`, `App.js` |
| API externa | `src/services/openLibrary.js` |
| `useState` | Telas de início, pesquisa, resultados e detalhes |
| `useContext` | `src/context/FavoritesContext.js` |
| Campo de pesquisa | `HomeScreen.js` e `SearchScreen.js` |
| Resultados da pesquisa | `ResultsScreen.js` |
| Detalhes de cada livro | `BookDetailsScreen.js` |
| Favoritos | `FavoritesScreen.js` e `FavoritesContext.js` |
| Navegação | `src/navigation/RootNavigator.js` |
| Carregamento e erros | `src/components/Feedback.js` e telas |

## Antes de entregar

1. Teste a pesquisa, abra um livro, adicione aos favoritos e remova-o.
2. Feche e abra o aplicativo para confirmar que os favoritos continuam salvos.
3. Teste com a internet desligada para observar o tratamento de erro.
4. Atualize este README com os nomes dos quatro integrantes, turma e disciplina.
5. Publique o repositório como **público** no GitHub.
6. Cada integrante deve fazer commits com sua própria conta, contendo contribuições reais e identificáveis. Não compartilhem a mesma conta.

## Créditos

Projeto acadêmico BookUMJ. Os dados bibliográficos e as capas são consultados na Open Library. A disponibilidade e a completude das informações dependem da base externa.
