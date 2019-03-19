// @flow
import * as R from 'ramda';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, Form, FormGroup, FormLabel, FormControl, Button, Alert } from 'react-bootstrap';

import instituteAccountMocks from '../account/institute_account_mocks';

type Props = {
  onSignIn: (account: Account) => void
}

/**
 * Responsável por renderizar a página de login do instituto
 */
class InstituteSigninPage extends Component<Props> {
  state = {
    email: '',
    password: ''
  };

  props: Props;

  /**
   * Quando o usuário digital em qualquer um dos campos (email ou senha), essa função
   * é chamada para atualizar o estado do componente.
   */
  onChange = (field: string, value: string) => {
    this.setState({ [field]: value });
  }

  /**
   * Quando o usuário clica o botão para submeter o formulário essa função é chamada.
   */
  onSubmit = (e) => {
    const { email, password } = this.state;
    /**
     * O comportamento padrão de um formulário é recarregar a página quando um formulário
     * é submetido. Nesse caso, chamamos a função "preventDefault" do evento para previnir que isso aconteça
     */
    e.preventDefault();
    /**
     * Se o usuário esquecer de preencher ou o email ou a senha, mostrar uma mensagem de alerta .
     */
    if (!email || !password) {
      alert('Os campos email and senha são ambos obrigatórios');
    } else {
      const account = R.find((acc: Account) => acc.email === email && acc.password === password, instituteAccountMocks);
      if (account) {
        this.props.onSignIn(account);
      } else {
        alert('Credenciais incorretas');
      }
    }
  }

  render() {
    return (
      <Card>
        <Card.Header className="text-center">Acessar Conta</Card.Header>
        <Card.Body>
          <Form onSubmit={this.onSubmit}>
            <FormGroup>
              <FormLabel htmlFor="email">Email</FormLabel>
              <FormControl
                id="email"
                placeholder="email@fiap|uniban|faap.com"
                onChange={(e) => this.onChange('email', e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <FormLabel htmlFor="password">Senha</FormLabel>
              <FormControl
                id="password"
                placeholder="fiap|uniban|faap123"
                onChange={(e) => this.onChange('password', e.target.value)}
              />
            </FormGroup>
            <Button type="submit" block>Acessar Conta</Button>
          </Form>
          <p className="text-center">
            <small>
              Ainda não possui uma conta? <Link to="/signup">Criar Conta</Link>
            </small>
          </p>
        </Card.Body>
      </Card>
    );
  }
}

export default InstituteSigninPage;
