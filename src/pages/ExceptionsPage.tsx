import React from 'react';
import { 
  Box, Typography, Card, CardContent, Chip, Button, 
  IconButton, Tooltip, Avatar, Divider 
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { 
  Warning, ErrorOutline, LocalShipping, CalendarToday,
  CheckCircleOutline, PersonAdd, ArrowForward, MoreVert
} from '@mui/icons-material';

const MOCK_EXCEPTIONS = [
  { id: 'EX-001', type: 'Warehouse Rejection', shipment: 'SH-202606-008', severity: 'CRITICAL', date: '2026-06-13 10:45 AM', status: 'OPEN', description: 'Destination warehouse refused lots due to missing pre-authorization documentation.' },
  { id: 'EX-002', type: 'Delayed Dispatch', shipment: 'SH-202606-004', severity: 'HIGH', date: '2026-06-13 08:30 AM', status: 'IN_PROGRESS', description: 'Logistics provider truck delayed by 4 hours. Dispatch window missed.' },
  { id: 'EX-003', type: 'Missing Lot Data', shipment: 'SH-202606-009', severity: 'MEDIUM', date: '2026-06-12 04:15 PM', status: 'OPEN', description: 'Dimensions missing for 3 parcels in Lot LOT-2026-9930.' },
  { id: 'EX-004', type: 'Quote Expired', shipment: 'SH-202606-011', severity: 'LOW', date: '2026-06-12 11:00 AM', status: 'RESOLVED', description: 'Primary logistics quotation expired before approval. Secondary selected.' },
];

const SEVERITY_COLORS: any = {
  CRITICAL: { bg: '#FEF2F2', text: '#DC2626' },
  HIGH: { bg: '#FFF7ED', text: '#EA580C' },
  MEDIUM: { bg: '#FEF9C3', text: '#CA8A04' },
  LOW: { bg: '#F3F4F6', text: '#6B7280' },
};

export default function ExceptionsPage() {
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 4 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800, color: '#332922' }}>
            Exceptions Center
          </Typography>
          <Typography variant="body2" sx={{ color: '#8A7F75', mt: 0.5 }}>
            Centralized hub for resolving operational roadblocks and issues.
          </Typography>
        </Box>
        <Button variant="contained" color="error" startIcon={<Warning />} sx={{ borderRadius: '8px' }}>
          Escalate All Critical
        </Button>
      </Box>

      <Grid container spacing={3}>
        {MOCK_EXCEPTIONS.map(ex => (
          <Grid size={{ xs: 12, md: 6 }} key={ex.id}>
            <Card sx={{ 
              borderRadius: '16px', 
              borderLeft: `6px solid ${SEVERITY_COLORS[ex.severity].text}`,
              opacity: ex.status === 'RESOLVED' ? 0.7 : 1 
            }}>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Box sx={{ 
                      width: 40, height: 40, borderRadius: '10px', 
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      bgcolor: SEVERITY_COLORS[ex.severity].bg, color: SEVERITY_COLORS[ex.severity].text
                    }}>
                      {ex.severity === 'CRITICAL' ? <Warning /> : <ErrorOutline />}
                    </Box>
                    <Box>
                      <Typography sx={{ fontWeight: 800, color: '#332922' }}>{ex.type}</Typography>
                      <Typography variant="caption" sx={{ color: '#8A7F75', fontWeight: 600 }}>{ex.id}</Typography>
                    </Box>
                  </Box>
                  <Chip 
                    label={ex.status} 
                    size="small"
                    sx={{ 
                      fontWeight: 800, borderRadius: '6px',
                      bgcolor: ex.status === 'RESOLVED' ? '#F0FDF4' : ex.status === 'IN_PROGRESS' ? '#EFF6FF' : '#FEF2F2',
                      color: ex.status === 'RESOLVED' ? '#16A34A' : ex.status === 'IN_PROGRESS' ? '#3B82F6' : '#DC2626'
                    }} 
                  />
                </Box>

                <Typography variant="body2" sx={{ color: '#332922', mb: 3, minHeight: 40 }}>
                  {ex.description}
                </Typography>

                <Grid container spacing={2} sx={{ mb: 3 }}>
                  <Grid size={6}>
                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                      <LocalShipping sx={{ color: '#8A7F75', fontSize: 18 }} />
                      <Typography variant="caption" sx={{ color: '#332922', fontWeight: 700 }}>{ex.shipment}</Typography>
                    </Box>
                  </Grid>
                  <Grid size={6}>
                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                      <CalendarToday sx={{ color: '#8A7F75', fontSize: 18 }} />
                      <Typography variant="caption" sx={{ color: '#332922', fontWeight: 700 }}>{ex.date}</Typography>
                    </Box>
                  </Grid>
                </Grid>

                <Divider sx={{ mb: 2 }} />

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    {ex.status !== 'RESOLVED' && (
                      <Button size="small" variant="outlined" color="success" startIcon={<CheckCircleOutline />} sx={{ borderRadius: '8px' }}>
                        Resolve
                      </Button>
                    )}
                    <Tooltip title="Assign Owner">
                      <IconButton size="small" sx={{ border: '1px solid rgba(0,0,0,0.1)', borderRadius: '8px' }}>
                        <PersonAdd fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                  <Button size="small" endIcon={<ArrowForward />} sx={{ color: '#F97316', fontWeight: 700 }}>
                    Details
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
