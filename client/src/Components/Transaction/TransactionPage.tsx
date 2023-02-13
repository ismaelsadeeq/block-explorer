import { Helmet } from "react-helmet-async"
import Footer from "../../Layout/Footer"
import Header from "../../Layout/Header"
import { Container } from "@mui/system"
import CssBaseline from '@mui/material/CssBaseline';
import { Box } from "@mui/material";

function TransactionPage() {
  return (
    <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
    }}
    >
      <Helmet>
        <title>Transaction</title>
      </Helmet>
      <Header/>
      <CssBaseline />
      <Container>

      </Container>
      <Footer />
    </Box>
  )
}

export default TransactionPage