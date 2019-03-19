// @flow

import * as R from 'ramda';
import React, { Component } from 'react';
import { Alert, Table, Button } from 'react-bootstrap';
import DocumentCreateForm from './document_create_form';


type Props = {};

type State = {
  documents: Array<Document>
};

export default class DocumentListContainer extends Component<Props, State> {
  state = {
    documents: [],
    isCreateModalOpen: false
  };

  openCreateModal = () => {
    this.setState({ isCreateModalOpen: true });
  }

  closeCreateModal = () => {
    this.setState({ isCreateModalOpen: false });
  }

  createDocument = (document: Document) => {
    this.setState((prevState: State) => {
      const updatedDocuments = R.append(document, prevState.documents);
      return { documents: updatedDocuments };
    });
  }

  renderEmpty = () => (
    <Alert variant="info" style={{ marginTop: 16 }}>Ainda não possiu documentos</Alert>
  );

  renderList = (documents: Array<Document>) => (
    <Table striped bordered style={{ marginTop: 16 }}>
      <thead>
        <tr>
          <th>Curso</th>
          <th>Aluno</th>
          <th>Tipo</th>
          <th>Documento</th>
        </tr>
      </thead>
      <tbody>
        {R.addIndex(R.map)((document: Document, idx: number) => (
          <tr key={idx}>
            <td>{document.courseId}</td>
            <td>{document.studentId}</td>
            <td>{document.documentType}</td>
            <td><a href={document.file} download>Download</a></td>
          </tr>
        ), documents)}
      </tbody>
    </Table>
  );

  render() {
    const { documents } = this.state;
    return (
      <div>
        <Button onClick={this.openCreateModal}>Criar Documento</Button>
        <DocumentCreateForm
          onClose={this.closeCreateModal}
          isOpen={this.state.isCreateModalOpen}
          createDocument={this.createDocument}
        />
        {!!documents.length ? this.renderList(documents) : this.renderEmpty()}
      </div>
    );
  }
}