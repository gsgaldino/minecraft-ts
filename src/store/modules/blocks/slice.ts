import { createSlice } from '@reduxjs/toolkit'
import { ICube } from '@/types'

interface BlocksState {
  blocks: ICube[]
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
      console.log('blocks', state.blocks)
    }
  }
})

export const { addBlock, addBlocks } = blocksSlice.actions
export default blocksSlice.reducer
