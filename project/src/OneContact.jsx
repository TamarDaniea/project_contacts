import icon1 from "./assets/man.svg"
import icon2 from "./assets/phone.svg"
import icon3 from "./assets/mail.svg"
import icon5 from "./assets/eye.svg"
import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import IconButton from "@mui/material/IconButton";
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import { useDispatch } from "react-redux";
import { selectContact } from "./app/contactsSlice";
import { useState } from "react";
import { changeStar } from "./app/contactsSlice";
import { Avatar } from "@mui/material";
import updateUserContact from "./app/contactsSlice"
import Tooltip from "@mui/material/Tooltip";


//קומפננטה להצגת איש קשר 

const OneContact = (props) => {
    const { contact, openContactDetails, setOpen } = props;
    const [value, setValue] = useState(contact.mainContact);
    const [tooltipText, setTooltipText] = React.useState("");
    let dispatch = useDispatch()

    function OpenDetails() {
        setOpen(prevOpen => !prevOpen)
        dispatch(selectContact(contact))
    }
    const handleRatingChange = () => {
        console.log('Contact:', props.contact);
        const newValue = !rating;
        setRating(newValue);
        dispatch(updateUserContact({ id: props.contact.id, mainContact: newValue }));
    };




    return (
        <tr>
            <td style={{ paddingLeft: "40px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <Avatar
                        sx={{ width: 30, height: 30 }}
                        src={contact.image}


                    />
                    {contact.contactType}
                </div>
            </td>


            <td>{contact.name}</td>
            <td>{contact.role}</td>
            <td>
                <div className="icons-container">
                    <Tooltip title={contact.name} arrow>
                        <img
                            src={icon1}
                            alt="Icon 1"
                            style={{ marginRight: "10px", cursor: "pointer" }}
                        />
                    </Tooltip>



                    <Tooltip title={(contact.phone?.work)} arrow>
                        <img
                            src={icon2}
                            alt="Icon 2"
                            style={{ marginRight: "10px", cursor: "pointer" }}
                        />
                    </Tooltip>

                    <Tooltip title={contact.email} arrow>
                        <img
                            src={icon3}
                            alt="Icon 3"
                            style={{ marginRight: "10px", cursor: "pointer" }}
                        />
                    </Tooltip>
                </div>
            </td>

            <td><Rating
                max={1}
                name="simple-controlled"
                value={value}
                onChange={(event, newValue) => {
                    if (newValue === null) newValue = 0;
                    setValue(newValue);
                    const updatedContact = { ...contact, mainContact: newValue };
                    dispatch(changeStar(updatedContact));
                }}


            /></td>
            <td>
                <IconButton onClick={OpenDetails}>
                    <RemoveRedEyeOutlinedIcon />
                </IconButton>
            </td>
        </tr>
    );
};

export default OneContact;
