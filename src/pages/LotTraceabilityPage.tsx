import React, { useState } from 'react';
import { 
  Box, Typography, Card, CardContent, TextField, 
  Button, InputAdornment, Chip, Divider,
  Stepper, Step, StepLabel, StepContent
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { 
  Search, TrackChanges, LocalShipping, Warehouse, Person, LocationOn 
} from '@mui/icons-material';

const MOCK_LOT = {
  lotNumber: 'LOT-2026-9921',
  shipmentNumber: 'SH-202606-003',
  status: 'DISPATCHED',
  currentLocation: 'NH-48, Near Surat',
  driver: 'Ramesh Singh',
  truck: 'MH-04-AB-1234',
  destination: 'Mumbai Central Hub',
  timeline: [
    { label: 'Lot Created', time: 'June 10, 2026 09:00 AM', completed: true },
    { label: 'Lot Verified', time: 'June 10, 2026 10:30 AM', completed: true },
    { label: 'Warehouse Approved', time: 'June 11, 2026 11:15 AM', completed: true },
    { label: 'Shipment Generated', time: 'June 12, 2026 02:00 PM', completed: true },
    { label: 'Dispatched', time: 'June 13, 2026 08:30 AM', completed: true },
    { label: 'Warehouse Received', time: 'Pending', completed: false },
    { label: 'Delivered', time: 'Pending', completed: false },
  ]
};

export default function LotTraceabilityPage() {
  const [search, setSearch] = useState('');
  const [searched, setSearched] = useState(false);

  const handleSearch = () => {
    if (search.trim()) setSearched(true);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 4 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800, color: '#332922' }}>
            Lot Traceability
          </Typography>
          <Typography variant="body2" sx={{ color: '#8A7F75', mt: 0.5 }}>
            Track end-to-end lifecycle and current location of any lot.
          </Typography>
        </Box>
      </Box>

      {/* Search Bar */}
      <Card sx={{ mb: 4, borderRadius: '16px' }}>
        <CardContent sx={{ p: 2, '&:last-child': { pb: 2 }, display: 'flex', gap: 2 }}>
          <TextField
            fullWidth
            size="small"
            placeholder="Search by Lot Number, Parcel ID, Destination, or Shipment Number..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ color: '#8A7F75' }} />
                </InputAdornment>
              ),
            }}
          />
          <Button variant="contained" onClick={handleSearch} sx={{ borderRadius: '8px', px: 4 }}>
            Trace
          </Button>
        </CardContent>
      </Card>

      {searched && (
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 7 }}>
            <Card sx={{ borderRadius: '16px', height: '100%' }}>
              <CardContent sx={{ p: 4 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 4 }}>
                  <Box>
                    <Typography variant="subtitle2" sx={{ color: '#8A7F75', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 800 }}>
                      Lot Details
                    </Typography>
                    <Typography variant="h5" sx={{ fontWeight: 800, color: '#332922', mt: 0.5 }}>
                      {MOCK_LOT.lotNumber}
                    </Typography>
                  </Box>
                  <Chip 
                    label={MOCK_LOT.status} 
                    sx={{ bgcolor: '#EFF6FF', color: '#3B82F6', fontWeight: 800, borderRadius: '8px' }} 
                  />
                </Box>

                <Grid container spacing={3} sx={{ mb: 4 }}>
                  <Grid size={6}>
                    <Box sx={{ display: 'flex', gap: 1.5, mb: 2 }}>
                      <LocalShipping sx={{ color: '#F97316' }} />
                      <Box>
                        <Typography variant="caption" sx={{ color: '#8A7F75', display: 'block' }}>Shipment</Typography>
                        <Typography sx={{ fontWeight: 700, color: '#332922' }}>{MOCK_LOT.shipmentNumber}</Typography>
                      </Box>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1.5 }}>
                      <Warehouse sx={{ color: '#F97316' }} />
                      <Box>
                        <Typography variant="caption" sx={{ color: '#8A7F75', display: 'block' }}>Destination</Typography>
                        <Typography sx={{ fontWeight: 700, color: '#332922' }}>{MOCK_LOT.destination}</Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid size={6}>
                    <Box sx={{ display: 'flex', gap: 1.5, mb: 2 }}>
                      <Person sx={{ color: '#F97316' }} />
                      <Box>
                        <Typography variant="caption" sx={{ color: '#8A7F75', display: 'block' }}>Driver</Typography>
                        <Typography sx={{ fontWeight: 700, color: '#332922' }}>{MOCK_LOT.driver}</Typography>
                      </Box>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1.5 }}>
                      <TrackChanges sx={{ color: '#F97316' }} />
                      <Box>
                        <Typography variant="caption" sx={{ color: '#8A7F75', display: 'block' }}>Truck</Typography>
                        <Typography sx={{ fontWeight: 700, color: '#332922' }}>{MOCK_LOT.truck}</Typography>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>

                <Divider sx={{ mb: 3 }} />

                <Box sx={{ p: 2, bgcolor: '#F0FDF4', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: 2 }}>
                  <LocationOn sx={{ color: '#16A34A', fontSize: 32 }} />
                  <Box>
                    <Typography variant="caption" sx={{ color: '#16A34A', fontWeight: 700, display: 'block', textTransform: 'uppercase' }}>
                      Current Live Location
                    </Typography>
                    <Typography sx={{ fontWeight: 800, color: '#14532D' }}>
                      {MOCK_LOT.currentLocation}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 5 }}>
            <Card sx={{ borderRadius: '16px', height: '100%' }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="subtitle2" sx={{ color: '#8A7F75', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 800, mb: 3 }}>
                  Lifecycle Timeline
                </Typography>
                <Stepper orientation="vertical" activeStep={4}>
                  {MOCK_LOT.timeline.map((step, index) => (
                    <Step key={index} completed={step.completed}>
                      <StepLabel 
                        StepIconProps={{ sx: { color: step.completed ? '#22C55E !important' : 'inherit' } }}
                      >
                        <Typography sx={{ fontWeight: step.completed ? 800 : 500, color: step.completed ? '#332922' : '#B0A89E' }}>
                          {step.label}
                        </Typography>
                      </StepLabel>
                      <StepContent>
                        <Typography variant="caption" sx={{ color: '#8A7F75' }}>{step.time}</Typography>
                      </StepContent>
                    </Step>
                  ))}
                </Stepper>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </Box>
  );
}
