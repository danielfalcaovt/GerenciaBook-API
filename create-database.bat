echo "Inicialização do banco de dados em andamento..."
docker network create --driver bridge my-network
docker run --name my-postgres --restart=always --network=my-network -p 5433:5432 -e POSTGRES_PASSWORD=postgres -d postgres
docker run --name my-pgadmin --restart=always --network=my-network -p 15432:80 -e PGADMIN_DEFAULT_EMAIL=ciep316@gmail.com -e PGADMIN_DEFAULT_PASSWORD=postgres -d dpage/pgadmin4
echo "Banco de dados inicializado."