// @flow

import * as R from 'ramda';
import React, { Component } from 'react';
import ReactSelect from 'react-select';
import { Form, FormGroup, FormLabel, Row, Col, Button, Modal } from 'react-bootstrap';

const initialState = {
  department: undefined,
  course: undefined,
  student: undefined,
  type: undefined,
  content: '',
};

type Props = {
  students: Array<any>,
  departments: Array<any>,
  documentTypes: Array<any>
};

type State = {
  department: any,
  course: any,
  student: any,
  type: any,
  content: string
}

export default class CreateDocumentModal extends Component<Props, State> {
  state = initialState;

  onChange = (field: string, value: string) => {
    if (field === 'department') {
      this.setState({ [field]: value, course: undefined });
    } else {
      this.setState({ [field]: value });
    }
  }

  onSubmit = (e) => {
    const { department, course, student, type, content } = this.state;
    e.preventDefault();
    if (!department || !course || !student || !type || !content) {
      alert('Todos os campos são obrigatórios');
    } else {
      this.props.createDocument(this.state);
      setTimeout(() => {
        this.setState(initialState);
        this.props.onClose();
      }, 10);
    }
  }

  getCoursesForSelectedDepartment = () => {
    if (!this.state.department) {
      return undefined;
    }
    const d = R.find(R.propEq('id', this.state.department.id), this.props.departments);
    return d ? d.courses : undefined;
  }

  renderSelectField = (label, name, value, options) => (
    <FormGroup>
      <FormLabel>{label}</FormLabel>
      <ReactSelect
        value={value}
        options={!!options && R.map(o => ({ label: o.name, value: o.id }), options)}
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
                  this.props.students
                )}
              </Col>
              <Col>
                {this.renderSelectField(
                  'Tipo', 'type', !!type && { value: type.id, label: type.name },
                  this.props.documentTypes
                )}
              </Col>
              <Col>
                {this.renderSelectField(
                  'Departamento', 'department', !!department && { value: department.id, label: department.name },
                  this.props.departments
                )}
              </Col>
              <Col>
                {this.state.department && (
                  this.renderSelectField(
                    'Curso', 'course', !!course && { value: course.id, label: course.name },
                    this.getCoursesForSelectedDepartment()
                  )
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