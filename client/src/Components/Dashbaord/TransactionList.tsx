import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';

const properties:Array<string> = ["Outputs","Amount","Confirmation", "Size",]
function createData(
  transactionId: string,
  outputs:number,
  amount: number,
  confirmation: number,
  size: number
) {
  return { transactionId, outputs, amount, confirmation, size };
}

const rows = [
  createData('d02e84ca517348cafd4508da8de060eaf00abd17b5c43ca568d94f6c9690b4aa', 2, 1676303411, 1, 1565),
  createData('d02e84ca517348cafd4508da8de060eaf00abd17b5c43ca568d94f6c9690b4aa', 2, 1676303411, 1, 1565),
  createData('d02e84ca517348cafd4508da8de060eaf00abd17b5c43ca568d94f6c9690b4aa', 2, 1676303411, 1, 1565),
  createData('d02e84ca517348cafd4508da8de060eaf00abd17b5c43ca568d94f6c9690b4aa', 2, 1676303411, 1, 1565),
  createData('d02e84ca517348cafd4508da8de060eaf00abd17b5c43ca568d94f6c9690b4aa', 2, 1676303411, 1, 1565),
  createData('d02e84ca517348cafd4508da8de060eaf00abd17b5c43ca568d94f6c9690b4aa', 2, 1676303411, 1, 1565),
  createData('d02e84ca517348cafd4508da8de060eaf00abd17b5c43ca568d94f6c9690b4aa', 2, 1676303411, 1, 1565),
  createData('d02e84ca517348cafd4508da8de060eaf00abd17b5c43ca568d94f6c9690b4aa', 2, 1676303411, 1, 1565),
  createData('d02e84ca517348cafd4508da8de060eaf00abd17b5c43ca568d94f6c9690b4aa', 2, 1676303411, 1, 1565),
  createData('d02e84ca517348cafd4508da8de060eaf00abd17b5c43ca568d94f6c9690b4aa', 2, 1676303411, 1, 1565),
];

export default function TransactionList() {
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
          {rows.map((row) => (
            <TableRow
              key={row.transactionId}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
               <TableCell component="th" scope="row">
              <Typography variant='body1' style={{textDecoration:"underline"}} > 
                {row.transactionId}
                </Typography>
              </TableCell>
              <TableCell component="th" scope="row">
              <Typography variant='body1'> 
                {row.outputs}
                </Typography>
              </TableCell>
              <TableCell align="left">
              <Typography variant='body1'> 
                {row.amount}
              </Typography>
                </TableCell>
              <TableCell align="left">
              <Typography variant='body1'> 
                {row.confirmation}
              </Typography>
                </TableCell>
              <TableCell align="left">
              <Typography variant='body1'> 
                {row.size}
                </Typography>
                </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}