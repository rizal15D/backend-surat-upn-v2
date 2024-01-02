npm install

change the 'config.json' and .env

npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all

> npm run api-service

for install secret_key:

> node
> require('crypto').randomBytes(64).toString('hex')
