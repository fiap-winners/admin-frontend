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
  fetchedDocuments: Boolean,
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
    if (!this.props.fetchedDocuments) {
      this.props.fetchDocuments(1);
    }
  }

  openCreateModal = () => {
    this.setState({ isCreateModalOpen: true });
  }

  closeCreateModal = () => {
    this.setState({ isCreateModalOpen: false });
  }

  createDocument = (document: any) => {
    this.props.createDocument(Object.assign({}, document, {
      id: Date.now(),
      institute: 1
    }));
  }

  renderEmpty = () => (
    <Alert variant="info" style={{ marginTop: 16 }}>Não há documentos para listar</Alert>
  );

  render() {
    const { documents } = this.props;
    return (
      <div>
        <Button onClick={this.openCreateModal}>Novo Documento</Button>
        <Alert variant="info" style={{ marginTop: 15 }}>
          <strong>Para garantir que os documentos não sofram alteração, eles são armazenados em <a href="https://en.wikipedia.org/wiki/Blockchain" _target="blank">blockchain</a>. </strong>
          Com isso, os documentos que possuem as propriedades aluno, tipo de documento, departamento e curso iguais fazem
         parte da mesma corrente de documentos. Considere cada documento em uma única corrente como uma versão.
        </Alert>
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
  const { document: { data, meta } } = state;
  return {
    documents: data,
    fetchedDocuments: meta.fetched,
    fetchingDocuments: meta.fetching
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchDocuments, createDocument }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DocumentListContainer);