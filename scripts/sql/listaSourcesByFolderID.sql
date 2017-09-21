set linesize 1000 ;


SELECT '{"src_id" : "' || SRC_ID || '", "source_name" : "' || SOURCE_NAME || '----->>>' || OPB_DBD.DBDNAM || '"},'
FROM OPB_SRC,OPB_DBD
WHERE
       OPB_SRC.DBDID = OPB_DBD.DBDID
    AND OPB_SRC.SUBJ_ID = &1
    GROUP BY  SRC_ID,SOURCE_NAME,OPB_DBD.DBDNAM
ORDER BY SOURCE_NAME;