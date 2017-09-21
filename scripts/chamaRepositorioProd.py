#!/usr/bin/python

import sys
sys.path.append('/app/server/portal/appPowerCenter/scripts/mig_blpbill/libpython/lib64/python2.4/site-packages')

import cx_Oracle

#v_programToRun = sys.argv[1]

conRepProd = cx_Oracle.connect('repoadmin/pcoraprd2020@prep2')
corsorRepProd = conRepProd.cursor()



corsorRepProd.execute("SELECT SUBJ_ID, SUBJ_NAME FROM OPB_SUBJECT order by SUBJ_NAME")

for r in corsorRepProd.fetchall():
	 print (r)

corsorRepProd.close()
conRepProd.close()