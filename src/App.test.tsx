import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';

describe('GovApply App Verification', () => {
  it('renders the core application without errors', () => {
    render(<App />);
    expect(document.body).toBeDefined();
  });
});