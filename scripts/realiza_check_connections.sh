#!/bin/bash
#Mostra as connections do power center 
#Paulo Cauca  - 21/09/2017

source ~/.bash_profile

python /app/server/portal/appPowerCenter/scripts/realiza_check_connections.py ${1}
