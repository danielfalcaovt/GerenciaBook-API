echo "Inicialização do servidor em andamento..."
docker network create --driver bridge my-network && echo "Network criado com sucesso!" || echo "FALHA NA CRIAÇÃO DO NETWORK"
docker run --name my-postgres --network=my-network -p 5433:5432 -e POSTGRES_PASSWORD=postgres -d postgres && echo "Postgres Inicializado" || echo "FALHA NO POSTGRES"
docker run --name my-pgadmin --network=my-network -p 15432:80 -e PGADMIN_DEFAULT_EMAIL=ciep316@gmail.com -e PGADMIN_DEFAULT_PASSWORD=postgres -d dpage/pgadmin4 && echo "PgAdmin Inicializado" || echo "FALHA NO PGADMIN"