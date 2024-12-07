# 起動
.PHONY: up
up:
	docker compose up -d --build

# 終了
.PHONY: down
down:
	docker compose down