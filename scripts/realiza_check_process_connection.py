#!/app/server/python/install/bin/python3.5
# -*- coding: iso-8859-1 -*-

import sys
import cx_Oracle

connBIPREP = cx_Oracle.connect('repoadmin/pcoraprd2020@biprep2')
cursorBIPREP = connBIPREP.cursor()

CONNECTION = sys.argv[1]


sql ="""
    
SELECT TO_CHAR(START_TIME, 'DD/MM/YYYY HH24:MI:SS') START_TIME, WORKFLOW_NAME FROM (
  SELECT
    START_TIME,
    WORKFLOW_NAME
  FROM (

    SELECT
      max(START_TIME) START_TIME,
      WORKFLOW_NAME
    FROM OPB_WFLOW_RUN -- MAX DATE
    WHERE workflow_name IN (
      SELECT DISTINCT workflow_name
      FROM (SELECT DISTINCT
              z.subj_name,
              a.task_name     workflow_name,
              b.instance_name session_name,
              e.instance_name,
              DECODE(e.widget_type,
                     3, 'SOURCE',
                     2, 'TARGET',
                     11, 'LOOKUP'
              )               TYPE,
              d.object_name   VALUE
            FROM opb_task a,
              opb_task_inst b,
              opb_sess_cnx_refs c,
              opb_cnx d,
              opb_swidget_inst e,
              opb_subject z
            WHERE z.subj_id = a.subject_id
                  AND a.task_type = 71
                  AND a.task_id = b.workflow_id
                  AND b.task_type = 68
                  AND b.task_id = c.session_id
                  AND b.task_id = e.session_id
                  AND c.session_id = e.session_id
                  AND b.instance_id = c.session_inst_id
                  AND c.sess_widg_inst_id = e.sess_widg_inst_id
                  AND e.widget_type IN (2, 3, 11)
                  AND b.instance_id IN (SELECT c.session_inst_id
                                        FROM opb_sess_cnx_refs
                                        WHERE c.session_id = b.task_id)
                  AND c.ref_object_id = d.object_id
                  AND d.object_type = 73
                  AND c.ref_object_subtyp <> 0
                  AND c.ref_object_type = 73
            UNION
            SELECT DISTINCT
              z.subj_name,
              a.task_name     workflow_name,
              b.instance_name session_name,
              e.instance_name,
              DECODE(e.widget_type,
                     3, 'SOURCE',
                     2, 'TARGET',
                     11, 'LOOKUP'
              )               TYPE,
              d.object_name   VALUE
            FROM opb_task a,
              opb_task_inst b,
              opb_sess_cnx_refs c,
              opb_cnx d,
              opb_swidget_inst e,
              opb_subject z
            WHERE z.subj_id = a.subject_id
                  AND a.task_type = 71
                  AND a.task_id = b.workflow_id
                  AND b.task_type = 68
                  AND b.task_id = c.session_id
                  AND b.task_id = e.session_id
                  AND c.session_id = e.session_id
                  AND c.session_inst_id = 0
                  AND c.sess_widg_inst_id = e.sess_widg_inst_id
                  AND e.widget_type IN (2, 3, 11)
                  AND b.instance_id NOT IN (SELECT c.session_inst_id
                                            FROM opb_sess_cnx_refs
                                            WHERE c.session_id = b.task_id)
                  AND c.ref_object_id = d.object_id
                  AND d.object_type = 73
                  AND c.ref_object_subtyp <> 0
                  AND c.ref_object_type = 73
                  AND (b.instance_id, c.sess_widg_inst_id) NOT IN (
              SELECT DISTINCT
                b.instance_id,
                c.sess_widg_inst_id
              FROM opb_task a,
                opb_task_inst b,
                opb_sess_cnx_refs c,
                opb_cnx d,
                opb_swidget_inst e,
                opb_subject z
              WHERE z.subj_id = a.subject_id
                    AND a.task_type = 71
                    AND a.task_id = b.workflow_id
                    AND b.task_type = 68
                    AND b.task_id = c.session_id
                    AND b.task_id = e.session_id
                    AND c.session_id = e.session_id
                    AND b.instance_id = c.session_inst_id
                    AND c.sess_widg_inst_id =
                        e.sess_widg_inst_id
                    AND e.widget_type IN (2, 3, 11)
                    AND b.instance_id IN (
                SELECT c.session_inst_id
                FROM opb_sess_cnx_refs
                WHERE c.session_id =
                      b.task_id)
                    AND c.ref_object_id = d.object_id
                    AND d.object_type = 73
                    AND c.ref_object_subtyp <> 0
                    AND c.ref_object_type = 73)
                  AND b.instance_id NOT IN (
              SELECT DISTINCT b.instance_id
              FROM opb_task a,
                opb_task_inst b,
                opb_sess_cnx_refs c,
                opb_cnx d,
                opb_swidget_inst e,
                opb_subject z
              WHERE z.subj_id = a.subject_id
                    AND a.task_type = 71
                    AND a.task_id = b.workflow_id
                    AND b.task_type = 68
                    AND b.task_id = c.session_id
                    AND b.task_id = e.session_id
                    AND c.session_id = e.session_id
                    AND c.sess_widg_inst_id =
                        e.sess_widg_inst_id
                    AND e.widget_type IN (2, 3, 11)
                    AND c.ref_object_id = 0
                    AND d.object_type = 73
                    AND c.ref_object_subtyp = 0
                    AND c.ref_object_type <> 0
                    AND b.instance_id = c.session_inst_id
                    AND (b.instance_id,
                         c.sess_widg_inst_id
                        ) NOT IN (
                          SELECT DISTINCT
                            b.instance_id,
                            c.sess_widg_inst_id
                          FROM opb_task a,
                            opb_task_inst b,
                            opb_sess_cnx_refs c,
                            opb_cnx d,
                            opb_swidget_inst e,
                            opb_subject z
                          WHERE z.subj_id =
                                a.subject_id
                                AND a.task_type = 71
                                AND a.task_id =
                                    b.workflow_id
                                AND b.task_type = 68
                                AND b.task_id =
                                    c.session_id
                                AND b.task_id =
                                    e.session_id
                                AND c.session_id =
                                    e.session_id
                                AND b.instance_id =
                                    c.session_inst_id
                                AND c.sess_widg_inst_id =
                                    e.sess_widg_inst_id
                                AND e.widget_type IN
                                    (2, 3, 11)
                                AND b.instance_id IN (
                            SELECT c.session_inst_id
                            FROM opb_sess_cnx_refs
                            WHERE c.session_id =
                                  b.task_id)
                                AND c.ref_object_id =
                                    d.object_id
                                AND d.object_type =
                                    73
                                AND c.ref_object_subtyp <>
                                    0
                                AND c.ref_object_type =
                                    73))
            UNION
            SELECT DISTINCT
              z.subj_name,
              a.task_name        workflow_name,
              b.instance_name    session_name,
              e.instance_name,
              DECODE(e.widget_type,
                     3, 'SOURCE',
                     2, 'TARGET',
                     11, 'LOOKUP'
              )                  TYPE,
              c.ref_object_value VALUE
            FROM opb_task a,
              opb_task_inst b,
              opb_sess_cnx_refs c,
              opb_cnx d,
              opb_swidget_inst e,
              opb_subject z
            WHERE z.subj_id = a.subject_id
                  AND a.task_type = 71
                  AND a.task_id = b.workflow_id
                  AND b.task_type = 68
                  AND b.task_id = c.session_id
                  AND b.task_id = e.session_id
                  AND c.session_id = e.session_id
                  AND c.sess_widg_inst_id = e.sess_widg_inst_id
                  AND e.widget_type IN (2, 3, 11)
                  AND c.ref_object_id = 0
                  AND d.object_type = 73
                  AND c.ref_object_subtyp = 0
                  AND c.ref_object_type <> 0
                  AND b.instance_id = c.session_inst_id
                  AND (b.instance_id, c.sess_widg_inst_id) NOT IN (
              SELECT DISTINCT
                b.instance_id,
                c.sess_widg_inst_id
              FROM opb_task a,
                opb_task_inst b,
                opb_sess_cnx_refs c,
                opb_cnx d,
                opb_swidget_inst e,
                opb_subject z
              WHERE z.subj_id = a.subject_id
                    AND a.task_type = 71
                    AND a.task_id = b.workflow_id
                    AND b.task_type = 68
                    AND b.task_id = c.session_id
                    AND b.task_id = e.session_id
                    AND c.session_id = e.session_id
                    AND b.instance_id = c.session_inst_id
                    AND c.sess_widg_inst_id =
                        e.sess_widg_inst_id
                    AND e.widget_type IN (2, 3, 11)
                    AND b.instance_id IN (
                SELECT c.session_inst_id
                FROM opb_sess_cnx_refs
                WHERE c.session_id =
                      b.task_id)
                    AND c.ref_object_id = d.object_id
                    AND d.object_type = 73
                    AND c.ref_object_subtyp <> 0
                    AND c.ref_object_type = 73)
            UNION
            SELECT DISTINCT
              z.subj_name,
              a.task_name                         workflow_name,
              b.instance_name                     session_name,
              e.instance_name,
              DECODE(e.widget_type, 11, 'LOOKUP') TYPE,
              c.ref_object_value                  VALUE
            FROM opb_task a,
              opb_task_inst b,
              opb_sess_cnx_refs c,
              opb_cnx d,
              opb_swidget_inst e,
              opb_subject z
            WHERE z.subj_id = a.subject_id
                  AND a.task_type = 71
                  AND a.task_id = b.workflow_id
                  AND b.task_type = 68
                  AND b.task_id = c.session_id
                  AND b.task_id = e.session_id
                  AND c.session_id = e.session_id
                  AND b.instance_id NOT IN (
              SELECT session_inst_id
              FROM opb_sess_cnx_refs
              WHERE session_id = b.task_id
                    AND session_inst_id = 0
                    AND ref_object_subtyp = 0
                    AND ref_object_type = 73
                    AND ref_object_id = 0)
                  AND c.sess_widg_inst_id = e.sess_widg_inst_id
                  AND e.widget_type IN (11)
                  AND b.instance_id NOT IN (
              SELECT c.session_inst_id
              FROM opb_sess_cnx_refs
              WHERE c.session_id = b.task_id
                    AND ref_object_id = 0)
                  AND c.ref_object_id = 0
                  AND d.object_type = 73
                  AND c.ref_object_subtyp = 0
                  AND c.ref_object_type = 73
                  AND ref_object_subtyp = 0
                  AND ref_object_id = 0
            UNION
            SELECT DISTINCT
              z.subj_name,
              a.task_name                                 workflow_name,
              b.instance_name                             session_name,
              e.instance_name,
              DECODE(e.widget_type, 6, 'STORED_PROCEDUE') TYPE,
              f.attr_value                                VALUE
            FROM opb_task a,
              opb_task_inst b,
              opb_widget_attr c,
              opb_swidget_inst e,
              opb_subject z,
              opb_swidget_attr f
            WHERE z.subj_id = a.subject_id
                  AND a.task_type = 71
                  AND a.task_id = b.workflow_id
                  AND b.task_type = 68
                  AND b.task_id = e.session_id
                  AND b.task_id = f.session_id
                  AND f.session_id = e.session_id
                  AND f.attr_id = 2
                  AND f.sess_widg_inst_id = e.sess_widg_inst_id
                  AND e.widget_type = 6
                  AND b.instance_id NOT IN (
              SELECT 0
              FROM opb_swidget_attr
              WHERE session_id = b.task_id
                    AND session_id = e.session_id)
                  AND c.widget_id = e.widget_id
                  AND c.widget_type = e.widget_type
                  AND c.widget_type = 6
                  AND c.attr_id = 2
            UNION
            SELECT DISTINCT
              z.subj_name,
              a.task_name                                  workflow_name,
              b.instance_name                              session_name,
              e.instance_name,
              DECODE(e.widget_type, 6, 'STORED_PROCEDURE') TYPE,
              c.attr_value
            FROM opb_task a,
              opb_task_inst b,
              opb_widget_attr c,
              opb_swidget_inst e,
              opb_subject z
            WHERE z.subj_id = a.subject_id
                  AND a.task_type = 71
                  AND a.task_id = b.workflow_id
                  AND b.task_type = 68
                  AND b.task_id = e.session_id
                  AND e.widget_type = 6
                  AND c.widget_id = e.widget_id
                  AND c.widget_type = e.widget_type
                  AND c.widget_type = 6
                  AND c.attr_id = 2
                  AND e.widget_id NOT IN (
              SELECT DISTINCT e.widget_id
              FROM opb_task a,
                opb_task_inst b,
                opb_widget_attr c,
                opb_swidget_inst e,
                opb_subject z,
                opb_swidget_attr f
              WHERE z.subj_id = a.subject_id
                    AND a.task_type = 71
                    AND a.task_id = b.workflow_id
                    AND b.task_type = 68
                    AND b.task_id = e.session_id
                    AND b.task_id = f.session_id
                    AND f.session_id = e.session_id
                    AND f.attr_id = 2
                    AND f.sess_widg_inst_id =
                        e.sess_widg_inst_id
                    AND e.widget_type = 6
                    AND b.instance_id NOT IN (
                SELECT 0
                FROM opb_swidget_attr
                WHERE session_id = b.task_id
                      AND session_id = e.session_id)
                    AND c.widget_id = e.widget_id
                    AND c.widget_type = e.widget_type
                    AND c.widget_type = 6
                    AND c.attr_id = 2)) DUAL
      WHERE trim(VALUE) LIKE '%' || :connection || '%'
      -- WHERE  VALUE  in (select OBJECT_NAME from OPB_CNX )
    )
    GROUP BY workflow_name

  )
  UNION ALL
  SELECT
    START_TIME,
    WORKFLOW_NAME
  FROM (

    SELECT
      max(START_TIME) START_TIME,
      WORKFLOW_NAME
    FROM OPB_WFLOW_RUN -- MAX DATE
    WHERE workflow_name IN (
      SELECT WORKFLOW_NAME
      FROM (
        SELECT DISTINCT
          z.subj_name,
          a.task_name     workflow_name,
          b.instance_name session_name,
          c.attr_value    VALUE
        FROM opb_task a, opb_task_inst b, opb_task_attr c, opb_subject z
        WHERE z.subj_id = a.subject_id
              AND a.task_type = 71
              AND a.task_id = b.workflow_id
              AND b.task_type = 68
              AND b.instance_id = c.instance_id
              AND c.task_type = 68
              AND b.task_id = c.task_id
              AND attr_id = 7
        UNION
        SELECT
          z.subj_name,
          a.task_name     workflow_name,
          b.instance_name session_name,
          c.attr_value    VALUE
        FROM opb_task a, opb_task_inst b, opb_task_attr c, opb_subject z
        WHERE z.subj_id = a.subject_id
              AND a.task_type = 71
              AND a.task_id = b.workflow_id
              AND b.task_type = 68
              AND c.instance_id = 0
              AND c.task_type = 68
              AND b.task_id = c.task_id
              AND attr_id = 7
              AND b.instance_id NOT IN (
          SELECT c.instance_id
          FROM opb_task a,
            opb_task_inst b,
            opb_task_attr c,
            opb_subject z
          WHERE z.subj_id = a.subject_id
                AND a.task_type = 71
                AND a.task_id = b.workflow_id
                AND b.task_type = 68
                AND b.instance_id = c.instance_id
                AND c.task_type = 68
                AND b.task_id = c.task_id
                AND attr_id = 7
        )
      )
      WHERE value LIKE '%' || :connection || '%'
    )
    GROUP BY workflow_name

  )
  ORDER BY START_TIME
)    
    
   
"""

v_column = cursorBIPREP.execute(sql, connection = CONNECTION ).fetchall()

cursorBIPREP.close()

data = []

for row in v_column:
    data.append(list(row))

print(data)