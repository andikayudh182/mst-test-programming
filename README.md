# mst-test-programming

## Front End
### Installation
1. Open folder mst-frontend
2. Jalankah perintah ``` npm install ```
3. Kemudian setelah setelesai jalan perintah ``` npm run serve ```

## Backend
### Installation
1. Open folder mst-backend/config/config.json
2. Setting config.json <br> 
    "username": "yourusername", <br>
    "password": "yourpass", <br>
    "database": "yourdb", <br> 
    "host": "127.0.0.1", <br>
    "dialect": "postgres"
3. Kembali ke folder mst-backend dan jalankan perintah ``` npm install ``` untuk mendownload node modules
4. Kemudian lakukan db migration dengan perintah ``` sequelize db:migrate ``` dan pastikan apakah table sudah berhasil digenerate ke dalam postgre
5. Jalankan perintah ``` nodemon ``` pada folder mst-backend untuk menjalankan server

### Create Account For Login
1. Buka Postman/Thunder Client
2. Setiing Url menjadi "http://localhost:3000/api/user/signup" dengen HTTP METHOD POST
3. Isi body dengan contoh dibawah ini <br> 
{ <br> 
      "username": "yourusername", <br> 
      "password": "yourpass", <br> 
      "nama": "yournama" <br>  
} <br> 
4. silahkan login pada website menggunakan username dan password yang didaftarkan
