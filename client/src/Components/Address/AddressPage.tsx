import { Helmet } from "react-helmet-async"
import Footer from "../../Layout/Footer"
import Header from "../../Layout/Header"
import { Button, CssBaseline, Box, Typography, IconButton } from "@mui/material"
import { Container } from "@mui/system"
import {  ArrowBackIosNewRounded } from "@mui/icons-material"
import AddressView from "./AddressView"
import { NavigateFunction, useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { getRequest } from "../../Utilities/Network"
import { url } from "../../Utilities/util"

function AddressPage() {
  const navigate:NavigateFunction = useNavigate();
  const {address} = useParams()
  const [balance,setBalance] = useState(null)
  const [transactions,setTransactions] =  useState(null);
  async function getData(){
    let method:string = url + "/address-balance/" + address
    const balance = await getRequest(method)
    method = url +"/address-transactions/" + address
    const transactions =  await getRequest(method)
    setBalance(balance)
    setTransactions(transactions)
  }
  useEffect(()=>{
    getData()
  },[address]);
  return (
    <Box
    sx={{
      display: 'flex',
      justifyContent: 'space-between',
      flexDirection: 'column',
      minHeight: '100vh',
    }}
  >
    <Helmet>
      <title>Explore Bitcoin</title>
    </Helmet>
    <CssBaseline />
    <Container component="main" sx={{ mt: 8, mb: 2 }} >
      <Header />
      <Container style={{
        paddingTop:'15px',
        display:'flex',
        justifyContent:'space-between'
      }}>
        <Button  onClick={()=>{
            navigate(-1)
          }}>
         <IconButton >
            <ArrowBackIosNewRounded />
         </IconButton>
        </Button>
        <Typography  variant="h5" component="h1" >
        Address
      </Typography>
      </Container>
      <AddressView address={address} balance={balance} transactions={transactions} />
    </Container>
    <Footer />
  </Box>
  )
}

export default AddressPage