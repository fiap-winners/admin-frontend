// @flow

import React, { Component } from 'react';
import { Alert, Button } from 'react-bootstrap';
import DocumentCreateForm from './document_create_form';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import DocumentList from './document_list';

import { fetchDocuments, createDocument } from './data/document_actions';

type Props = {
  documents: Array<any>,
  fetchingDocuments: boolean,
  createDocument: (document: any) => void,
  fetchDocuments: (instituteId: number) => void
};

type State = {
  isCreateModalOpen: boolean
};

class DocumentListContainer extends Component<Props, State> {
  state = { isCreateModalOpen: false };

  componentDidMount() {
    this.props.fetchDocuments(1);
  }

  openCreateModal = () => {
    this.setState({ isCreateModalOpen: true });
  }

  closeCreateModal = () => {
    this.setState({ isCreateModalOpen: false });
  }

  createDocument = (document: any) => {
    this.props.createDocument({
      id: 4,
      institute: { id: 1, name: 'FIAP' },
      department: { id: 1, name: 'FIAP ON' },
      course: { id: 1, name: 'Análise e desenvolvimento de sistemas' },
      student: { id: 2, name: 'Leonardo Cristofani' },
      type: 'Histórico Escolar',
      content: 'Documento 2'
    });
  }

  renderEmpty = () => (
    <Alert variant="info" style={{ marginTop: 16 }}>Não há documentos para listar</Alert>
  );

  render() {
    const { documents } = this.props;
    return (
      <div>
        <Button onClick={this.openCreateModal}>Novo Documento</Button>
        <DocumentCreateForm
          onClose={this.closeCreateModal}
          isOpen={this.state.isCreateModalOpen}
          createDocument={this.createDocument}
        />
        {!!documents.length ? <DocumentList documents={documents} /> : this.renderEmpty()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    documents: state.document.data,
    fetchingDocuments: state.document.meta.fetching
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchDocuments, createDocument }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DocumentListContainer);