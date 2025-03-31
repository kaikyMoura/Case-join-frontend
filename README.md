<h2 align="center">Case join - FrontEnd</h2>
<p align="center"><i>Repositório para o front-end desafio proposto pela Join tecnologia.</i></p>


<br/>

### 1. About the Project
Este repositório contem o front-end do [Case Join - BackEnd](https://github.com/kaikyMoura/Case-Join-backend), responsável pela criação da camada visual e por consumir a api / operações de CRUD.

<br/>

### 2. Principais recursos 🔑
- CRUD completo (Create, Read, Update, Delete).
- Filtragem por [nome, marca, categoria, preço minimo]
- Filtrar com páginação

<br/>

### 3. Technologias & Dependências
<div display="inline-block" gap="6">
  <img alt="next-logo" width="48" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg" />
  <img alt="typescript-logo" width="48" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" />
  <img alt="tailwindcss-logo" width="48" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original-wordmark.svg" />
  <img alt="react-logo" width="48" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" />
</div> 


#### Principais Dependências:

- **[axios](https://axios-http.com/docs/intro):**  
  <br/>Um cliente HTTP baseado em promessas para fazer requisições a APIs, com suporte a interceptação de requisições/respostas e transformações automáticas.

- **[next.js](https://nextjs.org/):**  
  <br/>Um framework React para produção, oferecendo renderização híbrida estática e no servidor, pré-carregamento de rotas e rotas de API.

- **[react](https://react.dev/):**  
  <br/>Uma biblioteca JavaScript para construir interfaces de usuário com uma arquitetura baseada em componentes.

- **[react-icons](https://react-icons.github.io/react-icons/):**  
  <br/>Uma coleção de bibliotecas de ícones populares como componentes React, com suporte para FontAwesome, Material Icons e mais.

- **[react-tooltip](https://react-tooltip.com/):**  
  <br/>Uma biblioteca para criar tooltips personalizáveis em aplicações React.

- **[tailwindcss](https://tailwindcss.com/):**  
  <br/>Uma framework CSS utilitária para criar designs rápidos e responsivos sem sair do HTML, com classes de estilo como `flex`, `grid`, `p-4` e muito mais.

- **[lodash.debounce](https://lodash.com/docs/4.17.15#debounce):**  
  <br/>Uma função da biblioteca Lodash que cria uma versão debounced de uma função, limitando a execução de uma função a uma vez a cada intervalo de tempo especificado, o que é útil para otimizar eventos como rolagem ou digitação.

<br/>


### 4. Arquitetura

O projeto segue uma **arquitetura modular** com uma clara separação de responsabilidades, utilizando o sistema de roteamento e as capacidades de API integradas do Next.js.

#### 📂 Estrutura do Projeto:
- src/
  - components/ # Componentes de UI reutilizáveis
      - Modal/
        - index.tsx
        - styles.module.scss
          
  - pages/ # Sistema de roteamento do Next.js
    - index.tsx # Página de entrada
    - _app.tsx # Página principal
    
  - services/ # API e lógica de negócios
    - api.ts # Instância do Axios e manipuladores de requisições
      
  - types/ # Interfaces e tipos TypeScript
    - Product.ts
      
  - styles/ # Estilos globais
    - globals.css

<br/>
  
### 5. Instalação e Configuração

### Pré-requisitos:
Antes de rodar o projeto, certifique-se de que o **Node.js** está instalado na sua máquina. Se não estiver, você pode baixá-lo no [site oficial do Node.js](https://nodejs.org/en/) (recomenda-se a versão LTS).

#### Para verificar a instalação do Node.js, execute:

```console
node -v
npm -v
```
#### Clone o repositório para sua máquina local:

```console
git clone https://github.com/kaikyMoura/Case-join-frontend.git
```

#### Acesse o diretório raiz do projeto:

```console
cd Case-join-frontend
```

#### Instalando dependências:
Use npm ou yarn para instalar as dependências do projeto: 

```console
npm install
# ou
pnpm install
# ou
yarn install
```

#### Executando a aplicação:
Após as dependências serem instaladas, você pode iniciar o servidor de desenvolvimento com:
```console
npm run dev
# ou
pnpm run dev
# ou
yarn dev
```

#### A aplicação estará disponível em:
```console
http://localhost:3000
```

Author 👨‍💻
[Kaiky](https://github.com/kaikyMoura) - Desenvolvedor
