// components/PlaidLink.tsx
'use client';
import { usePlaidLink } from 'react-plaid-link';
import { useState, useEffect } from 'react';

export default function PlaidLink({ onSuccess }: { onSuccess: (token: string) => void }) {
  const [linkToken, setLinkToken] = useState<string>();

  useEffect(() => {
    fetch('/api/plaid/link-token', { method: 'POST' })
      .then(res => res.json())
      .then(data => setLinkToken(data.link_token));
  }, []);

  const config = {
    token: linkToken!,
    onSuccess: (publicToken: string) => onSuccess(publicToken),
  };

  const { open, ready } = usePlaidLink(config);

  return (
    <button 
      onClick={() => open()}
      disabled={!ready}
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
    >
      Connect Bank Account
    </button>
  );
}
