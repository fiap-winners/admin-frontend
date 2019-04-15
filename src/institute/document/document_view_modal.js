// @flow

import * as R from 'ramda';
import React from 'react';
import { Modal, Table, Button } from 'react-bootstrap';

type Props = {
  isOpen: boolean,
  onClose: () => void,
  documentGroup: Array<any>
}

export default function DocumentViewModal({ isOpen, onClose, documentGroup }: Props) {
  return (
    <Modal size="lg" show={isOpen} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Versões do documento</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!!documentGroup && (
          <Table striped bordered>
            <thead>
              <tr>
                <th>Conteúdo</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {R.map((doc: any) => (
                <tr key={doc.id}>
                  <td>{doc.content}</td>
                  <td><Button size="sm">Copiar Link</Button></td>
                </tr>
              ), documentGroup)}
            </tbody>
          </Table>
        )}
      </Modal.Body>
    </Modal>
  );
}