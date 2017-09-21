set linesize 1000 ;


SELECT '{"task_id" : "' || TASK_ID || '","task_name" : "' || TASK_NAME || '"},' 
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
        AND SUBJECT_ID = &1 -- FOLDEr 
        GROUP BY TASK_ID) ORDER BY TASK_NAME;
