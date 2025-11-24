import { configureStore } from "@reduxjs/toolkit"
import {pasteSlicer} from './pasteSlicer'

export const store = configureStore({
    reducer: {
        paste: pasteSlicer.reducer,
    },
})

export default  store;