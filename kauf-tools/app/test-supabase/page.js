import { supabase } from '@/lib/supabaseClient'

export default async function TestSupabasePage() {
  const { data, error } = await supabase.from('calls').select('*')

  return (
    <main style={{ padding: '2rem', fontFamily: 'monospace' }}>
      <h1>Supabase — test de conexión</h1>

      {error ? (
        <>
          <h2 style={{ color: 'red' }}>Error</h2>
          <pre>{JSON.stringify(error, null, 2)}</pre>
        </>
      ) : (
        <>
          <h2>Filas en calls: {data.length}</h2>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </>
      )}
    </main>
  )
}
