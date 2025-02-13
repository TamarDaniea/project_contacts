import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import OneContact from "./OneContact";
import FilterMenu from "./FilterMenu";
import NewContactForm from "./NewContactForm";
import { 
  Box, Typography, TextField, Button, Drawer, 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper 
} from "@mui/material";

const ContactsList = ({ setOpen }) => {
  const contacts = useSelector(state => state.listOfContacts.arr);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    contactType: "All",
    tags: "All",
    active: "All",
    mainContact: false,
  });
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    applyFilters(filters, searchTerm);
  }, [contacts, searchTerm, filters]);

  const applyFilters = (filters, search) => {
    let filtered = contacts.filter(c => {
      return (filters.contactType === "All" || c.contactType === filters.contactType) &&
        (filters.tags === "All" || c.tags.includes(filters.tags)) &&
        (filters.active === "All" || (filters.active === "Yes" ? c.active : !c.active)) &&
        (!filters.mainContact || c.mainContact);
    });

    if (search) {
      filtered = filtered.filter(c =>
        c.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredContacts(filtered);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setIsDrawerOpen(open);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", p: 2 }}>
    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}> 
        <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography variant="h5" sx={{ mr: 2 }}>Contacts</Typography>
            <Box sx={{ display: "flex", alignItems: "center" }}> 
                <FilterMenu onFilter={handleFilterChange} onReset={() => setFilters({
                    contactType: "All",
                    tags: "All",
                    active: "All",
                    mainContact: false
                })} />
                <Typography variant="body2" sx={{ ml: 1 ,fontSize: '20px'}}>Filter</Typography>
            </Box>
        </Box>
        <Button variant="contained" sx={{ backgroundColor: '#1C3959', color: 'white', '&:hover': { backgroundColor: '#182f45' } }} onClick={toggleDrawer(true)}>
            + New Contact
        </Button>
    </Box>

    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <TextField
            label="Search in contacts       🔍 "
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={handleSearchChange}
            sx={{ mr: 2 }}
        />
        <Typography variant="body2">{filteredContacts.length} Contacts</Typography>
    </Box>

      <TableContainer component={Paper} sx={{ borderRadius: "10px", overflow: "hidden",width:"1000px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "#1C3959", fontWeight: "bold", textAlign: "left", paddingLeft: "16px" }}>
                Contact Type
              </TableCell>
              <TableCell sx={{ color: "#1C3959", fontWeight: "bold", textAlign: "left" }}>
                Name
              </TableCell>
              <TableCell sx={{ color: "#1C3959", fontWeight: "bold", textAlign: "left" }}>
                Role
              </TableCell>
              <TableCell sx={{ color: "#1C3959", fontWeight: "bold", textAlign: "center" }}>
                Contact Details
              </TableCell>
              <TableCell sx={{ color: "#1C3959", fontWeight: "bold", textAlign: "center" }}>
                Main Contact
              </TableCell>
              <TableCell sx={{ color: "#1C3959", fontWeight: "bold", textAlign: "center" }}>
                ...
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredContacts.map((c) => (
              <OneContact key={c.id} contact={c} setOpen={setOpen} sx={{ backgroundColor: "white" }} />
            ))}
          </TableBody>
        </Table>
        
      </TableContainer>

      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={toggleDrawer(false)}
      >
        <Box sx={{ width: 400, p: 2 }}>
          <NewContactForm onClose={toggleDrawer(false)} />
        </Box>
      </Drawer>
    </Box>
  );
};

export default ContactsList;
