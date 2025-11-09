import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Card,
  CardContent,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import Grid from '@mui/material/GridLegacy';
import { Add, TrendingUp, TrendingDown } from '@mui/icons-material';
import { formatCurrency, formatDate } from '../../utils';

const sampleTransactions = [
  { id: 1, type: 'income', category: 'Salary', amount: 5000, date: '2025-11-01' },
  { id: 2, type: 'expense', category: 'Rent', amount: 1500, date: '2025-11-02' },
  { id: 3, type: 'expense', category: 'Groceries', amount: 250, date: '2025-11-05' },
  { id: 4, type: 'expense', category: 'Utilities', amount: 150, date: '2025-11-08' },
];

const Finances: React.FC = () => {
  const totalIncome = sampleTransactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = sampleTransactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
  const balance = totalIncome - totalExpense;

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h4" gutterBottom>
            Finances
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Track your income and expenses
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<Add />}>
          Add Transaction
        </Button>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Total Income
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <TrendingUp color="success" />
                <Typography variant="h5" color="success.main">
                  {formatCurrency(totalIncome)}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Total Expenses
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <TrendingDown color="error" />
                <Typography variant="h5" color="error.main">
                  {formatCurrency(totalExpense)}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Balance
              </Typography>
              <Typography variant="h5" color={balance >= 0 ? 'success.main' : 'error.main'}>
                {formatCurrency(balance)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Recent Transactions
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell align="right">Amount</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sampleTransactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>{formatDate(transaction.date)}</TableCell>
                      <TableCell>{transaction.category}</TableCell>
                      <TableCell>
                        <Typography
                          variant="body2"
                          sx={{
                            color:
                              transaction.type === 'income' ? 'success.main' : 'error.main',
                            textTransform: 'capitalize',
                          }}
                        >
                          {transaction.type}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography
                          sx={{
                            color:
                              transaction.type === 'income' ? 'success.main' : 'error.main',
                          }}
                        >
                          {transaction.type === 'income' ? '+' : '-'}
                          {formatCurrency(transaction.amount)}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Finances;
