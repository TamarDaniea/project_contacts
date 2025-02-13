import React, { useState } from "react";
import { Popover, IconButton, Box, Typography, MenuItem, Select, Switch, Button } from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import CloseIcon from "@mui/icons-material/Close";

const FilterMenu = ({ onFilter }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [filters, setFilters] = useState({
    contactType: "All",
    tags: "All",
    active: "All",
    mainContact: false,
  });

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSave = () => {
    onFilter(filters);
    handleClose();
  };

  const handleClearAll = () => {
    setFilters({
      contactType: "All",
      tags: "All",
      active: "All",
      mainContact: false,
    });
  };

  return (
    <div>
      <IconButton onClick={handleClick}>
        <FilterAltIcon />
      </IconButton>

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Box sx={{ p: 2, width: 250 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6">Filter</Typography>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Box display="flex" justifyContent="flex-start" mt={1}>
            <Button
              onClick={handleClearAll}
              variant="contained"
              sx={{
                borderRadius: "20px",
                backgroundColor: "#bdbdbd",
                color: "black",
                textTransform: "none",
                padding: "4px 8px",
                fontSize: "0.8rem",
                "&:hover": { backgroundColor: "#afafaf" },
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <CloseIcon sx={{ fontSize: "1rem", mr: 0.5 }} />
              Clear all
            </Button>
          </Box>

          <Typography variant="body2" mt={2}>Contact Type</Typography>
          <Select fullWidth value={filters.contactType} onChange={(e) => setFilters({ ...filters, contactType: e.target.value })}>
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Client">Client</MenuItem>
            <MenuItem value="Supplier">Supplier</MenuItem>
            <MenuItem value="Employee">Employee</MenuItem>
            <MenuItem value="Partner">Partner</MenuItem>
          </Select>

          <Typography variant="body2" mt={2}>Tags</Typography>
          <Select fullWidth value={filters.tags} onChange={(e) => setFilters({ ...filters, tags: e.target.value })}>
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="VIP">VIP</MenuItem>
            <MenuItem value="Regular">Regular</MenuItem>
          </Select>

          <Typography variant="body2" mt={2}>Active Contact</Typography>
          <Select fullWidth value={filters.active} onChange={(e) => setFilters({ ...filters, active: e.target.value })}>
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Yes">Yes</MenuItem>
            <MenuItem value="No">No</MenuItem>
          </Select>

          <Typography variant="body2" mt={2}>Main Contact</Typography>
          <Switch checked={filters.mainContact} onChange={(e) => setFilters({ ...filters, mainContact: e.target.checked })} />

          <Box display="flex" justifyContent="space-between" mt={2}>
            <Button onClick={handleClose}>Cancel</Button>
            <Button variant="contained" color="primary" onClick={handleSave}>Save</Button>
          </Box>
        </Box>
      </Popover>
    </div>
  );
};

export default FilterMenu;