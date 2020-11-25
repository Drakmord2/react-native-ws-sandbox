#!/bin/sh

echo -e "\n[+] Starting React Native App\n";
cd ./ReactNativeWS;
npx react-native run-ios --simulator "iPhone 8";

echo -e "\n[+] Starting NodeJS Server\n";
cd ../Server;
npm run dev;
