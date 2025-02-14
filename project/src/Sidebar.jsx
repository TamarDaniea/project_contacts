import React, { useState, useEffect } from "react";
import { Drawer, Box, IconButton, Typography, Divider, List, ListItem, ListItemText, Avatar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import { useSelector } from "react-redux";
import StarIcon from "@mui/icons-material/Star";
import NewContactForm from "./NewContactForm";

export default function Sidebar({ open, setOpen }) {

  const toggleDrawer = (isOpen) => () => {
    setOpen(isOpen);
  };
  const userToShow = useSelector((st) => st.listOfContacts.thisContact);
  const [isEditMode, setIsEditMode] = useState(false);
  const [contactData, setContactData] = useState(null);

  const handleEditClick = (contact) => {
    setContactData(contact);
    setIsEditMode(true); 
  };


  return (
    <div>

      <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
        <Box sx={{ width: 350, padding: 2, display: "flex", flexDirection: "column" }}>
          {isEditMode ? (
            <NewContactForm onClose={() => setIsEditMode(false)} isEditMode={true} contactData={contactData} />
          ) : (
            <>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 2 }}>
                <IconButton onClick={toggleDrawer(false)}>
                  <CloseIcon />
                </IconButton>
              </Box>


              {userToShow && (
                <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>

                  <Box sx={{ display: "flex", justifyContent: "center", marginBottom: 2 }}>
                    <Avatar sx={{ width: 80, height: 80 }} src={userToShow.profilePicture} />
                  </Box>

                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: 'space-between' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="h6" sx={{ marginRight: 1 }}>Contact Details</Typography>
                        {userToShow.mainContact && (
                          <Box component="span" sx={{ display: 'inline-flex', alignItems: 'center', color: 'gold' }}>
                            <Typography variant="body2" sx={{ textAlign: 'center', color: 'gray' }}>{userToShow?.mainContact === 1 ? "Main contact  ⭐" : "  "}</Typography>
                         </Box>
                        )}
                      </Box>
                      <IconButton
                        disableRipple
                        sx={{
                          padding: 0,
                          outline: 'none',
                          '&:focus': { outline: 'none' }
                        }}
                        onClick={() => handleEditClick(userToShow)}
                      >
                        <EditIcon style={{ color: '#277DBE', fontSize: 'small' }} />
                        <Typography variant="body2" style={{ color: '#277DBE', fontSize: 'small' }}>
                          edit

                        </Typography>
                      </IconButton>
                    </Box>

                    <Typography variant="body1" sx={{ fontSize: 'small' }}>{userToShow.address}</Typography>
                  </Box>
                  <Divider />

                  <Box sx={{ display: "flex", justifyContent: "space-between", marginBottom: 1 }}>

                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <Typography variant="caption" sx={{ color: '#A3B5C9', fontSize: '0.8rem' }}>
                        Name
                      </Typography>
                      <Typography variant="body1" sx={{ color: '#193451' }}>
                        {userToShow.name}
                      </Typography>
                    </Box>


                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <Typography variant="caption" sx={{ color: '#A3B5C9', fontSize: '0.8rem' }}>
                        Role
                      </Typography>
                      <Typography variant="body1" sx={{ color: '#193451' }}>
                        {userToShow.role}
                      </Typography>
                    </Box>

                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <Typography variant="caption" sx={{ color: '#A3B5C9', fontSize: '0.8rem' }}>
                        Contact Type
                      </Typography>
                      <Typography variant="body1" sx={{ color: '#193451' }}>
                        {userToShow.contactType}
                      </Typography>
                    </Box>
                  </Box>



                  <List sx={{ flexGrow: 1 }}>
                    <ListItem>
                      <ListItemText
                        primary={<Typography variant="caption" sx={{ color: "gray" }}>Preferred Language</Typography>}
                        secondary={userToShow.preferredLanguage}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary={<Typography variant="caption" sx={{ color: "gray" }}>Phone</Typography>}
                        secondary={userToShow.phone?.work || userToShow.phone || "Phone number not available"}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary={<Typography variant="caption" sx={{ color: "gray" }}>Email</Typography>}
                        secondary={userToShow.email}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary={<Typography variant="caption" sx={{ color: "gray" }}>Address</Typography>}
                        secondary={userToShow.address}
                      />
                    </ListItem>

                  </List>

                  <Box sx={{ marginTop: "auto" }}>
                    <Divider />
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>

                      <Box>
                        <Typography variant="caption" sx={{ color: '#A3B5C9', fontSize: '0.8rem' }}>
                          Name for invoice:
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#193451' }}>
                          {userToShow.nameForInvoice}
                        </Typography>
                      </Box>


                      <Box>
                        <Typography variant="caption" sx={{ color: '#A3B5C9', fontSize: '0.8rem' }}>
                          Accounting Ref:
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#193451' }}>
                          {userToShow.accountingRef}
                        </Typography>
                      </Box>


                      <Box>
                        <Typography variant="caption" sx={{ color: '#A3B5C9', fontSize: '0.8rem' }}>
                          VAT number:
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#193451' }}>
                          {userToShow.vatNumber}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              )}
            </>
          )}
        </Box>
      </Drawer>

    </div>

  );
}
