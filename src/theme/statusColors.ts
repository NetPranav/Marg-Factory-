export const STATUS_COLORS: Record<string, { bg: string; color: string; label: string }> = {
  CREATED:              { bg: '#F3F4F6', color: '#6B7280', label: 'Created' },
  READY_FOR_ASSIGNMENT: { bg: '#FFF7ED', color: '#EA580C', label: 'Ready' },
  TRUCK_ASSIGNED:       { bg: '#FEF3C7', color: '#D97706', label: 'Truck Assigned' },
  DRIVER_ASSIGNED:      { bg: '#FEF3C7', color: '#D97706', label: 'Driver Assigned' },
  DOCK_RESERVED:        { bg: '#DBEAFE', color: '#2563EB', label: 'Dock Reserved' },
  READY_FOR_DISPATCH:   { bg: '#DBEAFE', color: '#2563EB', label: 'Ready to Dispatch' },
  DISPATCHED:           { bg: '#E0E7FF', color: '#4F46E5', label: 'Dispatched' },
  IN_TRANSIT:           { bg: '#FFF7ED', color: '#F97316', label: 'In Transit' },
  ARRIVED_AT_WAREHOUSE: { bg: '#D1FAE5', color: '#059669', label: 'Arrived' },
  WAITING_FOR_DOCK:     { bg: '#FEF3C7', color: '#D97706', label: 'Waiting for Dock' },
  DOCK_ASSIGNED:        { bg: '#DBEAFE', color: '#2563EB', label: 'Dock Assigned' },
  UNLOADING:            { bg: '#E0E7FF', color: '#4F46E5', label: 'Unloading' },
  COMPLETED:            { bg: '#D1FAE5', color: '#059669', label: 'Completed' },
  CANCELLED:            { bg: '#FEE2E2', color: '#DC2626', label: 'Cancelled' },
  FAILED:               { bg: '#FEE2E2', color: '#DC2626', label: 'Failed' },
};

export const PRIORITY_COLORS: Record<string, { bg: string; color: string }> = {
  LOW:      { bg: '#F3F4F6', color: '#6B7280' },
  MEDIUM:   { bg: '#DBEAFE', color: '#2563EB' },
  HIGH:     { bg: '#FFF7ED', color: '#F97316' },
  CRITICAL: { bg: '#FEE2E2', color: '#DC2626' },
};
