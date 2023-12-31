npm install express
npm install sequelize-cli
npm install http-status-codes
npm install multer

change the 'config.json'

npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all

> npm run api-service

for install secret_key:

> node
> require('crypto').randomBytes(64).toString('hex')
