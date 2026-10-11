// Shared publication contract. Identical copy in the practice generator.
export function canPublishEvidence(record, brand, route) {
  if (!record?.source_verified || !['nizzar.com', 'thequantumbranding.com'].includes(brand)) return false;
  const placements = record.pages ?? record.authorized_placements ?? [];
  if (!placements.includes(brand + route)) return false;
  let url;
  try { url = new URL(record.source_url); } catch { return false; }
  if (url.protocol !== 'https:' || url.username || url.password || url.searchParams.has('recommendationUrn') || url.searchParams.has('profileFormEntryPoint')) return false;
  const platform = (record.source ?? record.source_platform ?? '').toLowerCase();
  if (platform === 'linkedin') {
    return url.hostname === 'www.linkedin.com' &&
      url.pathname === '/in/nizzar/details/recommendations/' &&
      record.source_url_type === 'recommendations_section';
  }
  if (platform === 'fiverr') {
    return url.hostname === 'www.fiverr.com' && url.pathname === '/nizzar' && record.source_url_type === 'account_reviews';
  }
  return false;
}
