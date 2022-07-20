
const messages = supabase
  .from('messages')
  .on('*', payload => {
    console.log('Change received!', payload)
  })
  .subscribe()