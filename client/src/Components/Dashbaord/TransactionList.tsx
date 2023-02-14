import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { CircularProgress,Typography } from '@mui/material';

const properties:Array<string> = ["Outputs","Amount","Confirmation", "Size",]
export default function TransactionList({transactions}:{transactions:any}) {
  if(transactions === null){
    return( 
    <>
      <CircularProgress style={{color:'white'}}/>
    </>
    )
  }
  if(transactions.length ===0){
    return(
    <>
    <Typography>
      Something went wrong could not get blocks
    </Typography>
    </>
    )
  }
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>
            <Typography variant='body1'> 
              Transaction Id
              </Typography>
              </TableCell>
            {
              properties.map((property)=>{
                return   <TableCell align="left">
                  <Typography variant='body1'> 
                  {property}
                  </Typography>
                </TableCell>
              })
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((row:any) => {
            let sum:number = 0
            for(let i=0;i<row.vout.length;i++){
              sum += row.vout[i].value
            }
            return <TableRow
              key={row.transactionId}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
               <TableCell component="th" scope="row">
              <Typography variant='body1' style={{textDecoration:"underline",color:'lightBlue'}} > 
                {row.txid}
                </Typography>
              </TableCell>
              <TableCell component="th" scope="row">
              <Typography variant='body1'> 
                {row.vout.length}
                </Typography>
              </TableCell>
              <TableCell align="left">
              <Typography variant='body1'> 
                {sum} BTC
              </Typography>
                </TableCell>
              <TableCell align="left">
              <Typography variant='body1'> 
                {row.confirmations}
              </Typography>
                </TableCell>
              <TableCell align="left">
              <Typography variant='body1'> 
                {row.size} Bytes
                </Typography>
                </TableCell>
            </TableRow>
            })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}