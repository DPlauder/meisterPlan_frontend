// lib/fetchClient.ts

export async function apiFetch<T>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  const token = localStorage.getItem('token');

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Fehler bei der Anfrage');
  }

  return response.json() as Promise<T>;
}

// Spezielle Funktion für DELETE-Operationen, die möglicherweise kein JSON zurückgeben
export async function apiDelete(url: string): Promise<boolean> {
  const token = localStorage.getItem('token');

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  const response = await fetch(url, {
    method: 'DELETE',
    headers,
  });

  console.log('DELETE Response:', {
    status: response.status,
    ok: response.ok,
    contentType: response.headers.get('content-type'),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Fehler beim Löschen');
  }

  // Versuche verschiedene Response-Formate zu parsen
  const contentType = response.headers.get('content-type');

  if (contentType?.includes('application/json')) {
    // Gateway gibt JSON zurück
    return response.json();
  } else {
    // Gateway gibt möglicherweise plain text oder leeren body zurück
    const text = await response.text();
    console.log('DELETE Response Text:', text);

    if (text === 'true' || text === 'false') {
      return text === 'true';
    }

    // Fallback: wenn kein spezifischer Wert, dann response.ok verwenden
    return response.ok;
  }
}
