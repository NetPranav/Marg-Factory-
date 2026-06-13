import React, { useState } from 'react';
import {
  Box, Typography, Card, CardContent, Chip, Button,
  CircularProgress, LinearProgress, Avatar,
} from '@mui/material';
import {
  HourglassTop, CheckCircle, Cancel, Schedule,
} from '@mui/icons-material';

const MOCK_APPROVALS = [
  {
    id: 1, warehouse: 'Mumbai Central Hub', warehouseInitial: 'M',
    status: 'AWAITING_REVIEW', requestedChanges: null,
    estimatedAcceptDate: '2025-06-16', draftNumber: 'DS-2025-001',
    submittedDate: '2025-06-13', progress: 30,
  },
  {
    id: 2, warehouse: 'Delhi Distribution Center', warehouseInitial: 'D',
    status: 'APPROVED', requestedChanges: null,
    estimatedAcceptDate: '2025-06-14', draftNumber: 'DS-2025-002',
    submittedDate: '2025-06-12', progress: 100,
  },
  {
    id: 3, warehouse: 'Bangalore Warehouse', warehouseInitial: 'B',
    status: 'REJECTED', requestedChanges: 'Warehouse at capacity. Reschedule to next week.',
    estimatedAcceptDate: null, draftNumber: 'DS-2025-003',
    submittedDate: '2025-06-11', progress: 100,
  },
];

const STATUS_CONFIG: Record<string, { label: string; bg: string; color: string; icon: React.ReactNode }> = {
  AWAITING_REVIEW: { label: 'Under Review', bg: '#FEF3C7', color: '#D97706', icon: <HourglassTop /> },
  APPROVED: { label: 'Approved', bg: '#D1FAE5', color: '#059669', icon: <CheckCircle /> },
  REJECTED: { label: 'Rejected', bg: '#FEE2E2', color: '#DC2626', icon: <Cancel /> },
};

export default function PendingApprovalsPage() {
  const [approvals] = useState(MOCK_APPROVALS);

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, color: '#332922' }}>
          Pending Approvals
        </Typography>
        <Typography variant="body2" sx={{ color: '#8A7F75', mt: 0.5 }}>
          Monitor warehouse responses to your shipment requests.
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {approvals.map(approval => {
          const st = STATUS_CONFIG[approval.status] || STATUS_CONFIG.AWAITING_REVIEW;
          return (
            <Card key={approval.id}>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar sx={{
                    width: 48, height: 48, bgcolor: st.bg, color: st.color, fontWeight: 700
                  }}>
                    {approval.warehouseInitial}
                  </Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Typography sx={{ fontWeight: 700, color: '#332922', fontSize: '1rem' }}>
                      {approval.warehouse}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#8A7F75' }}>
                      Draft: {approval.draftNumber} · Submitted: {approval.submittedDate}
                    </Typography>
                  </Box>
                  <Chip
                    icon={st.icon as any}
                    label={st.label}
                    sx={{ fontWeight: 700, borderRadius: '8px', bgcolor: st.bg, color: st.color }}
                  />
                </Box>

                {approval.status === 'AWAITING_REVIEW' && (
                  <Box sx={{ mt: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                      <Typography variant="caption" sx={{ color: '#8A7F75' }}>Review Progress</Typography>
                      <Typography variant="caption" sx={{ color: '#8A7F75', display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <Schedule sx={{ fontSize: 14 }} /> Est. {approval.estimatedAcceptDate}
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={approval.progress}
                      sx={{
                        height: 6, borderRadius: 3, bgcolor: 'rgba(0,0,0,0.06)',
                        '& .MuiLinearProgress-bar': { bgcolor: '#F97316', borderRadius: 3 },
                      }}
                    />
                  </Box>
                )}

                {approval.requestedChanges && (
                  <Box sx={{ mt: 2, p: 2, bgcolor: '#FEF2F2', borderRadius: '10px', border: '1px solid #FECACA' }}>
                    <Typography variant="body2" sx={{ color: '#DC2626', fontWeight: 600 }}>
                      Warehouse Feedback:
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#7F1D1D', mt: 0.5 }}>
                      {approval.requestedChanges}
                    </Typography>
                  </Box>
                )}
              </CardContent>
            </Card>
          );
        })}
      </Box>
    </Box>
  );
}
