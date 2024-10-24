import React from 'react';
import { test, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import * as customerService from '@/services/customerService';
import App from '@/App';

import customers from './customers.mock.json';
import { Customer } from '@/lib/schemas';

vi.mock('@/services/customerService');

test('renders client app', async () => {
  vi.mocked(customerService).getCustomers.mockResolvedValue(
    customers as Customer[],
  );

  render(<App />);

  expect(await screen.findByText('Customers')).toBeInTheDocument();
  const addCustomerButton = await screen.findByText('Add Customer');
  expect(addCustomerButton).toBeInTheDocument();
  await userEvent.click(addCustomerButton);

  expect(await screen.findByText('New Customer')).toBeInTheDocument();

  const nameInput = await screen.findByLabelText('Name');
  await userEvent.type(nameInput, 'Test Customer');

  const emailInput = await screen.findByLabelText('Email');
  await userEvent.type(emailInput, 'test@example.com');

  const phoneInput = await screen.findByLabelText('Phone');
  await userEvent.type(phoneInput, '123123123123');

  const saveButton = await screen.findByText('Save');
  await userEvent.click(saveButton);

  expect(await screen.findByText('Customers')).toBeInTheDocument();
});
