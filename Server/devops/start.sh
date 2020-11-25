#!/bin/bash

ENV=$ENVIRONMENT;

cd /var/www/node;

echo "Starting Node container";

if [ "$ENV" = "production" ]
then
    npm run start;
else
    npm run dev;
fi
