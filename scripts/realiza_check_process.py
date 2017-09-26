#!/app/server/python/install/bin/python3.5
# -*- coding: iso-8859-1 -*-

import sys
import cx_Oracle

connBIPREP = cx_Oracle.connect('repoadmin/pcoraprd2020@biprep2')
cursorBIPREP = connBIPREP.cursor()

WF = sys.argv[1]


sql ="""
    SELECT 
        S.SUBJECT_AREA FOLDER, 
        R.COMMENTS, 
        R.OBJECT_NAME, 
        OT.OBJECT_TYPE_NAME TYPE_NAME, 
        R.VERSION_NUMBER VERSION, 
        R.SAVED_FROM, 
        to_char(to_date(R.LAST_SAVED,'mm/dd/yyyy hh24:mi:ss'),'dd/mm/yyyy hh24:mi:ss') LAST_SAVED 
    FROM 
        REP_VERSION_PROPS R, 
        REP_SUBJECT S, 
        REP_USERS T, 
        OPB_OBJECT_TYPE OT 
    WHERE 
      S.SUBJECT_ID = R.SUBJECT_ID AND 
      R.USER_ID = T.USER_ID and 
      R.OBJECT_TYPE = OT.OBJECT_TYPE_ID AND 
      R.OBJECT_TYPE IN (1,2,21,71,72) and 
      upper(R.object_name) like  '%' || upper(:workflow) || '%' 
    order by 
      to_date(R.LAST_SAVED,'mm/dd/yyyy hh24:mi:ss') desc"""

v_column = cursorBIPREP.execute(sql, workflow = WF ).fetchall()

cursorBIPREP.close()

data = []

for row in v_column:
    data.append(list(row))

print(data)