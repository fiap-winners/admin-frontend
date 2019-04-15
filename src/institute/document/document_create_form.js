// @flow

import React, { Component } from 'react';
import ReactSelect from 'react-select';
import { Form, FormGroup, FormLabel, Row, Col, Button, Modal } from 'react-bootstrap';

const initialState = {
  department: undefined,
  course: undefined,
  student: undefined,
  type: undefined,
  content: ''
};

export default class DocumentCreateForm extends Component {
  state = initialState;

  onChange = (field: string, value: string) => {
    this.setState({ [field]: value });
  }

  onSubmit = (e) => {
    const { department, course, student, type, content } = this.state;
    e.preventDefault();
    if (!department || !course || !student || !type || !content) {
      alert('Todos os campos são obrigatórios');
    } else {
      this.props.createDocument(this.state);
      this.setState(initialState);
      this.props.onClose();
    }
  }

  renderSelectField = (label, name, value, options) => (
    <FormGroup>
      <FormLabel>{label}</FormLabel>
      <ReactSelect
        value={value}
        options={options}
        onChange={(selected) => this.onChange(name, { id: selected.value, name: selected.label })}
      />
    </FormGroup>
  );

  render() {
    const { department, course, student, type, content } = this.state;
    return (
      <Modal size="lg" show={this.props.isOpen} onHide={this.props.onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Novo Documento</Modal.Title>
        </Modal.Header>
        <Form onSubmit={this.onSubmit}>
          <Modal.Body>
            <Row>
              <Col>
                {this.renderSelectField(
                  'Aluno', 'student', !!student && { value: student.id, label: student.name },
                  [
                    { label: 'Henrique Lopes', value: 1 },
                    { label: 'Leonardo Cristofani', value: 2 },
                    { label: 'Mauricio Carvalho', value: 3 },
                    { label: 'Pedro Silva', value: 4 },
                    { label: 'Tiago Silvino', value: 5 },
                  ]
                )}
              </Col>
              <Col>
                {this.renderSelectField(
                  'Tipo', 'type', !!type && { value: type.id, label: type.name },
                  [
                    { label: 'Histórico Escolar', value: 1 },
                    { label: 'Certificado de Conclusão', value: 2 },
                    { label: 'Certificado de Matrícular', value: 3 },
                  ]
                )}
              </Col>
              <Col>
                {this.renderSelectField(
                  'Departamento', 'department', !!department && { value: department.id, label: department.name },
                  [
                    { label: 'FIAP ON', value: 1 },
                    { label: 'FIAP OFF', value: 2 }
                  ]
                )}
              </Col>
              <Col>
                {this.renderSelectField(
                  'Curso', 'course', !!course && { value: course.id, label: course.name },
                  [
                    { label: 'Análise e desenv. de sistemas', value: 1 },
                    { label: 'Engenharia da computação', value: 2 },
                    { label: 'Marketing Digital', value: 3 }
                  ]
                )}
              </Col>
            </Row>
            <Row>
              <Col>
                <FormGroup>
                  <FormLabel>Conteúdo</FormLabel>
                  <textarea
                    value={content}
                    className="form-control"
                    onChange={(e) => this.onChange('content', e.target.value)}
                  />
                </FormGroup>
              </Col>
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