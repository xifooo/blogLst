#!/usr/bin/bash

echo "current working path is $(pwd), using this path for sure? y/n"
read Sure
main(Sure)

function main(s) {
    if [[ -z $s || "n" == $s ]];then
        echo "bye~"
    elif [[ "y" == $s ]]; then
        echo "this bash script will create a project including both backend(Node.js) and frontend(React-app)"
        init_backend
        init_frontend
    else
        echo "unknown character bye~"
    fi
}

# 初始化 backend
function init_backend() {
    echo "=============npm init=============="
    structuring
    install_pkg
}
# 安装依赖包
function install_pkg() {
    dependencies=('express' 'cors' 'mongoose' 'dotenv' 'express-async-errors');
    dev_dependencies=('nodemon' 'morgan' 'eslint' 'cross-env' 'jest' 'supertest');

    for pkg in ${dependencies[*]}
    do
        echo "npm install ${pkg}"
    done;

    for dev_pkg in ${dev_dependencies[*]}
    do 
        echo "npm install --save-dev ${dev_pkg}"
    done;
}
# 结构化项目
function structuring() {
    echo "touch app.js"

    proj_structures=('models' 'controllers' 'utils' 'tests');
    for d in ${proj_structures[*]}
    do
        echo "mkdir ${d}"
    done;
}


# 初始化 frontend
function init_frontend() {
    echo "是否要 create-react-app? y/n:"
    read React_name

    if [[ -z "${React_name}" || "${React_name}" == "n"  ]];then
        echo "failed to create-react-app"
    else
        echo "npm config set registry https://registry.npm.taobao.org"
        echo "npx create-react-app ${React_name}"
    fi

    rm_some_files
}

function rm_some_files() {
    file_to_rm=('App.css' 'App.test.js' 'reportWebVitals.js' 'setupTests.js')
    for item in ${file_to_rm[*]}
    do
        echo "rm ./client/src/${item}"
    done
}

