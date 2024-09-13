echo "Inicialização do servidor iniciada..."
docker rm -f gerenciabook
(npm run up && echo "Inicializado.")|| echo "Erro na inicialização"
