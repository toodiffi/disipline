#!/bin/sh

function setupService() {
    echo "start to setup service"
    cd /Users/zhangxing/Documents/discipline-backend
    npm run dev
}

function setupMongo() {
    echo "start to setup mongo"
    cd /Users/zhangxing/Documents/mongodb-macos-x86_64-6.0.4/bin
    ./mongod --dbpath ../data/db
}

function setup() {
    echo "start to setup we:app"
    npm run dev:weapp
}

# &关键字很关键, 并行执行多个node服务的关键
setupMongo &
setupService &
setup