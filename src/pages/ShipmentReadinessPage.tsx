import React from 'react';
import { Box, Typography, Card, CardContent, Button, LinearProgress, Divider, Chip } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { WarningAmber, CheckCircle, AssignmentTurnedIn, ArrowForward } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const MOCK_READINESS = [
  { 
    id: 'SH-202606-003', score: 85,
    tasks: [
      { name: 'Lots Verified', status: 'DONE' },
      { name: 'Warehouse Approved', status: 'DONE' },
      { name: 'Logistics Partner Selected', status: 'DONE' },
      { name: 'Driver Assigned', status: 'PENDING', path: '/shipments/SH-202606-003' },
      { name: 'Loading Checklist Completed', status: 'PENDING', path: '/loading-checklist/SH-202606-003' },
    ]
  },
  { 
    id: 'SH-202606-004', score: 40,
    tasks: [
      { name: 'Lots Verified', status: 'DONE' },
      { name: 'Warehouse Approved', status: 'PENDING', path: '/pending-approvals' },
      { name: 'Logistics Partner Selected', status: 'PENDING', path: '/quotations' },
      { name: 'Driver Assigned', status: 'PENDING', path: '/shipments/SH-202606-004' },
      { name: 'Loading Checklist Completed', status: 'PENDING', path: '/loading-checklist/SH-202606-004' },
    ]
  },
  { 
    id: 'SH-202606-005', score: 100,
    tasks: [
      { name: 'Lots Verified', status: 'DONE' },
      { name: 'Warehouse Approved', status: 'DONE' },
      { name: 'Logistics Partner Selected', status: 'DONE' },
      { name: 'Driver Assigned', status: 'DONE' },
      { name: 'Loading Checklist Completed', status: 'DONE' },
    ]
  }
];

export default function ShipmentReadinessPage() {
  const navigate = useNavigate();

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 4 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800, color: '#332922' }}>
            Shipment Readiness
          </Typography>
          <Typography variant="body2" sx={{ color: '#8A7F75', mt: 0.5 }}>
            Evaluate whether upcoming shipments are ready for dispatch.
          </Typography>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {MOCK_READINESS.map(shipment => {
          const isReady = shipment.score === 100;
          return (
            <Grid size={{ xs: 12, md: 6, lg: 4 }} key={shipment.id}>
              <Card sx={{ 
                height: '100%', display: 'flex', flexDirection: 'column',
                borderTop: `6px solid ${isReady ? '#22C55E' : (shipment.score > 50 ? '#F59E0B' : '#EF4444')}`
              }}>
                <CardContent sx={{ p: 3, flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 800, color: '#332922' }}>{shipment.id}</Typography>
                    <Chip 
                      label={`${shipment.score}% Ready`} 
                      size="small" 
                      sx={{ 
                        fontWeight: 700, borderRadius: '6px',
                        bgcolor: isReady ? '#F0FDF4' : '#FFF7ED', 
                        color: isReady ? '#16A34A' : '#EA580C' 
                      }} 
                    />
                  </Box>
                  
                  <Box sx={{ mb: 3 }}>
                    <LinearProgress 
                      variant="determinate" 
                      value={shipment.score} 
                      sx={{ 
                        height: 8, borderRadius: 4,
                        bgcolor: 'rgba(0,0,0,0.05)',
                        '& .MuiLinearProgress-bar': {
                          bgcolor: isReady ? '#22C55E' : (shipment.score > 50 ? '#F59E0B' : '#EF4444')
                        }
                      }} 
                    />
                  </Box>
                  
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1.5, color: '#8A7F75' }}>Readiness Checklist</Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mb: 3, flex: 1 }}>
                    {shipment.tasks.map((task, idx) => (
                      <Box key={idx} sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        {task.status === 'DONE' ? (
                          <CheckCircle sx={{ color: '#22C55E', fontSize: 20 }} />
                        ) : (
                          <WarningAmber sx={{ color: '#F59E0B', fontSize: 20 }} />
                        )}
                        <Typography sx={{ 
                          fontSize: '0.85rem', fontWeight: 600, 
                          color: task.status === 'DONE' ? '#8A7F75' : '#332922',
                          textDecoration: task.status === 'DONE' ? 'line-through' : 'none'
                        }}>
                          {task.name}
                        </Typography>
                        {task.status === 'PENDING' && task.path && (
                          <Button 
                            size="small" 
                            onClick={() => navigate(task.path!)}
                            sx={{ ml: 'auto', minWidth: 0, p: 0.5, borderRadius: '6px' }}
                          >
                            Fix →
                          </Button>
                        )}
                      </Box>
                    ))}
                  </Box>

                  <Divider sx={{ mb: 2 }} />
                  
                  <Button 
                    variant={isReady ? "contained" : "outlined"} 
                    color={isReady ? "success" : "primary"}
                    fullWidth 
                    startIcon={isReady ? <AssignmentTurnedIn /> : <ArrowForward />}
                    disabled={!isReady}
                  >
                    {isReady ? "Ready for Dispatch" : "Complete Pending Tasks"}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
