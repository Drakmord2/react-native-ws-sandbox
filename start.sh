#!/bin/sh

LOAD=$1;

if [ "$LOAD" = "-app" ] || [ "$LOAD" = "" ] 
then
  echo "\n[+] Starting React Native App\n";
  cd ./ReactNativeWS;
  npx react-native run-ios --simulator "iPhone 8";
  cd ..;
fi

if [ "$LOAD" = "-server" ] || [ "$LOAD" = "" ]
then
  echo "\n[+] Starting NodeJS Server\n";
  cd ./Server;
  npm run dev;
fi

