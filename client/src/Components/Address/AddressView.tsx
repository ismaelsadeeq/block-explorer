import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography,Container, Link, CircularProgress } from '@mui/material';
import { NavigateFunction, useNavigate } from 'react-router-dom';


function AddressView({address,balance,transactions}:{address:any,balance:any,transactions:any}) {
  const navigate:NavigateFunction = useNavigate();

  if (transactions === null || balance == null) {
    return (
      <>
        <CircularProgress style={{ color: 'white' }} />
      </>
    )
  }
  if (transactions.length === 0 || balance.length === 0) {
    return (
      <>
        <Typography>
          No Data on the block chain for this address
        </Typography>
      </>
    )
  }
  return (
    <Container>
       <Typography variant='h6' margin={5}>
        {address}
      </Typography>
    <TableContainer component={Paper} >
    <Typography variant='h5' margin={2} >
      Balance
    </Typography>
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
    <TableBody>
        <TableRow
          key="id"
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
           <TableCell component="th" scope="row">
          <Typography variant='h6' color="white"> 
              Confirmed
            </Typography>
          </TableCell>
          <TableCell component="th" scope="row">
              <Typography variant='body1'  align="right"> 
                 {balance.confirmed} {balance.confirmed>1?"Satoshis":"Satoshi"} 
            </Typography>
          
          </TableCell>
        </TableRow>
        <TableRow
          key="hash"
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
           <TableCell component="th" scope="row">
          <Typography variant='h6' color="white"> 
            Unconfirmed
            </Typography>
          </TableCell>
          <TableCell component="th" scope="row">
          <Link >
              <Typography variant='body1'  align="right"> 
              {balance.unconfirmed}   {balance.unconfirmed>1?"Satoshis":"Satoshi"} 
              </Typography>
          </Link> 
          </TableCell>
        </TableRow>
    </TableBody>
  </Table>
</TableContainer>
<Typography variant='h5' padding={2}>
      Transactions
    </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableBody>
            {transactions.map((tx:any) => (
              <TableRow
                key={tx}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                <Typography 
                    onClick={()=>{
                      navigate("/transaction/"+tx.tx_hash,{replace:true})
                    }}
                variant='body1' style={{textDecoration:"underline",color:"lightblue"}}  align="left"> 
                          {tx.tx_hash}
                    </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
  </Container>
  )
}

export default AddressView