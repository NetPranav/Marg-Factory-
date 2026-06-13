import React, { useState } from 'react';
import {
  Box, Typography, Card, CardContent, Chip, Button,
  TextField, MenuItem, IconButton, Tabs, Tab, Divider
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import {
  CalendarMonth, ChevronLeft, ChevronRight,
  LocalShipping, Storefront, Warehouse, EditCalendar, Visibility
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const MOCK_DISPATCHES = [
  { id: 'SH-202606-001', dest: 'Mumbai Central Hub', warehouse: 'WH-West-01', logistics: 'FastFreight Co', status: 'SCHEDULED', date: '2026-06-15' },
  { id: 'SH-202606-002', dest: 'Delhi North Hub', warehouse: 'WH-North-02', logistics: 'ExpressRoads', status: 'IN_TRANSIT', date: '2026-06-13' },
  { id: 'SH-202606-003', dest: 'Bangalore South Hub', warehouse: 'WH-South-01', logistics: 'SafeTrans', status: 'DRAFT', date: '2026-06-16' },
  { id: 'SH-202606-004', dest: 'Chennai Hub', warehouse: 'WH-South-02', logistics: 'FastFreight Co', status: 'SCHEDULED', date: '2026-06-15' },
];

export default function DispatchCalendarPage() {
  const navigate = useNavigate();
  const [view, setView] = useState('month');
  const [filterWh, setFilterWh] = useState('ALL');
  const [filterLogistics, setFilterLogistics] = useState('ALL');

  const filtered = MOCK_DISPATCHES.filter(d => {
    if (filterWh !== 'ALL' && d.warehouse !== filterWh) return false;
    if (filterLogistics !== 'ALL' && d.logistics !== filterLogistics) return false;
    return true;
  });

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 4 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800, color: '#332922' }}>
            Dispatch Calendar
          </Typography>
          <Typography variant="body2" sx={{ color: '#8A7F75', mt: 0.5 }}>
            Plan and monitor upcoming dispatches.
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
          <Tabs value={view} onChange={(_, v) => setView(v)} sx={{ minHeight: 36, '& .MuiTab-root': { minHeight: 36, py: 0.5 } }}>
            <Tab value="day" label="Day" />
            <Tab value="week" label="Week" />
            <Tab value="month" label="Month" />
          </Tabs>
        </Box>
      </Box>

      {/* Filters & Navigation */}
      <Card sx={{ mb: 4, borderRadius: '16px', overflow: 'visible' }}>
        <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 3, flexWrap: 'wrap', p: 2, '&:last-child': { pb: 2 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton size="small"><ChevronLeft /></IconButton>
            <Typography sx={{ fontWeight: 700, minWidth: 100, textAlign: 'center' }}>
              June 2026
            </Typography>
            <IconButton size="small"><ChevronRight /></IconButton>
          </Box>
          
          <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
          
          <TextField select size="small" label="Warehouse" value={filterWh} onChange={e => setFilterWh(e.target.value)} sx={{ minWidth: 180 }}>
            <MenuItem value="ALL">All Warehouses</MenuItem>
            <MenuItem value="WH-West-01">WH-West-01</MenuItem>
            <MenuItem value="WH-North-02">WH-North-02</MenuItem>
            <MenuItem value="WH-South-01">WH-South-01</MenuItem>
          </TextField>
          
          <TextField select size="small" label="Logistics Partner" value={filterLogistics} onChange={e => setFilterLogistics(e.target.value)} sx={{ minWidth: 180 }}>
            <MenuItem value="ALL">All Partners</MenuItem>
            <MenuItem value="FastFreight Co">FastFreight Co</MenuItem>
            <MenuItem value="ExpressRoads">ExpressRoads</MenuItem>
            <MenuItem value="SafeTrans">SafeTrans</MenuItem>
          </TextField>
        </CardContent>
      </Card>

      {/* Simplified Schedule View */}
      <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 700 }}>Upcoming Dispatches</Typography>
      <Grid container spacing={3}>
        {filtered.map(dispatch => (
          <Grid size={{ xs: 12, md: 6, lg: 4 }} key={dispatch.id}>
            <Card sx={{ borderLeft: '4px solid #F97316' }}>
              <CardContent sx={{ p: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography sx={{ fontWeight: 800, color: '#332922' }}>{dispatch.date}</Typography>
                  <Chip 
                    label={dispatch.status} 
                    size="small" 
                    sx={{ 
                      fontWeight: 700, borderRadius: '6px',
                      bgcolor: dispatch.status === 'SCHEDULED' ? '#EFF6FF' : dispatch.status === 'IN_TRANSIT' ? '#FEF9C3' : '#F3F4F6',
                      color: dispatch.status === 'SCHEDULED' ? '#3B82F6' : dispatch.status === 'IN_TRANSIT' ? '#D97706' : '#6B7280'
                    }} 
                  />
                </Box>
                
                <Typography variant="body2" sx={{ fontWeight: 700, color: '#F97316', mb: 1 }}>{dispatch.id}</Typography>
                
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5, color: '#8A7F75' }}>
                  <Warehouse sx={{ fontSize: 16 }} />
                  <Typography variant="caption">{dispatch.dest} ({dispatch.warehouse})</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2, color: '#8A7F75' }}>
                  <Storefront sx={{ fontSize: 16 }} />
                  <Typography variant="caption">{dispatch.logistics}</Typography>
                </Box>
                
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button size="small" variant="outlined" startIcon={<Visibility />} onClick={() => navigate(`/shipments/${dispatch.id}`)} sx={{ flex: 1 }}>
                    View
                  </Button>
                  <Button size="small" variant="outlined" startIcon={<EditCalendar />} color="secondary" sx={{ flex: 1 }}>
                    Reschedule
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
