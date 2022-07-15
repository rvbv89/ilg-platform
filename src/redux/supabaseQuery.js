//
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { supabase } from '../supabase/init';

export const supabaseQuery = createApi({
  reducerPath: 'supabaseQuery',
  baseQuery: fetchBaseQuery(),
  endpoints: builder => ({
    fetchMessages: builder.query({
      queryFn: async () => {
        let { data, error } = await supabase.from('messages').select('*');
        return { data, error };
      },
    }),
  }),
});

export const { useHandleLoginPMutation } = supabaseQuery;
export const { useFetchMessagesQuery } = supabaseQuery;
export const { useHandleLoginQuery } = supabaseQuery;
