#!/usr/bin/python
# -*- coding: iso-8859-1 -*-

import sys
sys.path.append('/app/dados/mig_blpbill/libpython/lib64/python2.4/site-packages')


import cx_Oracle
v_owner = sys.argv[1]
v_table	= sys.argv[2]
v_owner_table = v_owner + '.' + v_table

#print "Trabalhando com a Tabela : " + v_owner_table
#Cria conexões 
conBLPBILL_ANT = cx_Oracle.connect('bi_prod/gvt25gvt@blpbill')
conBLPBILL_NOV = cx_Oracle.connect('bi_prod/gvt25gvt@blpbill3')

#Cria Cursor 
cursorBLPBILL_ANT = conBLPBILL_ANT.cursor()
cursorBLPBILL_NOV = conBLPBILL_NOV.cursor()

#Realiza a contagem de registros na BASE ANTIGA
countBLPBILL_ANT = cursorBLPBILL_ANT.execute('select count(1) from ' + v_owner_table).fetchone()
columns = cursorBLPBILL_ANT.execute('select COLUMN_NAME from all_tab_columns where table_name = \'' +  v_table + '\' and owner = \'' + v_owner +'\' order by column_id').fetchall()  

vInsert = "INSERT INTO " + v_owner_table  
vValues = " VALUES (" 
vCoumns = " ("

#Monta Values
for i in range(len(columns)):
  vValues += ":"+str(i+1)
  if i+1 < len(columns) :
	vValues += ","
vValues += ")"

#Monta Columns para insert 
for j in range(len(columns)):
	vCoumns += str(columns[j]).replace('(','').replace(')','').replace('\'','').replace(',','')
	if j+1 < len(columns) :
		vCoumns += ","
		
vCoumns += ")"

vPrepere = vInsert + vCoumns + vValues

#print vPrepere

vCoumnsSel =''
#Monta Columns para select 
for h in range(len(columns)):
	#vCoumnsSel += "nvl("
	vCoumnsSel += str(columns[h]).replace('(','').replace(')','').replace('\'','').replace(',','')
	#vCoumnsSel += ",'')"
	if h+1 < len(columns) :
		vCoumnsSel += ","

c_cursor = [] 	
c_final_cursor = []
if countBLPBILL_ANT[0] > 100000000 :
	print "Quantidade excede o limite permitido : " + v_owner_table + "\t" + str(countBLPBILL_ANT[0])
else :
	cursorBLPBILL_ANT.execute("ALTER SESSION SET NLS_DATE_FORMAT = 'DD/MM/YYYY HH24:MI:SS'")
	v_cursor = cursorBLPBILL_ANT.execute('SELECT ' + vCoumnsSel + ' FROM ' + v_owner_table).fetchall()

	for row in v_cursor:
		for v_tup in row :
			if v_tup is None:
				c_cursor.append("")
			else:
				c_cursor.append(v_tup)

		c_final_cursor += (tuple(c_cursor),)
		c_cursor = []
		
	
	#Altera data
	cursorBLPBILL_NOV.prepare(vPrepere)
	print(cursorBLPBILL_NOV)
	cursorBLPBILL_NOV.executemany(None, c_final_cursor)
	conBLPBILL_NOV.commit()
	conBLPBILL_NOV.commit()
	countBLPBILL_NOV = cursorBLPBILL_NOV.execute('select count(1) from ' + v_owner_table).fetchone()
	if countBLPBILL_ANT[0] == countBLPBILL_NOV[0] :
		print "MIG SUCESSO : ANT -> " + v_owner_table + "\t\t\t" + str(countBLPBILL_ANT[0]) + "\t\t\t" + str(countBLPBILL_NOV[0])
	else : 
		print "MIG ERRO : ANT -> " + v_owner_table + "\t\t\t" + str(countBLPBILL_ANT[0]) + "\t\t\t" + str(countBLPBILL_NOV[0])
	

cursorBLPBILL_ANT.close()
cursorBLPBILL_NOV.close()
conBLPBILL_ANT.close()
conBLPBILL_NOV.close()
c_final_cursor = []
