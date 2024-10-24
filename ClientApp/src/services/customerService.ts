import http from '@/lib/http';
import { Customer } from '@/lib/schemas';

const basePath = '/api/customers';

export function getCustomers(): Promise<Customer[]> {
  return http.get(`${basePath}`);
}

export function getCustomer(id: number | string): Promise<Customer> {
  return http.get(`${basePath}/${id}`);
}

export function addCustomer(customer: Omit<Customer, 'id'>): Promise<void> {
  return http.post(`${basePath}`, customer);
}

export function updateCustomer(customer: Customer): Promise<void> {
  return http.put(`${basePath}`, customer);
}

export function removeCustomer(id: number | string): Promise<void> {
  return http.delete(`${basePath}/${id}`);
}
