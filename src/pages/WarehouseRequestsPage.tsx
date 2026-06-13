import React, { useState } from 'react';
import {
  Box, Typography, Card, CardContent, Chip, Button,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, IconButton, Tooltip,
} from '@mui/material';
import {
  Warehouse, Send, CheckCircle, HourglassTop,
  Cancel, Edit, Visibility,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

// Mock data for warehouse requests (no backend endpoint yet)
const MOCK_REQUESTS = [
  {
    id: 1, draftNumber: 'DS-2025-001', warehouse: 'Mumbai Central Hub',
    expectedArrival: '2025-06-18', lotCount: 3, totalWeight: 2450,
    totalVolume: 12.5, specialHandling: 'Fragile items', status: 'AWAITING_REVIEW',
  },
  {
    id: 2, draftNumber: 'DS-2025-002', warehouse: 'Delhi Distribution Center',
    expectedArrival: '2025-06-20', lotCount: 2, totalWeight: 1800,
    totalVolume: 8.3, specialHandling: 'None', status: 'APPROVED',
  },
  {
    id: 3, draftNumber: 'DS-2025-003', warehouse: 'Bangalore Warehouse',
    expectedArrival: '2025-06-22', lotCount: 1, totalWeight: 600,
    totalVolume: 3.1, specialHandling: 'Temperature sensitive', status: 'REJECTED',
  },
];

const STATUS_MAP: Record<string, { label: string; bg: string; color: string; icon: React.ReactNode }> = {
  AWAITING_REVIEW: { label: 'Awaiting Review', bg: '#FEF3C7', color: '#D97706', icon: <HourglassTop sx={{ fontSize: 16 }} /> },
  APPROVED: { label: 'Approved', bg: '#D1FAE5', color: '#059669', icon: <CheckCircle sx={{ fontSize: 16 }} /> },
  MODIFIED: { label: 'Approved w/ Conditions', bg: '#DBEAFE', color: '#2563EB', icon: <Edit sx={{ fontSize: 16 }} /> },
  REJECTED: { label: 'Rejected', bg: '#FEE2E2', color: '#DC2626', icon: <Cancel sx={{ fontSize: 16 }} /> },
};

export default function WarehouseRequestsPage() {
  const navigate = useNavigate();
  const [requests] = useState(MOCK_REQUESTS);

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 4 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800, color: '#332922' }}>
            Warehouse Requests
          </Typography>
          <Typography variant="body2" sx={{ color: '#8A7F75', mt: 0.5 }}>
            Send shipment plans to destination warehouses and track their response.
          </Typography>
        </Box>
      </Box>

      <Card>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Draft #</TableCell>
                <TableCell>Destination Warehouse</TableCell>
                <TableCell>Expected Arrival</TableCell>
                <TableCell align="center">Lots</TableCell>
                <TableCell align="right">Weight</TableCell>
                <TableCell align="right">Volume</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {requests.map(req => {
                const st = STATUS_MAP[req.status] || STATUS_MAP.AWAITING_REVIEW;
                return (
                  <TableRow key={req.id} hover>
                    <TableCell>
                      <Typography sx={{ fontWeight: 700, color: '#332922', fontSize: '0.9rem' }}>
                        {req.draftNumber}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Warehouse sx={{ fontSize: 18, color: '#8A7F75' }} />
                        <Typography sx={{ fontSize: '0.85rem' }}>{req.warehouse}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{req.expectedArrival}</TableCell>
                    <TableCell align="center">{req.lotCount}</TableCell>
                    <TableCell align="right">{req.totalWeight} kg</TableCell>
                    <TableCell align="right">{req.totalVolume} m³</TableCell>
                    <TableCell>
                      <Chip
                        icon={st.icon as any}
                        label={st.label}
                        size="small"
                        sx={{ fontWeight: 700, borderRadius: '8px', bgcolor: st.bg, color: st.color }}
                      />
                    </TableCell>
                    <TableCell align="right">
                      {req.status === 'AWAITING_REVIEW' ? (
                        <Tooltip title="Resend Request">
                          <IconButton size="small"><Send sx={{ fontSize: 18 }} /></IconButton>
                        </Tooltip>
                      ) : (
                        <Tooltip title="View Details">
                          <IconButton size="small"><Visibility sx={{ fontSize: 18 }} /></IconButton>
                        </Tooltip>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Box>
  );
}
