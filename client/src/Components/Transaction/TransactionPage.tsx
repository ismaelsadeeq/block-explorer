import { Helmet } from "react-helmet-async"
import Footer from "../../Layout/Footer"
import Header from "../../Layout/Header"
import { Button, CssBaseline, Box, Typography, IconButton } from "@mui/material"
import { Container } from "@mui/system"
import {  ArrowBackIosNewRounded } from "@mui/icons-material"
import TransactionView from "./TransactionView"
import { NavigateFunction, useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { url } from "../../Utilities/util"
import { getRequest } from "../../Utilities/Network"

function TransactionPage() {

  const navigate:NavigateFunction =  useNavigate()
  const [transaction,setTransaction] = useState(null)
  const {id}  =  useParams()
  async function getData(){
    let method:string = url + "/search-transaction/" + id
    const block = await getRequest(method)
    setTransaction(block)
  }
  useEffect(()=>{
   getData()
  },[id])
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
          <Button onClick={()=>{
            navigate(-1)
          }} >
           <IconButton >
              <ArrowBackIosNewRounded />
           </IconButton>
          </Button>
          <Typography  variant="h5" component="h1" >
          Transaction
        </Typography>
        </Container>
        <TransactionView transaction={transaction}/>

      </Container>
      <Footer />
    </Box>

  )
}

export default TransactionPage