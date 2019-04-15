// @flow

import React, { Component } from 'react';
import { Modal, ListGroup, Form, Button, FormGroup, FormLabel } from 'react-bootstrap';

type Props = {
  document: any,
  isOpen: boolean,
  onClose: () => void,
  createDocument: (document: any) => void
}

type State = {
  content: boolean
}

export default class DocumentViewModal extends Component<Props, State> {
  state = {
    content: ''
  }

  onContentChange = (e) => {
    this.setState({ content: e.target.value });
  }

  onSubmit = (e) => {
    const now = Date.now();
    e.preventDefault();
    if (!this.state.content) {
      alert('O conteúdo é obrigatório');
    } else {
      this.props.createDocument(Object.assign({}, this.props.document, {
        id: now,
        createdAt: now,
        modifiedAt: now,
        content: this.state.content
      }));
      this.setState({ content: '' }, this.props.onClose);
    }
  }

  render() {
    const { isOpen, onClose, document } = this.props;
    return (
      <Modal size="lg" show={isOpen} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Nova Versão</Modal.Title>
        </Modal.Header>
        <Form onSubmit={this.onSubmit}>
          <Modal.Body>
            {!!document && (
              <div>
                <ListGroup style={{ marginBottom: 15 }}>
                  <ListGroup.Item>Aluno: <strong>{document.student.name}</strong></ListGroup.Item>
                  <ListGroup.Item>Tipo de documento: <strong>{document.type.name}</strong></ListGroup.Item>
                  <ListGroup.Item>Departamento: <strong>{document.department.name}</strong></ListGroup.Item>
                  <ListGroup.Item>Curso: <strong>{document.course.name}</strong></ListGroup.Item>
                </ListGroup>
                <FormGroup>
                  <FormLabel>Conteúdo</FormLabel>
                  <textarea
                    autoFocus
                    className="form-control"
                    onChange={this.onContentChange}
                  >{this.state.value}</textarea>
                </FormGroup>
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button type="submit">Criar Versão</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    );
  }
}