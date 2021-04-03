# PoolSystemBe

This project was generated with Node.Js, node version 14.15.4 and  npm version 6.14.11

## Initialising Project

Run `npm i` to install all dependencies.

## Configurations & Deployment

1. Make a copy of `config.example.json` to and rename it to `config.json`.
2. Enter the configuratons in `config.json` file. sample configuration with running free monogoDb Cluster is as following.
{
    "PORT": 3000,
    "TOKEN_SECRET": "e4efo23$unyd3ri1w3",
    "MONGO_CONNECTION": "mongodb+srv://voting:dtCvDPlSwRtgiNVJ@cluster0.htx9u.mongodb.net/voting?retryWrites=true&w=majority",
    "WHITELIST": "http://localhost:4200",
    "PAGE_404": "http://localhost:4200/404"
}
3. If you are using your own cluster, you need to seed the data first. Open the terminal in the `seeder` folder, within this project folder and run the following command, `node seeder.js`. For some devices/ enivironments it can be `node ./seeder.js`. Once this execution is complete, the data will be available to use. The sample data consists of 1 admin user and 5 nominees.
4. Go back to the project folder, if you have nodemon installed globally, simply run `nodemon` to start the server, or start the server by executing `index.js` file using node.
5. The server will be running on to `http://localhost:3000/`, assuming you have configured port 3000 in `config.json` file. 


## Login Credentials

1. If you have used the seeder to populate the data, the login is as following. Email: `admin@votinator.com` and password `12345678`.
2. If you have not run the seeder and using the above cluster directly, the credetials are the same.