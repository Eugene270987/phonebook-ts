import { createSlice, createEntityAdapter, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

type Contact = {
    id: number;
    name: string;
    username: string;
    phone: string;
}

export const contactsAdapter = createEntityAdapter<Contact>();

type State = ReturnType<typeof contactsAdapter.getInitialState> & {
    error: string | null;
};

const initialState: State = contactsAdapter.getInitialState({
    error: null,
});

export const fetchContacts = createAsyncThunk<Contact[], void, { rejectValue: string }>(
    'contacts/fetchContacts',
    async () => {
        try {
            const response = await axios.get<Contact[]>('https://jsonplaceholder.typicode.com/users');
            return response.data;
        } catch (error) {
            throw new Error('Failed to fetch contacts.');
        }
    }
);

export const contactSlice = createSlice({
    name: 'contacts',
    initialState,
    reducers: {
        addContact: contactsAdapter.addOne,
        deleteContact: contactsAdapter.removeOne,
    },
    extraReducers: builder => {
        builder
            .addCase(fetchContacts.fulfilled, (state, { payload }) => {
                contactsAdapter.upsertMany(state, payload);
                state.error = null;
            })
            .addCase(fetchContacts.rejected, (state, action) => {
                if (action.payload) {
                    state.error = action.payload;
                } else {
                    state.error = 'Failed to fetch contacts.';
                }
            });
    }
});

export const { addContact, deleteContact } = contactSlice.actions;

export default contactSlice.reducer;