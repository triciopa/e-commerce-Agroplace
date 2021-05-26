# Group Project - Agricultural e-commerce

<img height="200" src="https://raw.githubusercontent.com/triciopa/e-commerce-Agroplace/main/demo-img/tractor.png" align="right"/>  

<p>You can see a tour inside this app, following the next video:</p>

>**Video URL:** https://www.youtube.com/watch?v=cXkNWNEK1So

## How to use

1. Create a PostgreSQL database named as you please.
2. Create an `.env` file inside `/api` with the following:
```js
// api/.env
DB_USER = [your_user];
DB_PASS = [your_pass];
DB_HOST = localhost; // that's how you run this project in your local machine
DB_PORT = 5432; // this is the default port in postgress, but maybe you've chosen another
DB_NAME = [your_database_name];
```
3. Set a secret key for JWT signature and obtain an `ID token`, also in `.env`:
```js
// api/.env
SECRET = [your_secret]; //you can use base-64 characters
```
4. For Google social login accounts, create a Facebook and Google developer accounts and add to `.env`:
```js
// api/.env
CLIENT_SECRET_FB=[value]
CLIENT_ID_FB=[value]
CALLBACK_URL_FB=[value]

GOOGLE_CONSUMER_KEY=[value]
GOOGLE_CONSUMER_SECRET=[value]
GOOGLE_URL_CB=[value]
```
5. Also it's required to create an `.env` file in `/client`, with the FB Client ID:
```js
// client/.env
REACT_APP_CLIENT_ID_FB=[value]
```
>**WARNING:** To login with FB account in development mode, you can only use mock users given by FB. Also, make sure you have "REACT_APP_" prefix for every variable in the client side.

6. In order to use nodemailer for receiving notifications (fulfilled orders, newsletter, etc.), also place an authorized Gmail account in `api/.env`:
```js
// api/.env
user=[account]
pass=[password]
```

7. Install node modules with `npm i` in both directories `/api` and `/client`.
8. Start both with `npm start`

## Features

### Web Application based in:

- React.js and Redux.js (Front-end)
- Node.js and Express.js (Back-end)
- PostgreSQL & Sequelize (Database).

### Technologies

- [ ] React.js
- [ ] Redux.js
- [ ] SASS
- [ ] MaterialUI
- [ ] Cloudinary
- [ ] Tensorflow.js
- [ ] Express.js
- [ ] Node.js
- [ ] Passport
- [ ] PostgreSQL
- [ ] Sequelize
