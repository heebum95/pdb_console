import { useEffect, useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import EditIcon from '@mui/icons-material/Edit';
import {
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';

const columns = [
  { id: 'stage_names', label: 'STAGE NAME'},
  { id: 'person_types', label: 'PERSON TYPE'},
  { id: 'person_roles', label: 'PERSON ROLE', minWidth: 100 },
  { id: 'birthday', label: 'BIRTHDAY'},
  { id: 'id', label: 'PERSON ID'},
  { id: 'edit', label: 'EDIT'},

];

export const CustomerListResults = () => {
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(0);
  const [human, setHuman] = useState([]);
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [role, setRole] = useState('');
  const [birthday, setBirthday] = useState('');
  const [perid, setPerid] = useState('');

  useEffect(() => {
    fetch('https://dev-pdb.kocowa.com/api/v01/be/person/list?status=active&offset=' + (page)* rowsPerPage + '&limit=' + rowsPerPage)
    .then((response) => response.json())
    .then((json => {
      setCount(json.total_count);
      setHuman(json.objects);
    }))
  }, [page])

  const handleSelectAll = (event) => {
    let newSelectedCustomerIds;

    if (event.target.checked) {
      newSelectedCustomerIds = human.map((per) => per.id);
    } else {
      newSelectedCustomerIds = [];
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedCustomerIds.indexOf(id);
    let newSelectedCustomerIds = [];

    if (selectedIndex === -1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds, id);
    } else if (selectedIndex === 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(1));
    } else if (selectedIndex === selectedCustomerIds.length - 1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(0, selectedIndex),
        selectedCustomerIds.slice(selectedIndex + 1)
      );
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
    console.log(id);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };


  return (
    <Card >
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox"
                  style={{backgroundColor: "beige"}}>
                  <Checkbox
                    checked={selectedCustomerIds.length === human.length}
                    color="primary"
                    indeterminate={
                      selectedCustomerIds.length > 0
                      && selectedCustomerIds.length < human.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth, backgroundColor: "beige"}}
                  >
                    {column.label}
                  </TableCell>
                ))}


                
              </TableRow>
            </TableHead>
            <TableBody>
  
            {human
                .map((per) => {
                  return (
                    <TableRow key={per.id} hover selected={selectedCustomerIds.indexOf(per.id) !== -1}>
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={selectedCustomerIds.indexOf(per.id) !== -1}
                          onChange={(event) => handleSelectOne(event, per.id)}
                          value="true"/>
                      </TableCell>
                      {columns.map((column) => {
                        const value = per[column.id];
        
                      if (column.id === 'edit'){
                        return(
                          <TableCell key={column.id} align={column.align}>
                            <EditIcon></EditIcon>
                          </TableCell>
                          );

                        }
                      if(typeof(value) === 'object'){
                        if(value === null){
                          return (
                            <TableCell key={column.id} align={column.align} >
                            {null}
                          </TableCell>
                          )
                        }

                        else if(value.length ===2){
                          return (
                            <TableCell key={column.id} align={column.align} >
                            {value[0]}, {value[1]}
                          </TableCell>
                          )
                        }else if(value.length===3){
                          return (
                            <TableCell key={column.id} align={column.align} >
                            {value[0]}, {value[1]}, {value[2]}
                          </TableCell>
                          )
                        }
                      }
                      return (
                        <TableCell key={column.id} align={column.align} >
                          {value}
                        </TableCell>
                        );
                      })
                      }

                    </TableRow>
                    
                  );
                  
                })}
              {/* {person.slice(0, limit).map((per) => (
                <TableRow
                  hover
                  key={per.id}
                  selected={selectedCustomerIds.indexOf(per.id) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedCustomerIds.indexOf(per.id) !== -1}
                      onChange={(event) => handleSelectOne(event, per.id)}
                      value="true"
                    />
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex'
                      }}
                    >
                      <Avatar
                        src={per.avatarUrl}
                        sx={{ mr: 2 }}
                      >
                        {getInitials(per.name)}
                      </Avatar>
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {per.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {per.email}
                  </TableCell>
                  <TableCell>
                    {`${per.address.city}, ${per.address.state}, ${per.address.country}`}
                  </TableCell>
                  <TableCell>
                    {per.phone}
                  </TableCell>
                  <TableCell>
                    {format(per.createdAt, 'dd/MM/yyyy')}
                  </TableCell>
                </TableRow>
              ))} */}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={count}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage} />

    </Card>
  );
};

CustomerListResults.propTypes = {
  person: PropTypes.array.isRequired
};
