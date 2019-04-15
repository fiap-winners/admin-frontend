// @flow

import React, { Component } from 'react';
import { Table, Button, ButtonGroup } from 'react-bootstrap';
import * as R from 'ramda';
import * as utils from '../../utils';

import DocumentViewModal from './document_view_modal';
import NewDocumentVersionModal from './new_document_version_modal';

type Props = {
  documents: Array<any>,
  createDocument: (document: any) => void
}

type State = {
  isNewVersionModalOpen: boolean,
  newVersionDocument: any,
  isViewModalOpen: boolean,
  viewDocumentGroup: Array<any>
};

export default class DocumentList extends Component<Props, State> {
  state = {
    isViewModalOpen: false
  }

  openViewModal = (viewDocumentGroup: Array<any>) => {
    this.setState({ isViewModalOpen: true, viewDocumentGroup });
  }

  closeViewModal = () => {
    this.setState({ isViewModalOpen: false, viewDocumentGroup: undefined });
  }

  openNewVersionModal = (newVersionDocument: Array<any>) => {
    this.setState({ isNewVersionModalOpen: true, newVersionDocument });
  }

  closeNewVersionModal = () => {
    this.setState({ isNewVersionModalOpen: false, newVersionDocument: undefined });
  }

  render() {
    const { documents } = this.props;
    return (
      <div className="table-responsive">
        <Table striped bordered>
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
                  <td>{firstDoc.type.name}</td>
                  <td>{firstDoc.department.name}</td>
                  <td>{firstDoc.course.name}</td>
                  <td>{documentGroup.length}</td>
                  <td>
                    <ButtonGroup size="sm">
                      <Button
                        variant="outline-primary"
                        onClick={() => this.openViewModal(documentGroup)}
                      >Visualizar</Button>
                      <Button
                        variant="outline-primary"
                        onClick={() => this.openNewVersionModal(documentGroup[0])}
                      >Nova Versão</Button>
                    </ButtonGroup>
                  </td>
                </tr>
              );
            }, utils.groupDocuments(documents))}
          </tbody>
        </Table>
        <DocumentViewModal
          onClose={this.closeViewModal}
          isOpen={this.state.isViewModalOpen}
          documentGroup={this.state.viewDocumentGroup}
        />
        <NewDocumentVersionModal
          onClose={this.closeNewVersionModal}
          isOpen={this.state.isNewVersionModalOpen}
          document={this.state.newVersionDocument}
          createDocument={this.props.createDocument}
        />
      </div>
    );
  }
}