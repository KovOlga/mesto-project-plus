# Бэкенд Mesto

Backend сервиса проекта Mesto.

Статус: завершен.

## Стек технологий

![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)

- Typescript в качестве основного языка проекта
- Mongodb и ODM Mongoose для хранения данных пользователей
- Node.js в качестве среды выполнения

## Установка

### Склонировать репозиторий

```sh
   git clone git@github.com:KovOlga/mesto-project-plus.git
```

### Установить зависимости

```sh
   npm install
```

### Запустить проект на деволтном 3000 сервере в режиме разработки

```sh
   npm run dev
```

## Работа с проектом

В корне проекта необходимо создать файл `.env` и задать переменные окружения, или они будут взяты по умолчанию из проекта:

```sh
   PORT = [порт сервера]
   DB_ADDRESS = [адрес базы данных]
   JWT_SECRET = [значение секрета jwt]
```

## Фронтенд

Фронтенд для проекта доступен по [ссылке](https://github.com/KovOlga/mesto-project).
