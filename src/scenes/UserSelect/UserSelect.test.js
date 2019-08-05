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
import { render, fireEvent, getByTestId } from '@testing-library/react';

import UserSelect from './UserSelect';
const history = { push: jest.fn() };

describe('UserSelect', () => {
  test('Should trigger alert and console.error with specific messages if form submitted with empty text input', () => {
    const { container } = render(<UserSelect history={{}} />);
    const consoleSpy = jest.spyOn(console, 'error');
    fireEvent.submit(getByTestId(container, 'formBox'));
    expect(window.alert).toBeCalledWith('A valid email address must be included');
    expect(consoleSpy).toBeCalledWith('Ensure an email address is provided');
  });

  test('Should push history with value stetted in email input', () => {
    const { container } = render(<UserSelect history={history} />);
    document.getElementById('email').value = 'fooBar';
    fireEvent.submit(getByTestId(container, 'formBox'));
    expect(history.push).toBeCalledWith('auth?id=fooBar');
  });
});
