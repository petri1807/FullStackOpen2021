import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BlogForm } from './BlogForm';

describe('<BlogForm /> calls', () => {
  test('submitHandler with correct data', () => {
    const createBlog = jest.fn();

    const { getByPlaceholderText, getByRole } = render(
      <BlogForm createBlog={createBlog} />
    );

    userEvent.type(getByPlaceholderText('Title'), 'Tests are fun');
    userEvent.type(getByPlaceholderText('Author'), 'Petri Lindholm');
    userEvent.type(getByPlaceholderText('URL'), 'http://fullstackopen.com');

    fireEvent.click(getByRole('button', { name: 'Create' }));

    expect(createBlog.mock.calls).toHaveLength(1);
    expect(createBlog.mock.calls[0][0].author).toBe('Petri Lindholm');
    expect(createBlog.mock.calls[0][0].title).toBe('Tests are fun');
    expect(createBlog.mock.calls[0][0].url).toBe('http://fullstackopen.com');
  });
});
