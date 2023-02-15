import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography,Container, Link, CircularProgress } from '@mui/material';
import TransactionInputs from './Inputs';
import TransactionOutputs from './Outputs';
import { NavigateFunction, useNavigate } from 'react-router-dom';

function TransactionView({transaction}:{transaction:any}) {
  const navigate:NavigateFunction = useNavigate();

  if (transaction === null) {
    return (
      <>
        <CircularProgress style={{ color: 'white' }} />
      </>
    )
  }
  if (transaction.length === 0) {
    return (
      <>
        <Typography>
          Something went wrong could not get transaction
        </Typography>
      </>
    )
  }
  return (
    <Container>
    <TableContainer component={Paper}>
  <Table sx={{ minWidth: 650 }} aria-label="simple table">
    <TableBody>
        <TableRow
          key="id"
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
           <TableCell component="th" scope="row">
          <Typography variant='h6' color="white"> 
              Transaction Id
            </Typography>
          </TableCell>
          <TableCell component="th" scope="row">
              <Typography variant='body1'  align="right"> 
                 {transaction.txid}
            </Typography>
          
          </TableCell>
        </TableRow>
        <TableRow
          key="hash"
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
           <TableCell component="th" scope="row">
          <Typography  variant='h6' color="white"> 
              Block Hash
            </Typography>
          </TableCell>
          <TableCell component="th" scope="row">
          <Link onClick={()=>{
            navigate('/block/'+transaction.blockhash,{replace:true})
          }}>
              <Typography variant='body1' style={{textDecoration:"underline",color:'lightBlue'}}  align="right"> 
              {transaction.blockhash}
              </Typography>
          </Link> 
          </TableCell>
        </TableRow>
        <TableRow
          key="status"
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
           <TableCell component="th" scope="row">
          <Typography variant='h6' color="white"> 
              Transaction Status
            </Typography>
          </TableCell>
          <TableCell component="th" scope="row">
              <Typography variant='body1'  align="right"> 
                 {transaction.confirmations > 0?"Confirmed":"Unconfirmed"}
            </Typography>
          
          </TableCell>
        </TableRow>
        <TableRow
          key="confirmations"
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
           <TableCell component="th" scope="row">
          <Typography variant='h6' color="white"> 
              Confirmations
            </Typography>
          </TableCell>
          <TableCell component="th" scope="row">
              <Typography variant='body1'  align="right"> 
                 {transaction.confirmations}
            </Typography>
          </TableCell>
        </TableRow>
        <TableRow
          key="time"
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
           <TableCell component="th" scope="row">
          <Typography variant='h6' color="white"> 
              Time
            </Typography>
          </TableCell>
          <TableCell component="th" scope="row">
              <Typography variant='body1'  align="right"> 
                 {transaction.time}
            </Typography>
          
          </TableCell>
        </TableRow>
        <TableRow
          key="version"
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
           <TableCell component="th" scope="row">
          <Typography variant='h6' color="white"> 
              Version
            </Typography>
          </TableCell>
          <TableCell component="th" scope="row">
              <Typography variant='body1'  align="right"> 
                 {transaction.version}
            </Typography>
          </TableCell>
        </TableRow>
        <TableRow
          key="lock"
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
           <TableCell component="th" scope="row">
          <Typography variant='h6' color="white"> 
              Lock Time
            </Typography>
          </TableCell>
          <TableCell component="th" scope="row">
              <Typography variant='body1'  align="right"> 
                 {transaction.locktime}
            </Typography>
          
          </TableCell>
        </TableRow>
        <TableRow
          key="size"
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
           <TableCell component="th" scope="row">
          <Typography variant='h6' color="white"> 
              Transaction Size
            </Typography>
          </TableCell>
          <TableCell component="th" scope="row">
              <Typography variant='body1'  align="right"> 
                 {transaction.size}
            </Typography>
          
          </TableCell>
        </TableRow>
        <TableRow
          key="inputs"
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
           <TableCell component="th" scope="row">
          <Typography variant='h6' color="white"> 
              Transaction Inputs
            </Typography>
          </TableCell>
          <TableCell component="th" scope="row">
              <Typography variant='body1'  align="right"> 
                 {transaction.vin.length}
            </Typography>
          
          </TableCell>
        </TableRow>
        <TableRow
          key="outputs"
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
           <TableCell component="th" scope="row">
          <Typography variant='h6' color="white"> 
              Traansaction Outputs
            </Typography>
          </TableCell>
          <TableCell component="th" scope="row">
              <Typography variant='body1'  align="right"> 
                 {transaction.vout.length}
            </Typography>
          
          </TableCell>
        </TableRow>
    </TableBody>
  </Table>
</TableContainer>
{
  transaction === null?
  null
  :
  <div>
    <TransactionInputs inputs={transaction.vin}/>
    <TransactionOutputs outputs={transaction.vout}/>
  </div>
  
}

  </Container>
  )
}

export default TransactionView