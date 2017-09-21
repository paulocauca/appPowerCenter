set linesize 1000 ;

SELECT  '{"instance_name":"' || instance_name ||   '","is_valid":"'|| 
case 
   WHEN is_valid = 1 THEN
        'OK'
   ELSE
        'NOK'
END
|| '","version_number":"' || version_number || '"},'
FROM (
	SELECT instance_name,is_enabled,is_valid,max(version_number) version_number
	FROM 
		OPB_TASK_INST 
	WHERE
		WORKFLOW_ID = &1
		and TASK_TYPE <> 62 -- Start 
		group by instance_name, is_enabled, is_valid order by 1
);
