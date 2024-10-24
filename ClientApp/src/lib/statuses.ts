import { Customer } from './schemas';

export const CustomerStatus: Record<Customer['status'], string> = {
  Active: 'Active',
  NonActive: 'Non-Active',
  Lead: 'Lead',
} as const;

export const OpportunityStatus = {
  New: 'New',
  ClosedWon: 'Closed Won',
  ClosedLost: 'Closed Lost',
} as const;

export function getCustomerStatus(status: Customer['status']) {
  return CustomerStatus[status] || 'Unknown';
}

export function getOpportunityStatus(
  status: Customer['opportunities'][0]['status'],
) {
  return OpportunityStatus[status] || 'Unknown';
}
