#!/app/server/python/install/bin/python3.5
# -*- coding: iso-8859-1 -*-

import sys
import cx_Oracle

connBIPREP = cx_Oracle.connect('repoadmin/pcoraprd2020@biprep2')
cursorBIPREP = connBIPREP.cursor()

CONNECTION = sys.argv[1]


sql ="""
    SELECT
      OBJECT_NAME,USER_NAME,CONNECT_STRING
    FROM
      OPB_CNX
    WHERE
      (
          UPPER(OBJECT_NAME) LIKE UPPER('%' || :connection || '%' ) OR
          UPPER(USER_NAME) LIKE UPPER('%' || :connection || '%' ) OR
          UPPER(CONNECT_STRING) LIKE UPPER('%' || :connection || '%' )
      )
"""

v_column = cursorBIPREP.execute(sql, connection = CONNECTION ).fetchall()

cursorBIPREP.close()

data = []

for row in v_column:
    data.append(list(row))

print(data)