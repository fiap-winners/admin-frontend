// @flow

import React from 'react';
import { Table, Button } from 'react-bootstrap';
import * as R from 'ramda';
import * as utils from '../../utils';

type Props = {
  documents: Array<any>
}

export default function DocumentList({ documents }: Props) {
  return (
    <Table striped bordered style={{ marginTop: 16 }}>
      <thead>
        <tr>
          <th>Aluno</th>
          <th>Tipo</th>
          <th>Departamento</th>
          <th>Curso</th>
          <th>Versões</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {R.map((documentGroup: any) => {
          const firstDoc = documentGroup[0];
          return (
            <tr key={firstDoc.id}>
              <td>{firstDoc.student.name}</td>
              <td>{firstDoc.type}</td>
              <td>{firstDoc.department.name}</td>
              <td>{firstDoc.course.name}</td>
              <td>{documentGroup.length}</td>
              <td>
                <Button size="sm">Nova Versão</Button>
              </td>
            </tr>
          );
        }, utils.groupDocuments(documents))}
      </tbody>
    </Table>
  );
}