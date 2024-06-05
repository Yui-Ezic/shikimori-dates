init: docker-down-clear docker-pull docker-build docker-up npm-install

restart: down up
up: docker-up
down: docker-down
server: dev-server

docker-up:
	docker compose up -d

docker-down:
	docker compose down --remove-orphans

docker-down-clear:
	docker compose down -v --remove-orphans

docker-pull:
	docker compose pull

docker-build:
	docker compose build --pull

dev-server:
	docker-compose run --service-ports --rm node npm run dev

npm-install:
	docker-compose run --rm node npm install