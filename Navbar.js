// src/components/layout/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/authActions';
import PropTypes from 'prop-types';

const Navbar = ({ auth: { isAuthenticated, loading, user }, logout }) => {
  const authLinks = (
    <ul className="navbar-nav">
      <li>
        <div className="token-display">
          <i className="fas fa-coins token-icon"></i>
          <span className="token-count">{user ? user.tokenBalance : 0}</span>
        </div>
      </li>
      <li>
        <Link to="/dashboard">Dashboard</Link>
      </li>
      <li>
        <Link to="/tokens">Buy Tokens</Link>
      </li>
      <li>
        <Link to="/new-reading">New Reading</Link>
      </li>
      <li>
        <Link to="/history">History</Link>
      </li>
      <li>
        <a onClick={logout} href="#!">
          <i className="fas fa-sign-out-alt"></i>{' '}
          <span className="hide-sm">Logout</span>
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul className="navbar-nav">
      <li>
        <Link to="/tarot-deck">Free Reading</Link>
      </li>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </ul>
  );

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-brand">
          <Link to="/">
            <img src="/images/logo.png" alt="Psychic Tarot" />
            <h1>Psychic Tarot</h1>
          </Link>
        </div>
        {!loading && (
          <div className="navbar-menu">
            {isAuthenticated ? authLinks : guestLinks}
          </div>
        )}
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navbar);
