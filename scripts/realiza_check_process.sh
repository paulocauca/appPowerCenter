#!/bin/bash
#Mostra as ultimas alteracoes do processo do power center
#Paulo Cauca  - 21/09/2017

source ~/.bash_profile

python /app/server/portal/appPowerCenter/scripts/realiza_check_process.py ${1}
