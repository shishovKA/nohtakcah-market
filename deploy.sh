#!/usr/bin/env sh

# остановить публикацию при ошибках
set -e

# remove deploy previous directory
rm -rf deploy

# copy backed
cp -a backend deploy
rm -rf deploy/node_modules

# сборка frontend
cd frontend
npm run build
cd -

# если вы публикуете на пользовательский домен
# echo 'www.example.com' > CNAME

cd deploy
git init
git add -A
git commit -m 'deploy'

# если вы публикуете по адресу https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# если вы публикуете по адресу https://<USERNAME>.github.io/<REPO>
heroku git:remote -a notakah
git push -f heroku main

cd -