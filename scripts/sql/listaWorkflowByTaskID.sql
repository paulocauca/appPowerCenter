set linesize 1000 ;


SELECT  '{"task_id" : "' || task_id || '", "task_name" : "' || task_name || '", "is_valid" : "' || 
    case 
        WHEN is_valid = 1 THEN
             'OK'
        ELSE
             'NOK'
     END || '", "checkout_user_id" : "' ||  
     case 
        WHEN checkout_user_id = 0 THEN
            'OK'  
        ELSE
            (SELECT USER_NAME FROM REP_USERS WHERE USER_ID = OPB_TASK.checkout_user_id)
     END || '", "utc_checkin" : "' || 
     case 
        WHEN utc_checkin <> 0 THEN
            'OK'
        ELSE
            'NOK'
     END || '", "saved_valid" : "' ||  
     case 
        WHEN saved_valid = 1 THEN
            'OK'
        ELSE
            'NOK'
     END || '", "version_number" : "' || version_number || '"},'
 FROM OPB_TASK 
    WHERE
        (TASK_ID,VERSION_NUMBER) IN
(
SELECT 
    TASK_ID, MAX(VERSION_NUMBER)
    FROM 
        OPB_TASK 
    WHERE 
        TASK_TYPE = 71 -- WF
        and TASK_ID = &1
        GROUP BY TASK_ID);
