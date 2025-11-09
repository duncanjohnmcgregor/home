import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Card,
  CardContent,
  Button,
  List,
  ListItem,
  ListItemText,
  Chip,
} from '@mui/material';
import Grid from '@mui/material/GridLegacy';
import { Add, FitnessCenter, LocalDining, Bedtime } from '@mui/icons-material';

const sampleActivities = [
  { id: 1, type: 'exercise', title: 'Morning Run', value: '5 km', time: '30 min' },
  { id: 2, type: 'meal', title: 'Healthy Breakfast', value: '400 cal', time: '8:00 AM' },
  { id: 3, type: 'sleep', title: 'Good Sleep', value: '7.5 hrs', time: 'Last night' },
];

const Health: React.FC = () => {
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h4" gutterBottom>
            Health
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Track your fitness, nutrition, and wellness
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<Add />}>
          Log Activity
        </Button>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <FitnessCenter sx={{ fontSize: 48, color: 'primary.main', mb: 1 }} />
              <Typography variant="h6" gutterBottom>
                Exercise
              </Typography>
              <Typography variant="h4" color="primary">
                12
              </Typography>
              <Typography variant="body2" color="text.secondary">
                workouts this month
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <LocalDining sx={{ fontSize: 48, color: 'success.main', mb: 1 }} />
              <Typography variant="h6" gutterBottom>
                Nutrition
              </Typography>
              <Typography variant="h4" color="success.main">
                2,100
              </Typography>
              <Typography variant="body2" color="text.secondary">
                avg calories/day
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Bedtime sx={{ fontSize: 48, color: 'info.main', mb: 1 }} />
              <Typography variant="h6" gutterBottom>
                Sleep
              </Typography>
              <Typography variant="h4" color="info.main">
                7.2
              </Typography>
              <Typography variant="body2" color="text.secondary">
                avg hours/night
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Recent Activities
            </Typography>
            <List>
              {sampleActivities.map((activity) => (
                <ListItem
                  key={activity.id}
                  sx={{
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 1,
                    mb: 1,
                  }}
                >
                  <ListItemText
                    primary={activity.title}
                    secondary={activity.time}
                  />
                  <Chip label={activity.value} color="primary" size="small" />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Health Goals
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Set and track your health goals here
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Health;
