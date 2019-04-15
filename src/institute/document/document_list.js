// @flow

import React, { Component, Fragment } from 'react';
import { Table, Button, ButtonGroup } from 'react-bootstrap';
import * as R from 'ramda';
import * as utils from '../../utils';

import DocumentViewModal from './document_view_modal';

type Props = {
  documents: Array<any>
}

type State = {
  isModalOpen: boolean,
  documentGroup: Array<any>
};

export default class DocumentList extends Component<Props, State> {
  state = {
    isModalOpen: false
  }

  openModal = (documentGroup: Array<any>) => {
    this.setState({ isModalOpen: true, documentGroup });
  }

  closeModal = () => {
    this.setState({ isModalOpen: false, documentGroup: undefined });
  }

  render() {
    const { documents } = this.props;
    return (
      <Fragment>
        <Table striped bordered style={{ marginTop: 16 }}>
          <thead>
            <tr>
              <th>Aluno</th>
              <th>Tipo de Documento</th>
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
                    <ButtonGroup size="sm">
                      <Button variant="outline-primary">Nova Versão</Button>
                      <Button
                        variant="outline-primary"
                        onClick={() => this.openModal(documentGroup)}
                      >
                        Visualizar
                      </Button>
                    </ButtonGroup>
                  </td>
                </tr>
              );
            }, utils.groupDocuments(documents))}
          </tbody>
        </Table>
        <DocumentViewModal
          onClose={this.closeModal}
          isOpen={this.state.isModalOpen}
          documentGroup={this.state.documentGroup}
        />
      </Fragment>
    );
  }
}