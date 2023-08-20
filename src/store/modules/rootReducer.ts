import { combineReducers } from '@reduxjs/toolkit'

import blocksReducer from './blocks/slice'

const rootReducer = combineReducers({
  blocks: blocksReducer,
})

export default rootReducer
