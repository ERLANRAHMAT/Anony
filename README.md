## Untuk pengguna Windows

* Unduh & Instal Git [`Klik Disini`](https://git-scm.com/downloads)
* Unduh & Instal NodeJS [`Klik Disini`](https://nodejs.org/en/download) 

```bash
git clone https://github.com/ariffb25/anonymous-chat
cd anonymous-chat
npm i
node .
```

---------

## Untuk Pengguna Heroku

### Buildpack
* heroku/nodejs 

---------

## Arguments `node . [--options] [<session name>]`

### `--session <file name>`

* Menggunakan session dari nama file yang berbeda, default session.data.json

* Contoh nama file ariffb.data.json maka penggunaannya `node . --session 'ariffb.data'`

### `--prefix <prefixes>`

* `prefixes` dipisahkan oleh masing-masing karakter
Setel awalan

### `--server`

* Digunakan untuk [heroku](https://heroku.com/) atau pindai melalui situs web

### `--db <json-server-url>`

* Disarankan menggunakan mongodb

### `--big-qr`

* Jika qr unicode kecil tidak mendukung

### `--img`

* Aktifkan pemeriksa gambar melalui terminal

### `--test`

**Development** Testing Mode

### `--trace`

```js
conn.logger.level = 'trace'
```

### `--debug`

```js
conn.logger.level = 'debug'
```


---------

## Terima Kasih

[Adiwajshing](https://github.com/Adiwajshing)

[Nurutomo](https://github.com/Nurutomo)