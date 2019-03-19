// @flow

import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import { Form, FormGroup, FormLabel, FormControl, Row, Col, Button, Modal } from 'react-bootstrap';

const initialState = {
  courseId: '',
  studentId: '',
  documentType: '',
  file: undefined
};

export default class DocumentCreateForm extends Component {
  state = initialState;

  onChange = (field: string, value: string) => {
    this.setState({ [field]: value });
  }

  onSubmit = (e) => {
    const { courseId, studentId, documentType, file } = this.state;
    e.preventDefault();
    if (!courseId || !studentId || !documentType || !file) {
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

  renderFileField = () => (
    <Dropzone onDrop={(acceptedFiles: []) => {
      if (acceptedFiles.length) {
        this.onChange('file', acceptedFiles[0].path);
      }
    }}>
      {({ getRootProps, getInputProps }) => (
        <div className="dropzone" {...getRootProps()}>
          {this.state.file ? this.state.file : 'Clique para adicionar um arquivo'}
          <input {...getInputProps()} />
        </div>
      )}
    </Dropzone>
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
              <Col xs={12}>{this.renderFileField()}</Col>
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