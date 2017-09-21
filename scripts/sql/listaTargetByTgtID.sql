set linesize 1000 ;

SELECT '{"target_id" : "' || TARGET_ID || '", "target_name" : "' || TARGET_NAME || '", "checkout_user_id" : "' ||
       case
        WHEN checkout_user_id = 0 THEN
            'OK'
        ELSE
            (SELECT USER_NAME FROM REP_USERS WHERE USER_ID = OPB_TARG.checkout_user_id)
     END || '", "utc_checkin" : "' ||
     case
        WHEN utc_checkin <> 0 THEN
            'OK'
        ELSE
            'NOK'
     END || '",' ||  '"version_number" : "' || version_number || '"},'
FROM OPB_TARG
WHERE (TARGET_ID,VERSION_NUMBER) IN (
    SELECT TARGET_ID,MAX(VERSION_NUMBER) VERSION_NUMBER FROM OPB_TARG WHERE TARGET_ID = &1 GROUP BY TARGET_ID
    )
ORDER BY TARGET_NAME;