import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography,Container, Link } from '@mui/material';


const addressBalance = {
  "confirmed":200000,
  "unconfirmed":0

}
const transactions =  [
  "a2e993dba682a3cb0cf279646baf7a07391642db0568e0c808068bab092ccd8a",
  "a2e993dba682a3cb0cf279646baf7a07391642db0568e0c808068bab092ccd8a"
]
function AddressView() {
  return (
    <Container>
       <Typography variant='h6' margin={5}>
      A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa
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
                 {addressBalance.confirmed} {addressBalance.confirmed>1?"Satoshis":"Satoshi"} 
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
              {addressBalance.unconfirmed}   {addressBalance.unconfirmed>1?"Satoshis":"Satoshi"} 
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
            {transactions.map((tx) => (
              <TableRow
                key={tx}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                <Typography variant='body1' style={{textDecoration:"underline",color:"lightblue"}}  align="left"> 
                          {tx}
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