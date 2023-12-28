npm install express
npm install sequelize-cli

change the 'config.json'

npx sequelize-cli db:migrate
npx sequelize-cli db:seed

> npm run api-service

for install secret_key:

> node
> require('crypto').randomBytes(64).toString('hex')
