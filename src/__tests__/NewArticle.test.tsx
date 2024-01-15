/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, expect, test } from 'vitest';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import NewArticle from '../pages/NewArticle';

describe('Renders the Article page', () => {
  test('snapshot', () => {
    const comp = render(
      <Router>
        <NewArticle />
      </Router>,
    );
    expect(comp).toMatchSnapshot();
  });
});
