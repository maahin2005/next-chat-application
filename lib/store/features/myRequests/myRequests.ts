import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface MyRequests{
    incomingRequests?:[Object] | null;
    outgoingRequests?:[Object] | null;
}

const initialState: MyRequests = {
    incomingRequests:null,
    outgoingRequests:null
}

export const myRequestsSlices = createSlice({
    name:"myRequests",
    initialState,
    reducers: {
        myIncomingRequests:(state,action: PayloadAction<[Object]>)=>{
            state.incomingRequests = action.payload
        },
        myOutgoingRequests:(state,action: PayloadAction<[Object]>)=>{
            state.outgoingRequests = action.payload
        }
    }
})

export const {myIncomingRequests,myOutgoingRequests} = myRequestsSlices.actions

export default myRequestsSlices.reducer;