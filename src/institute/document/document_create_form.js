// @flow

import React, { Component } from 'react';
import { Form, FormGroup, FormLabel, FormControl, Row, Col, Button, Modal } from 'react-bootstrap';

const initialState = {
  courseId: '',
  studentId: '',
  documentType: '',
};

export default class DocumentCreateForm extends Component {
  state = initialState;

  onChange = (field: string, value: string) => {
    this.setState({ [field]: value });
  }

  onSubmit = (e) => {
    const { courseId, studentId, documentType } = this.state;
    e.preventDefault();
    if (!courseId || !studentId || !documentType) {
      alert('Todos os campos são obrigatórios');
    } else {
      this.props.createDocument(this.state);
      this.setState(initialState);
      this.props.onClose();
    }
  }

  renderField = (id: string, label: string, value: string, type: string = 'text') => (
    <Col lg={4}>
      <FormGroup>
        <FormLabel htmlFor={id}>{label}</FormLabel>
        <FormControl
          id={id}
          type={type}
          value={value}
          onChange={(e) => { this.onChange(id, e.target.value); }}
        />
      </FormGroup>
    </Col>
  );

  render() {
    const { courseId, studentId, documentType } = this.state;
    return (
      <Modal size="lg" show={this.props.isOpen} onHide={this.props.onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Criar Documento</Modal.Title>
        </Modal.Header>
        <Form onSubmit={this.onSubmit}>
          <Modal.Body>
            <Row>
              {this.renderField('courseId', 'Id do curso', courseId)}
              {this.renderField('studentId', 'Id do aluno', studentId)}
              {this.renderField('documentType', 'Tipo de documento', documentType)}
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button type="submit">Criar Documento</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    );
  }
}