// MIT License
//
// Copyright (c) 2019 Virtru Corporation
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { FormBox, FormBoxButton } from 'components/FormBox/FormBox';
import './UserSelect.css';

class UserSelect extends React.Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
  };

  handleSubmit(history) {
    const emailStr = document.getElementById('email').value.trim();

    if (!emailStr) {
      alert('A valid email address must be included');
      console.error('Ensure an email address is provided');
      return;
    }

    const loc = `auth?id=${emailStr}`;
    history.push(loc);
  }
  render() {
    const { history } = this.props;
    return (
      <FormBox
        onSubmit={e => {
          e.preventDefault();
          this.handleSubmit(history);
        }}
        title="Protect and Track"
        instruction="Welcome! Enter your e-mail below and click 'Start' to begin the demo."
      >
        <input
          type="email"
          className="UserSelect-input"
          id="email"
          placeholder="some-user@domain.com"
          autoFocus
        />
        <FormBoxButton
          id="startbutton"
          onClick={e => {
            e.preventDefault();
            this.handleSubmit(history);
          }}
        >
          Select
        </FormBoxButton>
      </FormBox>
    );
  }
}

export default withRouter(UserSelect);
