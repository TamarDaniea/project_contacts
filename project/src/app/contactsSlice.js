import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  arr: [],
  thisContact: null
}

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
 
  reducers: {
    selectContact: (state, action) => {
    
      state.thisContact = action.payload;
    },
    updateContact: (state, action) => {
      const index = state.arr.findIndex(c => c.id === action.payload.id);
      if (index !== -1) {
        state.arr[index] = { ...state.arr[index], ...action.payload };
      }
    },
    addContact: (state, action) => {
      const existContact = state.arr.find(item => item.id === action.payload.id)
      if (!existContact)
        state.arr.push(action.payload)
    },
    EnterDetails: (state, action) => {
      state.arr = action.payload;
    },
    changeStar: (state, action) => {
      const index = state.arr.findIndex(c => c.id === action.payload.id);
      if (index !== -1) {
        const newIsMain = action.payload.mainContact === 1 ? 1 : 0;
        state.arr[index].mainContact = newIsMain;
      }
    }
    , updateUserContact: (state, action) => {
      console.log('Action payload:', action.payload);
      const { id, mainContact } = action.payload;
      const contact = state.arr.find(c => c.id === id);
      if (contact) contact.mainContact = mainContact;
    }
  }
});

export const { selectContact, updateContact, addContact, EnterDetails,changeStar } = contactsSlice.actions;
export default contactsSlice.reducer;
