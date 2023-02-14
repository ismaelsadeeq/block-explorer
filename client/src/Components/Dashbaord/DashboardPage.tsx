import { Helmet } from "react-helmet-async"
import { Box } from "@mui/system";
import Header from "../../Layout/Header"
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Footer from "../../Layout/Footer"
import BlocksList from "./BlocksList";
import TransactionList from "./TransactionList";
import { useEffect, useState } from "react";
import {url} from '../../Utilities/util'
import {getRequest} from '../../Utilities/Network'


function DashboardPage() {
  const [blocks,setBlocks] =  useState(null)
  const [transactions,setTransactions] =  useState(null)

  async function getData(){
    let method:string = url+"/top-blocks";
    const blocks =  await getRequest(method)
    method = url+"/top-transactions";
    const trxs =  await getRequest(method);

    setBlocks(blocks)
    setTransactions(trxs)
  }
  useEffect(()=>{
    getData()
  },[])
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
      <BlocksList blocks={blocks} />
      <Typography paddingTop={2} variant="h5" component="h1" gutterBottom>
        Transactions
      </Typography>
      <TransactionList transactions={transactions} />
    </Container>
    <Footer />
  </Box>
  );
}

export default DashboardPage