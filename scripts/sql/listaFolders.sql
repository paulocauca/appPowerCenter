set linesize 1000 ;

SELECT  '{"id" : "' || SUBJ_ID ||'","subj_name" : "'||SUBJ_NAME  || '"},' 
		FROM 
	OPB_SUBJECT order by SUBJ_NAME;
