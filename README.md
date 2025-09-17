# Changana-Portuguese-Dicionary

This app will help young people in Mozambique learn Portuguese more easily, especially in villages with a weak education system.

I chose to use react native with Expo CLI (not React Native CLI) to make it easier

1. Initialize the basic expo application

npx create-expo-app@latest

2. Login to expo:

npx expo login

3. Start application with Fast Refresh

npx expo start

---

OLD -> Fast Refresh didn't work on docker. I should run on my pc, develop the first version, than 'dockerise' it

# Run docker container on node

docker run -it --entrypoint sh -p 8080:80 --mount type=bind,source=${PWD}\changanaDictionary,target=/app/Changana-Portuguese-Dicionary --name appDictionary node:22-alpine

# Installing Git and openssh on Linux Alpine container

apk update
apk add git
apk add openssh

# Starting ssh key

ssh-keygen -t ed25519 -C "your_email@example.com"

## Start the ssh-agent in the background:

eval "$(ssh-agent -s)"

## Add your SSH private key

ssh-add ~/.ssh/id_ed25519

## Copy and add to github account

cat ~/.ssh/id_ed25519.pub

# Start developing

git clone git@github.com:MateusOjeda/Changana-Portuguese-Dicionary.git .

# Starting React Native - Expo CLI

cd /app/Changana-Portuguese-Dicionary
npm init -y
npm i -g expo-cli

# Easy to start project

npx create-expo-app@latest

# Start server

npx expo start --tunnel

# Open QRcode on expo app to see on Android
