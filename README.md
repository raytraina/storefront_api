# Storefront API

## Notes

This Backend-only Application is built with Express/Node, TypeScript, SQL, and is configured to use a Postgres database. Authentication uses BCrypt for password hashing and a JSON Web Token (JWT) is issued and validated for each user. Prettier and ESLint are used to maintain code quality. Finally, testing of the model and endpoints is handled by Jasmine.

Note: A build script has been included for future deployment, though it is not currently being used for local development, other than during testing. When you run the `build` script in `package.json`, you will find the final JS files located in `dist/`

## Setup and Installation

### First - Cloning and Navigating to directory

To get this project started on your local machine, first clone this repository into the directory of your choice:

``` bash
$ git clone <GITHUB_URI>
```

And `cd` into the root of the project like:

``` bash
$ cd storefront_api
```

### Second - Setting up the databases

Then, create 2 PostgreSQL databases called `storefront` and `storefront_test` respectively. (This project does not use Docker but you can create/run your database wherever you'd like):

``` bash
$ createdb storefront
$ createdb storefront_test
```

Next, you will create the `storefront_admin` user account and grant it the privileges needed to make changes to the databases. Note that you will need to do this inside of postgres and will see your prompt change:

``` bash
$ psql
[psql (Version.XX) will display]

<pg prompt> =# CREATE USER storefront_admin WITH PASSWORD 'placeholder' SUPERUSER;
[create confirmation will display]

<pg prompt> =# GRANT ALL PRIVILEGES ON DATABASE storefront TO storefront_admin;
[grant confirmation will display]

<pg prompt> =# GRANT ALL PRIVILEGES ON DATABASE storefront_test TO storefront_admin;
[grant confirmation will display]
```

You can use `CTRL`+`D` to exit postgres interactive mode and get back to the terminal.

### Third - Installing packages and adding environment dependencies

Next, from inside of the cloned directory, you will install the requirements (aka dependencies) using _Node Package Manager_:

``` bash
$ npm install
```

#### **Environment Variables [UPDATED]**

You will need to create a `.env` file in the root of the project with the below environment variables. Create a file using:

```bash
$ touch .env
```

Then open the file, copy the below, and paste into the new `.env` file:

``` txt
PG_HOST='127.0.0.1'
PG_DB_URI='storefront'
PG_TEST_DB_URI='storefront_test'
PG_USER='storefront_admin'
PG_PASSWORD='placeholder'
ENV='dev'
JWT_SECRET='mysecret1234'
BCRYPT_PASSWORD='myextrasecret5678'
SALT_ROUNDS=10
PEPPER='theextrasecretpepperboom'
```

These variables are read into the project using the `dotenv` package that was installed in the previous step.

In a real-world scenario, these environment variables would be strictly secret and not exposed in a public respository, hence the sillier conventions user here.

Note: This project _does not use the PG_USER or PG_PASSWORD variables_ and instead uses your default postgres user details.

### Fourth - Optional db-migrate installation

(Optional) Once packages have finished being installed, you may need to globally install the db-migrate commands using:

``` bash
$ npm install -g db-migrate
```

### Fifth - Run migrations and seed database

Next, run the database migrations to both create tables and seed the database with some initial test data:

``` bash
$ db-migrate up
```

### Sixth - Run the app and play

Finally, you should now be able to run the API:

``` bash
$ npm run start
```

You can now use your browser at `http://localhost:3000/api` (Postman or a similar tool can be used) to make requests to the API endpoints noted below.

By default, the Express API will run on localhost's port `3000`, but if you need to change the configuration, you can do so in the `src/server.js` file.

### Clean Up - To wipe your environment after working with this project

For cleanup and to restore your local environment and privileges:

``` bash
$ dropdb storefront
$ dropdb storefront_test
$ psql
[psql (Version.XX) will display]

<pg prompt> =# DROP ROLE storefront_admin;
```

Use `CTRL+D` to get back to the terminal.

## API Guideline

All API endpoints are specified in the `REQUIREMENTS.md` file located in the root of this directory.

## Local Development & Testing

ESLint has been configured in the `eslint.config.mjs` file, and the script to run it has been specified in `package.json`. If you would like to use it, please run:

``` bash
$ npm run lint
```

For local development, if you would like to reformat your code to use the config and standards specified in `.prettierrc`, please run:

``` bash
$ npm run prettier
```

Finally, a modest test suite has been included in `src/tests` and configured in `spec/support/jasmine.json`. You can run the test and build scripts together with:

``` bash
$ npm run test
.............................
```

Please take note of the _Clean Up_ section above once you have run the test suite and are finished reviewing this project locally.

## Future Work to Explore with Frontend Team

### Submitting an Order

TBD

### Fulfilling an Order

TBD

### Creating a Temporary Cart for an order in database (OR store in localStorage OR cookies)

TBD

### Create ProductOrder records on Order Submission

TBD

### Enhanced User Auth

TBD

### View Popular Products (Top 5 OR Sort by Popularity on frontend)

TBD

### Remember Me logged in user auth

TBD
