#!/usr/bin/bash

echo "the initial process of Node.js and React-app is working";

echo "npm init";
echo "touch app.js"

# 项目结构
proj_structures=('models' 'controllers' 'utils');

for d in ${proj_structures[*]}
do
    echo "mkdir ${d}"
done;

# 环境依赖
dependencies=('express' 'cors' 'mongoose' 'dotenv');
dev_dependencies=('nodemon' 'morgan' 'eslint');

for pkg in ${dependencies[*]}
do
    echo "npm install ${pkg}"
done;

for dev_pkg in ${dev_dependencies[*]}
do 
    echo "npm install --save-dev ${dev_pkg}"
done;

# create-react-app
echo "是否要create-react-app? y/n:"

read React_name
if [[ -z "${React_name}" || "${React_name}" == "n"  ]];then
    echo "don't create-react-app"
else
    echo "npm config set registry https://registry.npm.taobao.org"
    echo "npx create-react-app ${React_name}"
fi

file_to_rm=('App.css' 'App.test.js' 'reportWebVitals.js' 'setupTests.js')
for item in ${file_to_rm[*]}
do
    echo "rm ./client/src/${item}"
done
