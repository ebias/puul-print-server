#!/bin/bash
curl https://pitunnel.com/install/ttDoUffj6 | sudo python &
sudo apt-get update -y 
sudo apt-get install nodejs npm git -y 
sudo npm install pm2@latest -g
cd ~
rm -rf puul-print-server
git clone https://github.com/ebias/puul-print-server.git
cd puul-print-server
npm install
sudo pm2 start index.js
sudo pm2 startup
sudo pm2 save