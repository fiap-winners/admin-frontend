// @flow
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom';
import { Nav, Navbar } from 'react-bootstrap';

import InstituteDashboardPage from './institute/dashboard/institute_dashboard_page';
import InstituteAccountPage from './institute/account/institute_account_page';
import InstituteSigninPage from './institute/authentication/institute_signin_page';
import InstituteSignupPage from './institute/authentication/institute_signup_page';

type Props = {
  getAccountFromLocalStorage: () => void,
  removeAccountFromLocalStorage: () => void,
  addAccountToLocalStorage: (account: Account) => void
};

class App extends Component<Props> {
  constructor(props: Props) {
    super(props);
    this.state = {
      account: props.getAccountFromLocalStorage()
    };
  }

  /**
   * Faz login
   */
  onSignIn = (account: Account) => {
    this.setState({ account });
    /**
     * Quando o usuário faz login, precisamos adicionar o objeto "account" ao localStorage
     * do nagevador para sabermos que o mesmo está logado.
     */
    this.props.addAccountToLocalStorage(account);
  };

  /**
   * Faz logout
   */
  onSignOut = () => {
    this.setState({ account: undefined });
    /**
     * Quando o usuário click o botão "Sair", esta função é chamada para remover o 
     * object "account" do localStorage do navegador
     */
    this.props.removeAccountFromLocalStorage();
  };

  /**
   * Renderiza as páginas do admin
   */
  renderAdminPages = () => {
    const account = this.props.getAccountFromLocalStorage();
    return (
      <Router>
        <div className="container admin">
          <Navbar bg="light" variant="light">
            <Link className="navbar-brand" to="/">Trust Academy</Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ml-auto">
                <NavLink className="nav-link" to="/account">Conta</NavLink>
                <Link
                  to="/"
                  className="nav-link"
                  variant="outline-dard"
                  onClick={this.onSignOut}
                >Sair</Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <Route exact path="/" component={() => <InstituteDashboardPage account={account} />} />
          <Route path="/account" component={() => <InstituteAccountPage account={account} />} />
        </div>
      </Router>
    );
  };

  /**
   * Renderiza as páginas de autenticação
   */
  renderAuthenticationPages = () => (
    <Router>
      <div className="authentication">
        <Route exact path="/" component={() => <InstituteSigninPage onSignIn={this.onSignIn} />} />
        <Route path="/signup" component={InstituteSignupPage} />
      </div>
    </Router>
  );

  render() {
    /**
     * Se o usuário estiver logado, haverá um object "account" no localStorage do navegador.
     * Neste caso, podemos renderizar as páginas de admin, caso contrário renderizamos
     * as páginas de autenticação.
     */
    return !!this.state.account
      ? this.renderAdminPages()
      : this.renderAuthenticationPages();
  }
}

export default App;
