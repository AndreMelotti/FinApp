projeto=$1

# Atualizando os pacotes do sistema
sudo apt update && sudo apt upgrade -y

# Instalando Node.js e npm
sudo apt install -y nodejs npm

# Verificando a versão do Node.js
node -v

npm install typescript ts-node @types/node --save-dev

# Criando o projeto Next.js
npx create-next-app@latest $projeto --typescript

# npx create-next-app@latest $projeto --ts --tailwind --src-dir --eslint --app --import-alias @/*

# Navegando até a pasta do projeto
cd $projeto

# Instalando o Tailwind CSS
npm install -D tailwindcss postcss autoprefixer

# Inicializando o Tailwind CSS
npx tailwindcss init -p

# Instalando a fonte "Plus Jakarta Sans" via Google Fonts
npm install @fontsource/plus-jakarta-sans

# Instalando o Jest para testes
npm install --save-dev jest @testing-library/react @testing-library/jest-dom