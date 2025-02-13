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
import StarIcon from "@mui/icons-material/StarBorder";
import StarFilledIcon from "@mui/icons-material/Star";
import { TableCell, Avatar } from "@mui/material";
import updateUserContact from "./app/contactsSlice"

import Tooltip from "@mui/material/Tooltip";



const OneContact = (props) => {
    const [rating, setRating] = React.useState(props.contact.mainContact ? 1 : 0);
    const { contact, openContactDetails, setOpen } = props;
    const [value, setValue] = React.useState(1);
    const [tooltipText, setTooltipText] = React.useState("");
    let dispatch = useDispatch()

    function aaaa() {
        setOpen(prevOpen => !prevOpen)
        dispatch(selectContact(contact))
    }
    const handleRatingChange = () => {
        const newValue = rating === 1 ? 0 : 1;
        setRating(newValue);
        console.log("Previous rating:", rating, "New rating:", newValue);
        dispatch(updateUserContact({ id: props.contact.id, mainContact: !!newValue }));
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

            <TableCell align="center">
                <IconButton onClick={handleRatingChange} sx={{
                    color: "#7691AF",
                    borderRadius: "50%",
                    fontSize: 24
                }} >
                    {rating ? <StarFilledIcon /> : <StarIcon />}
                </IconButton>
            </TableCell>
            <td>
                <IconButton onClick={aaaa}>
                    <RemoveRedEyeOutlinedIcon />
                </IconButton>
            </td>
        </tr>
    );
};

export default OneContact;
