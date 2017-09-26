#!/bin/bash
#Busca as os processos que utilizam a determinada conexao e verifica as ultimas execucoes
#Paulo Cauca  - 26/09/2017

source ~/.bash_profile

python /app/server/portal/appPowerCenter/scripts/realiza_check_process_connection.py ${1}
