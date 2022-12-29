import { useEffect, useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import EditIcon from '@mui/icons-material/Edit';
import { Search as SearchIcon } from '../../icons/search';
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
  TextField,
  InputAdornment,
  SvgIcon, Typography
} from '@mui/material';

const columns = [
  { id: 'id', label: 'AWARD ID'},
  { id: 'year', label: 'YEAR'},
  { id: 'description', label: 'DESCRIPTION'},
  { id: 'person_id', label: 'PERSON ID'},
  { id: 'content_id', label: 'CONTENT ID' },
  { id: 'edit', label: 'EDIT'},
];

export const AwardListResults = () => {
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(0);
  const [human, setHuman] = useState([]);
  const [award, setAward] = useState([]);
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [role, setRole] = useState('');
  const [birthday, setBirthday] = useState('');
  const [perid, setPerid] = useState('');
  const [keyword, setKeyword] = useState('');


  useEffect(() => {
    fetch('https://dev-pdb.kocowa.com/api/v01/be/award/list?person_id=' + '0' + '&offset=' + (page) * rowsPerPage +  '&limit=' + rowsPerPage)
    .then((response) => response.json())
    .then((json => {
      setCount(json.total_count);
      setAward(json.objects);
    }))
  }, [page, keyword])
  console.log(award)

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
      <Box sx={{ maxWidth: 500 }}>
            <TextField
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SvgIcon
                      color="action"
                      fontSize="small"
                    >
                      <SearchIcon />
                    </SvgIcon>
                  </InputAdornment>
                )
              }}
              onKeyUp={(event) =>{
                if("Enter" === event.key){
                  setKeyword(event.target.value);
                  setPage(0);
                }

              }}
              placeholder="Search"
              variant="outlined"
            />
      </Box>
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
  
            {award
                .map((aw) => {
                  return (
                    <TableRow key={aw.id} hover selected={selectedCustomerIds.indexOf(aw.id) !== -1}>
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={selectedCustomerIds.indexOf(aw.id) !== -1}
                          onChange={(event) => handleSelectOne(event, aw.id)}
                          value="true"/>
                      </TableCell>
                      {columns.map((column) => {
                      
                      const value = aw[column.id];
                      if (typeof value == 'object') {
                    
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {value.award}
                          </TableCell>
                        );
                      }
                      if (column.id === 'edit'){
                        return(
                          <TableCell key={column.id} align={column.align}>
                            <EditIcon></EditIcon>
                          </TableCell>
                          );

                        }
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {value}
                        </TableCell>
                      );
                    })}
                      

                    </TableRow>
                    
                  );
                  
                })}

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

AwardListResults.propTypes = {
  person: PropTypes.array.isRequired
};
