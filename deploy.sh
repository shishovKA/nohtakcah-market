#!/usr/bin/env sh

# остановить публикацию при ошибках
set -e

# copy backed
rm -rf backend/node_modules
cp -a backend deploy

cd backend
npm install
cd -

# сборка frontend
cd frontend

npm run build

cd -

# если вы публикуете на пользовательский домен
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# если вы публикуете по адресу https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# если вы публикуете по адресу https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:shishovKA/nohtakcah-market.git master:gh-pages

cd -