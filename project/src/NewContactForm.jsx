import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Box, Typography, styled, Avatar, IconButton, Select, MenuItem, Grid, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ReactCountryFlag from "react-country-flag";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { addContact } from './app/contactsSlice';
import { updateContact } from './app/contactsSlice';
import { useDispatch, useSelector } from 'react-redux'

const NewContactForm = ({ onClose, isEditMode, contactData }) => {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const [image, setimage] = useState(null);
    const [phoneNumbers, setPhoneNumbers] = useState(['']);
    const [emails, setEmails] = useState(['']);
    const contacts = useSelector(state => state.contacts);;

    const onSubmit2 = (data) => {
        if (!contactData) {
        
            data.name = data.firstName + " " + data.lastName;
            dispatch(addContact(data));
        } else {
            dispatch(updateContact(data));
        }

        console.log("Form Data:", data);
        onClose();
    };


    const StyledTextField = styled(TextField)(({ theme }) => ({
        '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
        },
    }));

    const StyledButton = styled(Button)(({ theme }) => ({
        border: '1px solid #ced4da',
        borderRadius: '4px',
        padding: '8px 12px',
        backgroundColor: '#fff',
        color: '#495057',
        textTransform: 'none',
        justifyContent: 'space-between',
        width: '100%',
        '&:hover': {
            borderColor: '#80bdff',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
        '& .MuiButton-endIcon': {
            marginLeft: 'auto',
        },
    }));
    const handleChange = (event) => {
        setValue(event.target.name, event.target.value);
    };



    const [showMailingAddress, setShowMailingAddress] = useState(false);
    const [showBillingInformation, setShowBillingInformation] = useState(false);

    const handleToggleMailingAddress = () => {
        setShowMailingAddress(!showMailingAddress);
    };

    const handleToggleBillingInformation = () => {
        setShowBillingInformation(!showBillingInformation);
    };

    const handleimageChange = (event) => {
        setimage(URL.createObjectURL(event.target.files[0]));
    };

    const handleAddPhone = () => setPhoneNumbers([...phoneNumbers, '']);
    const handlePhoneChange = (index, event) => {
        const newPhoneNumbers = [...phoneNumbers];
        newPhoneNumbers[index] = event.target.value;
        setPhoneNumbers(newPhoneNumbers);
    };
    const handleDeletePhone = (index) => setPhoneNumbers(phoneNumbers.filter((_, i) => i !== index));

    const handleAddEmail = () => setEmails([...emails, '']);
    const handleEmailChange = (index, event) => {
        const newEmails = [...emails];
        newEmails[index] = event.target.value;
        setEmails(newEmails);
    };
    const handleDeleteEmail = (index) => setEmails(emails.filter((_, i) => i !== index));

    useEffect(() => {
        if (isEditMode && contactData) {
            const fullName = contactData.name || "";
            const [firstName, lastName] = fullName.split(" ");

            setValue("firstName", firstName || "");
            setValue("lastName", lastName || "");
            setValue("role", contactData.role);
            setValue("contactType", contactData.contactType);
            setValue("preferredLanguage", contactData.preferredLanguage);
            setValue("image", contactData.image);

          
            setPhoneNumbers(contactData.phoneNumbers || []);
            setEmails(contactData.emails || []);
        }
    }, [isEditMode, contactData, setValue]);

    let dispatch = useDispatch();
    const languageOptions = [
        { value: 'hebrew', label: 'Hebrew', flag: 'il' },
        { value: 'english', label: 'English', flag: 'us' },
        { value: 'spanish', label: 'Spanish', flag: 'es' },
        { value: 'french', label: 'French', flag: 'fr' },
    ];
    return (
        <Box sx={{ width: 350, p: 2, display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <IconButton onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
                <Avatar
                    src={image}
                    sx={{ width: 80, height: 80, mb: 1 }}
                />
                <input
                    type="file"
                    id="profile-picture-input"
                    style={{ display: 'none' }}
                    onChange={handleimageChange}

                />
                <label htmlFor="profile-picture-input" style={{ position: 'relative', display: 'inline-block' }}>
                    <IconButton component="span" sx={{ position: 'absolute', bottom: 0, left: 0, width: 40, height: 40 }}>
                        <EditIcon sx={{ fontSize: 24 }} />
                    </IconButton>
                </label>
            </Box>

            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                New Contact
            </Typography>


            <form onSubmit={handleSubmit(onSubmit2)}>

                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <label htmlFor="First Name">First Name</label>
                        <TextField
                            fullWidth
                            {...register("firstName", {
                                required: "First name is required",
                                minLength: { value: 2, message: "Must be at least 2 characters" },
                                maxLength: { value: 50, message: "Must be at most 50 characters" }
                            })}
                            error={!!errors.firstName}
                            helperText={errors.firstName?.message}
                            disabled={isEditMode}
                        />
                    </Grid>


                    <Grid item xs={6}>
                        <label htmlFor="Last Name">Last Name</label>
                        <TextField
                            fullWidth
                            {...register("lastName", {
                                required: "Last name is required",
                                minLength: { value: 2, message: "Must be at least 2 characters" },
                                maxLength: { value: 50, message: "Must be at most 50 characters" }
                            })}
                            error={!!errors.lastName}
                            helperText={errors.lastName?.message}
                            disabled={isEditMode}
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <label htmlFor="role "> role</label>

                        <TextField
                            name="role"
                            fullWidth
                            {...register("role", {
                                required: "Role is required",
                                minLength: { value: 2, message: "Must be at least 2 characters" },
                                maxLength: { value: 50, message: "Must be at most 50 characters" }
                            })}
                            error={!!errors.role}
                            helperText={errors.role?.message}
                            disabled={isEditMode}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <label htmlFor="contactType">Contact Type</label>
                        <Select
                            name="contactType"
                            fullWidth
                            {...register("contactType", {
                                required: "Contact Type is required"

                            })}
                            error={!!errors.contactType}
                            displayEmpty
                        >
                            <MenuItem value="contractor">Contractor</MenuItem>
                            <MenuItem value="employee">Employee</MenuItem>
                        </Select>
                    </Grid>

                    <Grid item xs={12}>
                        <label htmlFor="preferredLanguage"> preferredLanguage</label>
                        <Select name="preferredLanguage" fullWidth onChange={handleChange} displayEmpty disabled={isEditMode}>

                            {languageOptions.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    <ReactCountryFlag countryCode={option.flag} svg style={{ marginRight: 5 }} />
                                    {option.label}

                                </MenuItem>
                            ))}
                        </Select>
                    </Grid>
                </Grid>
                <Typography variant="subtitle1" mt={2}>Phone</Typography>
                {phoneNumbers.map((phone, index) => (
                    <Box key={index} display="flex" alignItems="center" mb={1} gap={2} flexDirection="row-reverse" marginTop="10px">

                        <Select
                            {...register(`contactDetails.phoneNumbers.${index}.type`)}
                            defaultValue=""
                            sx={{ minWidth: 100 }}
                        >
                            <MenuItem value="Work">Work</MenuItem>
                            <MenuItem value="Home">Home</MenuItem>

                        </Select>
                        <TextField
                            fullWidth
                            {...register(`contactDetails.phoneNumbers.${index}.number`, {
                                required: "Phone number is required",
                                pattern: { value: /^[0-9]+$/, message: "Only numbers allowed" },
                                minLength: { value: 7, message: "Phone number must be at least 7 digits" }
                            })}
                            error={!!errors?.contactDetails?.phoneNumbers?.[index]?.number}
                            helperText={errors?.contactDetails?.phoneNumbers?.[index]?.number?.message}
                            value={phone.number}
                            onChange={(e) => {
                                const newPhoneNumbers = [...phoneNumbers];
                                newPhoneNumbers[index].number = e.target.value;
                                setPhoneNumbers(newPhoneNumbers);
                            }}
                            disabled={isEditMode}
                        />
                        {index > 0 && (
                            <IconButton onClick={() => handleDeletePhone(index)}>
                                <DeleteIcon />
                            </IconButton>
                        )}
                    </Box>
                ))}
                <Button onClick={handleAddPhone}>+ Add Phone</Button>



                <Typography variant="subtitle1" mt={2}>Email</Typography>
                {emails.map((email, index) => (
                    <Box key={index} display="flex" alignItems="center" mb={1}>
                        <TextField
                            fullWidth
                            {...register(`email[${index}]`, {
                                required: "Email is required",
                                pattern: { value: /^\S+@\S+\.\S+$/, message: "Invalid email format" }
                            })}
                            error={!!errors?.emails?.[index]}
                            helperText={errors?.emails?.[index]?.message}
                            value={email}
                            onChange={(e) => handleEmailChange(index, e)}
                            disabled={isEditMode}
                        />
                        <Select
                            {...register(`contactDetails.phoneNumbers.${index}.type`)}
                            defaultValue=""
                            sx={{ minWidth: 100 }}
                        >
                            <MenuItem value="Work">Work</MenuItem>
                            <MenuItem value="Home">Private</MenuItem>
                        </Select>
                        {index > 0 && (
                            <IconButton onClick={() => handleDeleteEmail(index)}>
                                <DeleteIcon />
                            </IconButton>
                        )}
                    </Box>
                ))}
                <Button onClick={handleAddEmail}>+ Add Email</Button>


                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        Mailing Address
                    </AccordionSummary>
                    <AccordionDetails>
                        <Box mt={1}>
                            <TextField label="Address" name="mailingAddress" fullWidth onChange={handleChange} sx={{ mt: 1 }} />
                            <TextField label="Comment" name="mailingComment" fullWidth multiline rows={2} onChange={handleChange} sx={{ mt: 1 }} />
                        </Box>
                    </AccordionDetails>
                </Accordion>

                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        Billing Information
                    </AccordionSummary>
                    <AccordionDetails>
                        <Box mt={1}>
                            <TextField label="Name for Invoice" name="billingNameForInvoice" fullWidth onChange={handleChange} sx={{ mt: 1 }} />
                            <Grid container spacing={2} sx={{ mt: 1 }}>
                                <Grid item xs={6}>
                                    <TextField label="Accounting Ref" name="billingAccountingRef" fullWidth onChange={handleChange} />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField label="VAT Number" name="billingVATNumber" fullWidth onChange={handleChange} />
                                </Grid>
                            </Grid>
                        </Box>
                    </AccordionDetails>
                </Accordion>

                <Box mt={2} sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                    <Button
                        onClick={onClose}
                        sx={{
                            position: 'static',
                            top: '0px',
                            width: '110px',
                            height: '37px',
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: '10px 16px',
                            gap: '8px',
                            zIndex: 0,
                            borderRadius: '5px',
                            opacity: 1,
                            boxSizing: 'border-box',
                            border: '1px solid #1C3959',
                            textTransform: 'none',
                            backgroundColor: 'transparent',
                            color: '#1C3959',
                            '&:hover': {
                                backgroundColor: '#E0E0E0',
                            }
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        type="submit"
                        sx={{
                            position: 'static', 
                            left: '216.5px', 
                            top: '0px',     
                            width: '110px',
                            height: '37px',
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: '10px 16px',
                            gap: '8px',
                            zIndex: 1,
                            borderRadius: '5px',
                            opacity: 1,
                            background: '#1C3959',
                            boxSizing: 'border-box',
                            border: '1px solid #1C3959',
                            textTransform: 'none', 
                            '&:hover': {
                                background: '#1A3450', 
                                borderColor: '#1A3450'
                            }
                        }}
                    >
                        Save
                    </Button>
                </Box>
            </form>
        </Box >
    );
};

export default NewContactForm;



