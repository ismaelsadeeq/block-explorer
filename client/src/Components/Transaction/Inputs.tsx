import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const properties:Array<string> = ["Transaction","TX Out",]
function TransactionInputs({inputs}:{inputs:any}) {
  const navigate = useNavigate();

  if(inputs === undefined){
    return <>
    
    </>
  }
  if(inputs === null){
    return <>
    
    </>
  }
  return (

    <div>
      <Typography variant='h5' padding={2} style={{textDecoration:'underline'}}>
       {inputs.length} {inputs.length === 1?"Input from transaction":"Inputs from transactions"}
      </Typography>

  <TableContainer component={Paper}>
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
    <TableHead>
          <TableRow>
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
        {inputs.map((input:any) => (
          <TableRow
            key={input.sequence}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
          
            {
              input.coinbase !== undefined?
              <TableCell component="th" scope="row">
              <Typography variant='body1'   align="left"> 
                Coinbase
              </Typography>
              </TableCell>
              :
              <TableCell component="th" scope="row">
              <Typography  onClick={()=>{
                navigate('/transaction/'+input.txid,{replace:true})
              }} variant='body1' style={{textDecoration:"underline",color:'lightBlue'}}  align="left"> 
                {input.txid}
              </Typography>
              </TableCell>
            }
             <TableCell component="th" scope="row">
              <Typography variant='body1' align="left"> 
                {input.vout !==undefined?input.vout +1:""}
              </Typography>
              </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  </div>
  )
}

export default TransactionInputs