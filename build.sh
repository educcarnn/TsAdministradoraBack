version: 0.2

phases:
  install:
    commands:
      - echo "Instalando Node.js e Yarn..."
      - curl -sL https://deb.nodesource.com/setup_14.x | bash -
      - apt-get install -y nodejs
      - npm install -g yarn
      - echo "Verificando versões de Node, npm e yarn..."
      - node -v
      - npm -v
      - yarn -v
       
  pre_build:
    commands:
      - echo "Instalando pacotes com Yarn..."
      - yarn install
      
  build:
    commands:
      - echo "Compilando o projeto..."
      - ./build.sh
      
  post_build:
    commands:
      - echo "Removendo arquivos desnecessários..."
      - rm -rf node_modules/
      
artifacts:
  base-directory: '.'
  files:
    - '**/*'
