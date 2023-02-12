import { Helmet } from "react-helmet-async"
import Footer from "../../Layout/Footer"
import Header from "../../Layout/Header"
import { Container } from "@mui/system"
import CssBaseline from '@mui/material/CssBaseline';

function TransactionPage() {
  return (
    <>
      <Helmet>
        <title>Transaction</title>
      </Helmet>
      <Header/>
      <CssBaseline />
      <Container>

      </Container>
      <Footer />
    </>
  )
}

export default TransactionPage