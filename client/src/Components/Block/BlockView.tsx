import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography,Container, Link, CircularProgress } from '@mui/material';
import { NavigateFunction, useNavigate } from 'react-router-dom';


export default function TransactionList({block}:{block:any}) {
  const navigate:NavigateFunction = useNavigate()

  if (block === null) {
    return (
      <>
        <CircularProgress style={{ color: 'white' }} />
      </>
    )
  }
  if (block.length === 0) {
    return (
      <>
        <Typography>
          Something went wrong could not get block
        </Typography>
      </>
    )
  }
  let time:Date = new Date();
  time.setUTCSeconds(block.time)
  let medianTime:Date = new Date();
  medianTime.setUTCSeconds(block.mediantime)
  return (
    <Container>
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableBody>
            <TableRow
              key="Block Hash"
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
               <TableCell component="th" scope="row">
              <Typography variant='body1'> 
              Block Hash
                </Typography>
              </TableCell>
              <TableCell component="th" scope="row">
                  <Typography variant='body1'  align="right"> 
                     {block.hash}
                </Typography>
              
              </TableCell>
            </TableRow>
            <TableRow
              key="Block Confirmations"
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
               <TableCell component="th" scope="row">
              <Typography variant='body1'> 
              Block Confirmations
                </Typography>
              </TableCell>
              <TableCell component="th" scope="row">
                  <Typography variant='body1'  align="right"> 
                     {block.confirmations}
                </Typography>
              
              </TableCell>
            </TableRow>
            <TableRow
              key="Block Height"
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
               <TableCell component="th" scope="row">
              <Typography variant='body1'> 
              Block Height
                </Typography>
              </TableCell>
              <TableCell component="th" scope="row">
                  <Typography variant='body1'  align="right"> 
                     {block.height}
                </Typography>
              
              </TableCell>
            </TableRow>
            <TableRow
              key="Block Version"
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
               <TableCell component="th" scope="row">
              <Typography variant='body1'> 
              Version
                </Typography>
              </TableCell>
              <TableCell component="th" scope="row">
                  <Typography variant='body1'  align="right"> 
                     {block.version}
                </Typography>
              
              </TableCell>
            </TableRow>
            <TableRow
              key="Block Version Hex"
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
               <TableCell component="th" scope="row">
              <Typography variant='body1'> 
              Version Hex
                </Typography>
              </TableCell>
              <TableCell component="th" scope="row">
                  <Typography variant='body1'  align="right"> 
                     {block.versionHex}
                </Typography>
              
              </TableCell>
            </TableRow>
            <TableRow
              key="Block  Merkle Root"
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
               <TableCell component="th" scope="row">
              <Typography variant='body1'> 
              Merkle Root
                </Typography>
              </TableCell>
              <TableCell component="th" scope="row">
                  <Typography variant='body1'  align="right"> 
                     {block.merkleroot}
                </Typography>
              
              </TableCell>
            </TableRow>
            <TableRow
              key="Block Time"
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
               <TableCell component="th" scope="row">
              <Typography variant='body1'> 
              Time
                </Typography>
              </TableCell>
              <TableCell component="th" scope="row">
                  <Typography variant='body1'  align="right"> 
                     {time.toLocaleString()}
                </Typography>
              
              </TableCell>
            </TableRow>
            <TableRow
              key="Block Median Time"
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
               <TableCell component="th" scope="row">
              <Typography variant='body1'> 
                Median Time
                </Typography>
              </TableCell>
              <TableCell component="th" scope="row">
                  <Typography variant='body1'  align="right"> 
                     {medianTime.toLocaleString()}
                </Typography>
              
              </TableCell>
            </TableRow>
            <TableRow
              key="Block Nonce"
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
               <TableCell component="th" scope="row">
              <Typography variant='body1'> 
              Nonce
                </Typography>
              </TableCell>
              <TableCell component="th" scope="row">
                  <Typography variant='body1'  align="right"> 
                     {block.nonce}
                </Typography>
              
              </TableCell>
            </TableRow>
            <TableRow
              key="Block Bits"
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
               <TableCell component="th" scope="row">
              <Typography variant='body1'> 
              Bits
                </Typography>
              </TableCell>
              <TableCell component="th" scope="row">
                  <Typography variant='body1'  align="right"> 
                     {block.bits}
                </Typography>
              
              </TableCell>
            </TableRow>
            <TableRow
              key="Block Difficulty"
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
               <TableCell component="th" scope="row">
              <Typography variant='body1'> 
              Difficulty
                </Typography>
              </TableCell>
              <TableCell component="th" scope="row">
                  <Typography variant='body1'  align="right"> 
                     {block.difficulty}
                </Typography>
              
              </TableCell>
            </TableRow>
            <TableRow
              key="Block Chainwork"
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
               <TableCell component="th" scope="row">
              <Typography variant='body1'> 
              Chain Work
                </Typography>
              </TableCell>
              <TableCell component="th" scope="row">
                  <Typography variant='body1'  align="right"> 
                     {block.chainwork}
                </Typography>
              
              </TableCell>
            </TableRow>
            <TableRow
              key="Block Transactions"
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
               <TableCell component="th" scope="row">
              <Typography variant='body1'> 
              Transactions
                </Typography>
              </TableCell>
              <TableCell component="th" scope="row">
                  <Typography variant='body1'  align="right"> 
                     {block.nTx}
                </Typography>
              
              </TableCell>
            </TableRow>
           
            <TableRow
              key="Previous Block Hash"
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
               <TableCell component="th" scope="row">
              <Typography variant='body1'> 
              Previous Block Hash
                </Typography>
              </TableCell>
              <TableCell component="th" scope="row">
                    <Link  onClick={()=>{
                      navigate('/block/'+block.previousblockhash,{replace:true})
                    }}>
                      <Typography variant='body1' style={{textDecoration:"underline",color:'lightBlue'}}  align="right"> 
                          {block.previousblockhash}
                    </Typography>
               </Link>
              
              </TableCell>
            </TableRow>
            {
              block.nextblockhash !== undefined ?
              <TableRow
                key="Next Block Hash"
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
              <TableCell component="th" scope="row">
              <Typography variant='body1'> 
              Next Block Hash
                </Typography>
              </TableCell>
              <TableCell component="th" scope="row">
                    <Link onClick={()=>{
                      navigate('/block/'+block.nextblockhash)
                    }}>
                      <Typography variant='body1' style={{textDecoration:"underline",color:'lightBlue'}}  align="right"> 
                          {block.nextblockhash}
                    </Typography>
               </Link>
              
              </TableCell>
              </TableRow> :
              null
            }
            <TableRow
              key=" Stripped Size"
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
               <TableCell component="th" scope="row">
              <Typography variant='body1'> 
              Stripped Size
                </Typography>
              </TableCell>
              <TableCell component="th" scope="row">
                  <Typography variant='body1'  align="right"> 
                     {block.strippedsize}
                </Typography>
              
              </TableCell>
            </TableRow>
            <TableRow
              key="Block Hash Size"
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
               <TableCell component="th" scope="row">
              <Typography variant='body1'> 
                Size
                </Typography>
              </TableCell>
              <TableCell component="th" scope="row">
                  <Typography variant='body1'  align="right"> 
                      {block.size} bytes
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow
              key="Block Hash Weights"
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
               <TableCell component="th" scope="row">
              <Typography variant='body1'> 
                Weight
                </Typography>
              </TableCell>
              <TableCell component="th" scope="row">
                  <Typography variant='body1'  align="right"> 
                      {block.weight} wu
                </Typography>
              </TableCell>
            </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
    <Typography variant='h5' padding={5}>
      Transactions
    </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableBody>
            {block.tx.map((tx:any) => (
              <TableRow
                key={tx}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                <Typography onClick={()=>{
                      navigate('/transaction/'+tx)
                    }} variant='body1' style={{textDecoration:"underline",color:"lightblue"}}  align="left"> 
                          {tx}
                    </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </Container>
  );
}