import { createSlice } from '@reduxjs/toolkit'

interface BlocksState {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  blocks: any[]
}

const initialState: BlocksState = {
  blocks: []
}

const blocksSlice = createSlice({
  name: 'blocks',
  initialState,
  reducers: {
    addBlock: (state, action) => {
      state.blocks.push(action.payload)
    },
    addBlocks: (state, action) => {
      state.blocks.concat(action.payload)
    }
  }
})

export const { addBlock, addBlocks } = blocksSlice.actions
export default blocksSlice.reducer
