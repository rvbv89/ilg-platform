import { build } from "@reduxjs/toolkit/dist/query/core/buildMiddleware/cacheLifecycle"
import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react"


export const supabaseQuery = 
createApi({
    reducerPath: "supabaseQuery",
    baseQuery: fetchBaseQuery();

    endpoints: (builder) => ({
        getPosts: build.query({
            queryFn: async () => {
              

            }
        })
    })
})
