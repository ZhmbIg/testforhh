# Test Task for HH

## Описание

Этот проект — тестовое задание для компании HH. В проекте используется база данных PostgreSQL и Knex.js для работы с миграциями. Миграции создаются для управления таблицами и данными в базе данных, а также интеграция с Google Sheets для работы с тарифами.

## Установка

### Установка зависимостей

Для начала необходимо установить все зависимости проекта:

```bash
npm install

docker run --name postgres -e POSTGRES_PASSWORD=password -p 5433:5432 -d postgres

npm run migrate

npx knex --knexfile ./src/config/knexfile.js migrate:rollback

npx knex --knexfile ./src/config/knexfile.js migrate:make migration_name

npm run dev



### Объяснение команд:

1. **Установка зависимостей**: команда `npm install` для установки всех нужных пакетов из `package.json`.
2. **Docker**: инструкция для создания и запуска контейнера PostgreSQL в Docker.
3. **Миграции**:
   - `npm run migrate` — выполняет миграции с использованием конфигурации `knexfile.js`.
   - Команда `migrate:rollback` используется для отката миграций.
   - `migrate:make` для создания новых миграций.
4. **Запуск проекта**:
   - В режиме разработки `npm run dev` компилирует проект и запускает его.
   - В продакшн-режиме `npm start` запускает уже скомпилированный проект.

