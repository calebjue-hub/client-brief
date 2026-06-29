import { supabase } from './supabase'

export async function fetchClients() {
  const { data, error } = await supabase
    .from('clients')
    .select('*')
    .order('created_at', { ascending: true })
  if (error) throw error
  return data || []
}

export async function upsertClient(client) {
  const row = {
    client_id:      client.client_id || client.id,
    name:           client.name,
    industry:       client.industry || '',
    hq:             client.hq || '',
    country:        client.country || '',
    status:         client.status || 'Active',
    ticker:         client.ticker || '—',
    tier:           client.tier || 2,
    source:         client.source || '',
    website_url:    client.website_url || client.source || '',
    image_url:      client.image_url || '',
    error_detected: client.error_detected || false,
  }

  if (client.id && client.id.length === 36) {
    const { data, error } = await supabase
      .from('clients')
      .update(row)
      .eq('id', client.id)
      .select()
      .single()
    if (error) throw error
    return data
  }

  const { data, error } = await supabase
    .from('clients')
    .insert(row)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function bulkUpsertClients(clients) {
  const rows = clients.map(c => ({
    client_id:      c.client_id || c.id,
    name:           c.name || c.account || '',
    industry:       c.industry || '',
    hq:             c.hq || '',
    country:        c.country || '',
    status:         c.status || 'Active',
    ticker:         c.ticker || '—',
    tier:           c.tier || 2,
    source:         c.source || '',
    website_url:    c.website_url || c.source || '',
    image_url:      c.image_url || '',
    error_detected: c.error_detected || false,
  }))

  const { data, error } = await supabase
    .from('clients')
    .insert(rows)
    .select()
  if (error) throw error
  return data || []
}

export async function deleteClient(id) {
  const { error } = await supabase
    .from('clients')
    .delete()
    .eq('id', id)
  if (error) throw error
}

export async function deleteClientBySlug(clientId) {
  const { error } = await supabase
    .from('clients')
    .delete()
    .eq('client_id', clientId)
  if (error) throw error
}

export async function replaceAllClients(clients) {
  const { error: delError } = await supabase
    .from('clients')
    .delete()
    .neq('id', '00000000-0000-0000-0000-000000000000')
  if (delError) throw delError

  if (clients.length === 0) return []
  return bulkUpsertClients(clients)
}

export function toAppFormat(row) {
  return {
    id:             row.client_id,
    dbId:           row.id,
    account:        row.name,
    name:           row.name,
    industry:       row.industry || '',
    hq:             row.hq || '',
    country:        row.country || '',
    status:         row.status || 'Active',
    ticker:         row.ticker || '—',
    tier:           row.tier || 2,
    source:         row.source || '',
    website_url:    row.website_url || '',
    image_url:      row.image_url || '',
    error_detected: row.error_detected || false,
    sig:            [],
    ytd:            null,
  }
}
