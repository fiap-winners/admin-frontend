import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';

/**
 * Responsável por renderizar a página de criar conta do instituto
 */
class InstituteSignupPage extends Component {
  render() {
    return (
      <Card>
        <Card.Header className="text-center">Criar Conta</Card.Header>
        <Card.Body>Formulário para criar a conta do instituto. <Link to="/">Voltar</Link>.</Card.Body>
      </Card>
    );
  }
}

export default InstituteSignupPage;
