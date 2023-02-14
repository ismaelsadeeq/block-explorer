import { Helmet } from "react-helmet-async"
import { Box } from "@mui/system";
import Header from "../../Layout/Header"
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Footer from "../../Layout/Footer"
import BlocksList from "./BlocksList";
import TransactionList from "./TransactionList";



function DashboardPage() {
  return (
    <Box
    sx={{
      display: 'flex',
      justifyContent:'space-between',
      flexDirection: 'column',
      minHeight: '100vh',
    }}
    >
    <Helmet>
      <title>Explore Bitcoin</title>
    </Helmet>
    <CssBaseline />
    <Container component="main" sx={{ mt: 8, mb: 2}} >
    <Header />
      <Typography paddingTop={2} variant="h5" component="h1" gutterBottom>
        Blocks
      </Typography>
      <BlocksList />
      <Typography paddingTop={2} variant="h5" component="h1" gutterBottom>
        Transactions
      </Typography>
      <TransactionList />
    </Container>
    <Footer />
  </Box>
  );
}

export default DashboardPage