import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Card,
  CardContent,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Chip,
} from '@mui/material';
import Grid from '@mui/material/GridLegacy';
import { Add, Phone, Email, Cake } from '@mui/icons-material';

const sampleContacts = [
  {
    id: 1,
    name: 'John Doe',
    relationship: 'Friend',
    email: 'john@example.com',
    lastContact: '2 days ago',
  },
  {
    id: 2,
    name: 'Jane Smith',
    relationship: 'Family',
    email: 'jane@example.com',
    lastContact: '1 week ago',
  },
  {
    id: 3,
    name: 'Bob Johnson',
    relationship: 'Colleague',
    email: 'bob@example.com',
    lastContact: '3 days ago',
  },
];

const upcomingEvents = [
  { id: 1, title: 'Birthday Party', date: 'Nov 15', location: 'Home' },
  { id: 2, title: 'Team Meeting', date: 'Nov 18', location: 'Office' },
];

const Social: React.FC = () => {
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h4" gutterBottom>
            Social
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage your contacts and social events
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<Add />}>
          Add Contact
        </Button>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Total Contacts
              </Typography>
              <Typography variant="h4" color="primary">
                {sampleContacts.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Upcoming Events
              </Typography>
              <Typography variant="h4" color="success.main">
                {upcomingEvents.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Birthdays This Month
              </Typography>
              <Typography variant="h4" color="warning.main">
                2
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Contacts
            </Typography>
            <List>
              {sampleContacts.map((contact) => (
                <ListItem
                  key={contact.id}
                  sx={{
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 1,
                    mb: 1,
                  }}
                >
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: 'primary.main' }}>
                      {contact.name.charAt(0)}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={contact.name}
                    secondary={
                      <>
                        <Email sx={{ fontSize: 14, mr: 0.5 }} />
                        {contact.email}
                      </>
                    }
                  />
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                    <Chip label={contact.relationship} size="small" color="primary" />
                    <Typography variant="caption" color="text.secondary">
                      {contact.lastContact}
                    </Typography>
                  </Box>
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Upcoming Events
            </Typography>
            <List>
              {upcomingEvents.map((event) => (
                <ListItem
                  key={event.id}
                  sx={{
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 1,
                    mb: 1,
                  }}
                >
                  <ListItemText
                    primary={event.title}
                    secondary={`${event.date} • ${event.location}`}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Social;
