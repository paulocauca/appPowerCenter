set linesize 1000 ;

SELECT '{"src_id" : "' || SRC_ID || '", "dbdnam" : "' ||
        (
            select DBDNAM from OPB_DBD where DBDID = OPB_SRC.DBDID
            and(DBDID,VERSION_NUMBER)in (select DBDID,MAX(VERSION_NUMBER) from OPB_DBD group by DBDID)
        )
        || '", "source_name" : "' || SOURCE_NAME || '", "checkout_user_id" : "' ||
       case
        WHEN checkout_user_id = 0 THEN
            'OK'
        ELSE
            (SELECT USER_NAME FROM REP_USERS WHERE USER_ID = OPB_SRC.checkout_user_id)
     END || '", "utc_checkin" : "' ||
     case
        WHEN utc_checkin <> 0 THEN
            'OK'
        ELSE
            'NOK'
     END || '",' ||  '"version_number" : "' || version_number || '"},'
FROM OPB_SRC
WHERE (SRC_ID,VERSION_NUMBER) IN (
    SELECT SRC_ID,MAX(VERSION_NUMBER) VERSION_NUMBER FROM OPB_SRC WHERE SRC_ID = &1 GROUP BY SRC_ID);