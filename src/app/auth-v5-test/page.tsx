'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function AuthV5TestPage() {
  const [provider, setProvider] = useState('google');
  const [callbackUrl, setCallbackUrl] = useState('/auth-v5-test');

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '1.5rem' }}>Auth.js v5 Test</h1>

      <div style={{ marginBottom: '1.5rem' }}>
        <Link href="/" style={{ marginRight: '1rem', textDecoration: 'underline' }}>Home</Link>
        <Link href="/login" style={{ marginRight: '1rem', textDecoration: 'underline' }}>Login</Link>
        <Link href="/auth-test" style={{ marginRight: '1rem', textDecoration: 'underline' }}>Auth Test</Link>
        <Link href="/auth-flow-test" style={{ marginRight: '1rem', textDecoration: 'underline' }}>Auth Flow Test</Link>
        <Link href="/protected" style={{ textDecoration: 'underline' }}>Protected Page</Link>
      </div>

      <div style={{
        padding: '1.5rem',
        backgroundColor: '#f0f4f8',
        borderRadius: '0.5rem',
        marginBottom: '2rem',
        border: '1px solid #d0e1f9'
      }}>
        <h2 style={{ marginTop: 0, marginBottom: '1rem' }}>Direct Auth.js v5 API Test</h2>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>
            Provider:
            <select
              value={provider}
              onChange={(e) => setProvider(e.target.value)}
              style={{
                marginLeft: '0.5rem',
                padding: '0.5rem',
                borderRadius: '0.25rem',
                border: '1px solid #ccc'
              }}
            >
              <option value="google">Google</option>
              <option value="github">GitHub</option>
              <option value="facebook">Facebook</option>
              <option value="linkedin">LinkedIn</option>
              <option value="auth0">Auth0</option>
            </select>
          </label>
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>
            Callback URL:
            <input
              type="text"
              value={callbackUrl}
              onChange={(e) => setCallbackUrl(e.target.value)}
              style={{
                marginLeft: '0.5rem',
                padding: '0.5rem',
                borderRadius: '0.25rem',
                border: '1px solid #ccc',
                width: '300px'
              }}
            />
          </label>
          <p style={{
            fontSize: '0.85rem',
            color: '#666',
            marginTop: '0.25rem',
            marginLeft: '0.5rem'
          }}>
            This is the URL where you&apos;ll be redirected after signing in or out.
            For testing, it&apos;s best to set this to the current page URL.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <button
            onClick={async () => {
              try {
                // Import dynamically to avoid server-side issues
                const { signIn } = await import('@/lib/auth-client');
                await signIn(provider, { redirectTo: callbackUrl });
              } catch (err) {
                console.error('Error signing in:', err);
                alert('Error signing in: ' + (err instanceof Error ? err.message : 'Unknown error'));
              }
            }}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: '#4285F4',
              color: 'white',
              border: 'none',
              borderRadius: '0.25rem',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Sign In with {provider.charAt(0).toUpperCase() + provider.slice(1)}
          </button>

          <Link
            href={`/logout?callbackUrl=${encodeURIComponent(callbackUrl)}`}
            style={{
              display: 'inline-block',
              padding: '0.75rem 1.5rem',
              backgroundColor: '#f44336',
              color: 'white',
              border: 'none',
              borderRadius: '0.25rem',
              cursor: 'pointer',
              fontWeight: 'bold',
              textDecoration: 'none'
            }}
          >
            Sign Out
          </Link>
        </div>
      </div>

      <div style={{
        padding: '1.5rem',
        backgroundColor: '#f0f8f4',
        borderRadius: '0.5rem',
        marginBottom: '2rem',
        border: '1px solid #d0f9e1'
      }}>
        <h2 style={{ marginTop: 0, marginBottom: '1rem' }}>Auth.js v5 Endpoints</h2>

        <ul style={{ paddingLeft: '1.5rem' }}>
          <li style={{ marginBottom: '0.5rem' }}>
            <a href="/api/auth/signin" target="_blank" rel="noopener noreferrer">
              /api/auth/signin
            </a>
            <span style={{ marginLeft: '0.5rem', fontSize: '0.85rem', color: '#666' }}>
              - Sign-in page
            </span>
          </li>
          <li style={{ marginBottom: '0.5rem' }}>
            <a href="/api/auth/signin/google" target="_blank" rel="noopener noreferrer">
              /api/auth/signin/google
            </a>
            <span style={{ marginLeft: '0.5rem', fontSize: '0.85rem', color: '#666' }}>
              - Google sign-in
            </span>
          </li>
          <li style={{ marginBottom: '0.5rem' }}>
            <a href="/api/auth/signin/github" target="_blank" rel="noopener noreferrer">
              /api/auth/signin/github
            </a>
            <span style={{ marginLeft: '0.5rem', fontSize: '0.85rem', color: '#666' }}>
              - GitHub sign-in
            </span>
          </li>
          <li style={{ marginBottom: '0.5rem' }}>
            <a href="/api/auth/signin/facebook" target="_blank" rel="noopener noreferrer">
              /api/auth/signin/facebook
            </a>
            <span style={{ marginLeft: '0.5rem', fontSize: '0.85rem', color: '#666' }}>
              - Facebook sign-in
            </span>
          </li>
          <li style={{ marginBottom: '0.5rem' }}>
            <a href="/api/auth/signin/linkedin" target="_blank" rel="noopener noreferrer">
              /api/auth/signin/linkedin
            </a>
            <span style={{ marginLeft: '0.5rem', fontSize: '0.85rem', color: '#666' }}>
              - LinkedIn sign-in
            </span>
          </li>
          <li style={{ marginBottom: '0.5rem' }}>
            <a href="/api/auth/signin/auth0" target="_blank" rel="noopener noreferrer">
              /api/auth/signin/auth0
            </a>
            <span style={{ marginLeft: '0.5rem', fontSize: '0.85rem', color: '#666' }}>
              - Auth0 sign-in
            </span>
          </li>
          <li style={{ marginBottom: '0.5rem' }}>
            <a href="/api/auth/signout" target="_blank" rel="noopener noreferrer">
              /api/auth/signout
            </a>
            <span style={{ marginLeft: '0.5rem', fontSize: '0.85rem', color: '#666' }}>
              - Sign out
            </span>
          </li>
          <li style={{ marginBottom: '0.5rem' }}>
            <a href="/api/auth/session" target="_blank" rel="noopener noreferrer">
              /api/auth/session
            </a>
            <span style={{ marginLeft: '0.5rem', fontSize: '0.85rem', color: '#666' }}>
              - Get current session
            </span>
          </li>
          <li style={{ marginBottom: '0.5rem' }}>
            <a href="/api/auth/debug" target="_blank" rel="noopener noreferrer">
              /api/auth/debug
            </a>
            <span style={{ marginLeft: '0.5rem', fontSize: '0.85rem', color: '#666' }}>
              - Debug information
            </span>
          </li>
          <li style={{ marginBottom: '0.5rem' }}>
            <a href="/api/auth/callback/google" target="_blank" rel="noopener noreferrer">
              /api/auth/callback/google
            </a>
            <span style={{ marginLeft: '0.5rem', fontSize: '0.85rem', color: '#666' }}>
              - Google OAuth callback
            </span>
          </li>
          <li style={{ marginBottom: '0.5rem' }}>
            <a href="/api/auth/callback/github" target="_blank" rel="noopener noreferrer">
              /api/auth/callback/github
            </a>
            <span style={{ marginLeft: '0.5rem', fontSize: '0.85rem', color: '#666' }}>
              - GitHub OAuth callback
            </span>
          </li>
          <li style={{ marginBottom: '0.5rem' }}>
            <a href="/api/auth/callback/facebook" target="_blank" rel="noopener noreferrer">
              /api/auth/callback/facebook
            </a>
            <span style={{ marginLeft: '0.5rem', fontSize: '0.85rem', color: '#666' }}>
              - Facebook OAuth callback
            </span>
          </li>
          <li style={{ marginBottom: '0.5rem' }}>
            <a href="/api/auth/callback/linkedin" target="_blank" rel="noopener noreferrer">
              /api/auth/callback/linkedin
            </a>
            <span style={{ marginLeft: '0.5rem', fontSize: '0.85rem', color: '#666' }}>
              - LinkedIn OAuth callback
            </span>
          </li>
          <li style={{ marginBottom: '0.5rem' }}>
            <a href="/api/auth/callback/auth0" target="_blank" rel="noopener noreferrer">
              /api/auth/callback/auth0
            </a>
            <span style={{ marginLeft: '0.5rem', fontSize: '0.85rem', color: '#666' }}>
              - Auth0 OAuth callback
            </span>
          </li>
        </ul>
      </div>

      <div style={{
        padding: '1.5rem',
        backgroundColor: '#f8f0f4',
        borderRadius: '0.5rem',
        border: '1px solid #f9d0e1'
      }}>
        <h2 style={{ marginTop: 0, marginBottom: '1rem' }}>Auth.js v5 Migration Notes</h2>

        <p style={{ marginBottom: '1rem' }}>
          Auth.js v5 has a different API structure than previous versions. Here are some key changes:
        </p>

        <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
          <li style={{ marginBottom: '0.5rem' }}>
            <strong>Redirect Handling:</strong> Auth.js v5 uses Next.js&apos;s built-in redirect mechanism, which throws a NEXT_REDIRECT error.
          </li>
          <li style={{ marginBottom: '0.5rem' }}>
            <strong>Dynamic Routes:</strong> When using dynamic routes, you need to properly handle the params object.
          </li>
          <li style={{ marginBottom: '0.5rem' }}>
            <strong>signIn/signOut:</strong> These functions now return a URL instead of redirecting directly.
          </li>
          <li style={{ marginBottom: '0.5rem' }}>
            <strong>Configuration:</strong> The trustHost option is now required for production.
          </li>
        </ul>

        <p>
          <a
            href="https://authjs.dev/getting-started/migrating-to-v5"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#0070f3', textDecoration: 'underline' }}
          >
            Read the full migration guide
          </a>
        </p>
      </div>
    </div>
  );
}
