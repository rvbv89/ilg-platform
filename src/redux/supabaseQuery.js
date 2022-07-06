import { build } from '@reduxjs/toolkit/dist/query/core/buildMiddleware/cacheLifecycle';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { supabase } from '../supabase/init';

export const supabaseQuery = createApi({
  reducerPath: 'supabaseQuery',
  baseQuery: fetchBaseQuery(),
  endpoints: builder => ({
    handleLogin: build.query({
      queryFn: async (email, password) => {
        let { user, error } = await supabase.auth.signIn({
          email, password
        });
        console.log(user)
      },
    }),
  }),
});
