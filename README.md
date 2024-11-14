# MES Application

This template should help get you to start my mes application.
My Application is developed using Vue, tailwind css, express.js, socket.io and mySQL

## Database Setup

1. Download [XAMPP](https://www.apachefriends.org/download.html) and open it, then start the MySQL module.  
2. Click the Admin button in the MySQL module. 
3. Import the database file from the db directory 

## Project Setup

1. Go to the server.js file, make sure your database setup is correct
2. In the cors, change the localhost port to your current port.
3. Then, install the package:
Run npm install
```sh
npm install
```

Run npm install mysql2 
```sh
npm install mysql2 
```

Run npm install tailwind css 
```sh
npm install -D tailwindcss
npx tailwindcss init
```

Run npm install socket.io
```sh
npm install socket.io
```

Run npm install express --save
```sh
npm install express --save
```

4. Run the project 
```sh
npm run dev 
```