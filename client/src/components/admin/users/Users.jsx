import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { toast } from 'react-toastify';
import {
  getDeleteUser,
  getUsersList,
  getBlockUser,
  getUnblockUser,
} from '../../../api/adminApi';
import { Button } from '@mui/material';

export default function Users() {
  const [status, setStatus] = React.useState(true);
  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'name',
      headerName: 'Name',
      width: 150,
      editable: true,
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 150,
      editable: true,
    },
    {
      field: 'number',
      headerName: 'Number',
      width: 110,
      editable: true,
    },

    {
      field: 'action2',
      headerName: 'Block',
      sortable: false,
      renderCell: (params) => {
        /// data comes in params
        console.log(params.row.status);

        const blockOnClick = async (e) => {
          //   alert(params.row._id);

          e.stopPropagation(); // don't select this row after clicking
          const userId = params.row._id;
          let res = await getBlockUser(userId);
          if (res.status === 200) {
            console.log(status);
            toast.success(res.data.message);
            setStatus(!status);
          } else {
            toast.error(res.message);
            setStatus(!status);
          }
        };
        const unblockOnClick = async (e) => {
          e.stopPropagation(); // don't select this row after clicking
          const userId = params.row._id;
          let res = await getUnblockUser(userId);
          if (res.status === 200) {
            setStatus(!status);
            console.log(status);
            toast.success(res.data.message);
          } else {
            toast.error(res.message);
            setStatus(!status);
          }
        };

        return params.row.status === 0 ? (
          <Button variant='outlined'color='primary' onClick={unblockOnClick}>Unblock</Button>
        ) : (
          <Button variant='outlined' color='warning' onClick={blockOnClick}>Block</Button>
        );
      },
    },
    {
      field: 'action1',
      headerName: 'Delete',
      sortable: false,
      renderCell: (params) => {
        /// data comes in params
        const onClick = async (e) => {
          e.stopPropagation(); // don't select this row after clicking
          console.log(params.row._id); //user id
          const userId = params.row._id;
          const res = await getDeleteUser(userId);
          console.log(res);
          if (res.status === 200) {
            console.log('inside if');
            setStatus(!status);
            console.log(status);
            toast.success(res.data.message);
          } else {
            toast.error(res.message);
            setStatus(!status);
          }
        };

        return <Button variant='outlined' color='error' onClick={onClick}>Delete</Button>;
      },
    },
  ];

  const [allUsers, setAllUsers] = React.useState([]);

  React.useEffect(() => {
    handleDisplayAllUser();
  }, [status]);

  //  API
  const handleDisplayAllUser = async () => {
    try {
      const res = await getUsersList();
      if (res.error) {
        toast.error(res.error);
      } else {
        const fullUsers = res;
        setAllUsers(fullUsers);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box sx={{ height: 400, width: '60%', marginLeft: '20%' }}>
      <DataGrid
        rows={allUsers}
        columns={columns}
        pageSize={5}
        getRowId={(row) => row._id}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
      />
    </Box>
  );
}
