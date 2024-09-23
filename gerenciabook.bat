echo "Inicialização do banco de dados em andamento..."
docker rm -f gerenciabook
docker start my-postgres
docker start my-pgadmin
npm run up
echo "GerenciaBook Inicializado."