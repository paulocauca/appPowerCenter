


#Seta DIR
dirInstall="/app/server/portal/appPowerCenter"
dirConn="${dirInstall}/scripts/conn/conn_bidrep2.sql"
dirWork="${dirInstall}/scripts/work"
dirSql="${dirInstall}/scripts/sql"

programToRun=$1
arqList="`echo $programToRun`.txt.${2}"
resList="result`echo $programToRun`.txt.${2}"
parmSQL1=$3
f_MONTA_PRINT(){
	tac $dirWork/$arqList | sed '1s/},/}/'| tac | sed 's/ //g' >> $dirWork/$resList
}



f_EXEC_QUERY(){
resListaFolder=`
sqlplus -s /nolog <<SQLPLUSEND

@${dirConn}
		set heading off
		set echo off
		set feedback off
		set pagesize 0
		SET VERIFY OFF
		
		alter session set NLS_LANGUAGE='BRAZILIAN PORTUGUESE';
		
spool $dirWork/$arqList
@${dirSql}/${programToRun} ${parmSQL1}
spool off
quit
SQLPLUSEND
`
if [ `echo $resListaFolder | wc -l` -gt 0 ]; then
	f_MONTA_PRINT "ERRO : true"
else
	f_MONTA_PRINT "ERRO : false"
fi
}

### PRINCIPAL ###

#trunca arquivos
> $dirWork/$arqList
> $dirWork/$resList

echo "[" >> $dirWork/$resList

f_EXEC_QUERY

## Tira a ultima "virgula" do arquivo


echo "]" >> $dirWork/$resList

cat $dirWork/$resList


###### ISP #####
#domainName=D_GVT_PRD
#userName=administrator
#userPass=102030
#getway=10.41.27.173:6005
#dirISP=/app/powercenter/PowerCenter9.1.0/isp/bin/

#cd $dirISP
#./infacmd.sh listFolders -dn $domainName -un $userName -pd $userPass -hp $getway

##################################################################

#dominio=D_GVT_PRD
#repositorio=GVT_BI_DSV
#integration=GVT_BI_INT
#host=svuxppmt2
#porta=6005
#user=PRODUCAO
#senha=biprod25

#dirInstalacao="/app/powercenterdev/PowerCenter9.1.0"
#cd $dirInstalacao/server/bin

#Realizo a conexão 
#connect=`pmrep connect -r $repositorio  -h $host -o $porta -n $user -x $senha`;

#if [ `echo $connect | grep "connect completed successfully" | wc -l ` -eq 1 ]; then
#	echo " conectou com sucesso .. ";
#else
#	echo "problema na conexao"
#fi

#Listo objetos
#listobjects=`pmrep listobjects -f DM_PTV -o workflow -c '|' `

#if [ `echo $listobjects | grep "completed successfully" | wc -l` -eq 1 ]; then
#	echo -e $listobjects
#else
#	echo "problema ao executar comando ou objeto nao encontrado"
#fi

#Valido Objetos


#pmrep findcheckout -f DM_Producao -o workflow

######################################################################################

