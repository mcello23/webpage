#!/bin/bash
# Script para configurar o projeto React

# Criar aplicação React
yarn create react-app .

# Instalar dependências necessárias
yarn add react-router-dom materialize-css @fortawesome/react-fontawesome @fortawesome/free-brands-svg-icons @fortawesome/free-solid-svg-icons eslint eslint-config-react-app

# Criar diretório para imagens e estilos
mkdir -p public/backgrounds
mkdir -p public/images
mkdir -p public/css

# Copiar arquivos estáticos necessários, se existirem
if [ -d "../css" ]; then
  cp -r ../css/* public/css/
fi

if [ -d "../backgrounds" ]; then
  cp -r ../backgrounds/* public/backgrounds/
fi

echo "Configuração concluída com sucesso!"
