import { useRoutes } from "react-router-dom";
import DashboardPage from "./Components/Dashbaord/DashboardPage";
import Block from "./Components/Block/BlockPage";
import TransactionPage from "./Components/Transaction/TransactionPage";
import AddressPage from "./Components/Address/AddressPage";


export default function Router (){

  return useRoutes(
    [
      {
        path:'/',
        element:<DashboardPage />,
        index:true
      },
      {
        path:'block/:hash',
        element:<Block />
      },
      {
        path:'transaction/:id',
        element:<TransactionPage />
      },
      {
        path:'address/:address',
        element:<AddressPage />
      }

    ]
    ) 
}