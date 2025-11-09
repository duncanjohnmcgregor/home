import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  IconButton,
  Chip,
} from '@mui/material';
import Grid from '@mui/material/GridLegacy';
import { Add, Delete } from '@mui/icons-material';

interface Task {
  id: number;
  title: string;
  priority: 'low' | 'medium' | 'high';
  completed: boolean;
}

const sampleTasks: Task[] = [
  { id: 1, title: 'Clean the kitchen', priority: 'high', completed: false },
  { id: 2, title: 'Pay utility bills', priority: 'high', completed: false },
  { id: 3, title: 'Water plants', priority: 'medium', completed: true },
  { id: 4, title: 'Organize garage', priority: 'low', completed: false },
];

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high':
      return 'error';
    case 'medium':
      return 'warning';
    case 'low':
      return 'success';
    default:
      return 'default';
  }
};

const Home: React.FC = () => {
  const pendingTasks = sampleTasks.filter((t) => !t.completed).length;
  const completedTasks = sampleTasks.filter((t) => t.completed).length;

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h4" gutterBottom>
            Home Management
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage your household tasks and inventory
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<Add />}>
          Add Task
        </Button>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Pending Tasks
              </Typography>
              <Typography variant="h4" color="warning.main">
                {pendingTasks}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Completed
              </Typography>
              <Typography variant="h4" color="success.main">
                {completedTasks}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Total Items
              </Typography>
              <Typography variant="h4">
                {sampleTasks.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Tasks
            </Typography>
            <List>
              {sampleTasks.map((task) => (
                <ListItem
                  key={task.id}
                  sx={{
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 1,
                    mb: 1,
                  }}
                  secondaryAction={
                    <IconButton edge="end" aria-label="delete">
                      <Delete />
                    </IconButton>
                  }
                >
                  <Checkbox checked={task.completed} />
                  <ListItemText
                    primary={task.title}
                    sx={{
                      textDecoration: task.completed ? 'line-through' : 'none',
                    }}
                  />
                  <Chip
                    label={task.priority}
                    color={getPriorityColor(task.priority) as any}
                    size="small"
                    sx={{ mr: 1 }}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Inventory
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Track your household items and supplies here
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
