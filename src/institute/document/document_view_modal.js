// @flow

import * as R from 'ramda';
import React from 'react';
import * as utils from '../../utils';
import { Modal, Table, ListGroup } from 'react-bootstrap';

type Props = {
  isOpen: boolean,
  onClose: () => void,
  documentGroup: Array<any>
}

export default function DocumentViewModal({ isOpen, onClose, documentGroup }: Props) {
  return (
    <Modal size="lg" show={isOpen} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Visualizar documento</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!!documentGroup && (
          <div>
            <ListGroup style={{ marginBottom: 15 }}>
              <ListGroup.Item>Aluno: <strong>{documentGroup[0].student.name}</strong></ListGroup.Item>
              <ListGroup.Item>Tipo de documento: <strong>{documentGroup[0].type.name}</strong></ListGroup.Item>
              <ListGroup.Item>Departamento: <strong>{documentGroup[0].department.name}</strong></ListGroup.Item>
              <ListGroup.Item>Curso: <strong>{documentGroup[0].course.name}</strong></ListGroup.Item>
            </ListGroup>
            <h5>Versões</h5>
            <div className="table-responsive">
              <Table striped bordered>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Conteúdo</th>
                    <th>Data</th>
                  </tr>
                </thead>
                <tbody>
                  {R.addIndex(R.map)((doc: any, idx: number) => (
                    <tr key={doc.id}>
                      <td>{R.inc(idx)}</td>
                      <td>{doc.content}</td>
                      <td>{utils.formattedDateAndTime(doc.createdAt)}</td>
                    </tr>
                  ), documentGroup)}
                </tbody>
              </Table>
            </div>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
}