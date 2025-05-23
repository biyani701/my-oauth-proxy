import { NextRequest, NextResponse } from 'next/server';
import { signIn, auth } from '@/auth';

// Define a type for Auth.js redirect errors
interface AuthRedirectError extends Error {
  digest: string;
}

// Check if an error is an Auth.js redirect error
function isAuthRedirectError(error: unknown): error is AuthRedirectError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'digest' in error &&
    typeof (error as { digest: string }).digest === 'string' &&
    (error as { digest: string }).digest.startsWith('NEXT_REDIRECT')
  );
}

// Custom sign-in handler for Auth.js v5
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ provider: string }> }
) {
  try {
    // Get the provider from the URL parameters
    const { provider } = await params;

    // Get the callback URL and client origin from the query parameters
    const searchParams = request.nextUrl.searchParams;
    const callbackUrl = searchParams.get('callbackUrl') || '/';
    const clientOrigin = searchParams.get('x-client-origin');
    const origin = searchParams.get('origin');
    const clientId = searchParams.get('clientId');

    console.log(`[auth][signin] Provider: ${provider}, CallbackUrl: ${callbackUrl}, ClientOrigin: ${clientOrigin}, Origin: ${origin}, ClientId: ${clientId}`);

    // Store the client origin in the request headers for later use
    const effectiveClientOrigin = clientOrigin || origin;
    if (effectiveClientOrigin) {
      // Create a new request with the client origin header
      const headers = new Headers(request.headers);
      headers.set('x-client-origin', effectiveClientOrigin);

      // This won't modify the original request, but it will be available for logging
      console.log(`[auth][signin] Set x-client-origin header to: ${effectiveClientOrigin}`);

      // Store the client origin in the session for later use
      const session = await auth();
      if (session) {
        session.clientOrigin = effectiveClientOrigin;
        console.log(`[auth][signin] Stored client origin in session: ${effectiveClientOrigin}`);
      }
    }

    // Validate the provider
    if (!provider || !['google', 'github', 'facebook', 'linkedin', 'auth0'].includes(provider)) {
      return NextResponse.redirect(new URL(`/auth-error?error=InvalidProvider&provider=${provider}`, request.url));
    }

    try {
      // Ensure we have a valid callback URL
      const validCallbackUrl = callbackUrl || '/';

      // Log Auth0 configuration if this is an Auth0 sign-in attempt
      if (provider === 'auth0') {
        console.log('[auth][signin][auth0] Auth0 configuration:');
        console.log(`[auth][signin][auth0] AUTH0_ISSUER: ${process.env.AUTH0_ISSUER || 'not set'}`);
        console.log(`[auth][signin][auth0] AUTH0_CLIENT_ID: ${process.env.AUTH0_CLIENT_ID ? 'set' : 'not set'}`);
        console.log(`[auth][signin][auth0] AUTH0_CLIENT_SECRET: ${process.env.AUTH0_CLIENT_SECRET ? 'set' : 'not set'}`);

        // Log the actual issuer URL that will be used (with https:// prefix if needed)
        const issuerUrl = process.env.AUTH0_ISSUER && process.env.AUTH0_ISSUER.startsWith('https://')
          ? process.env.AUTH0_ISSUER
          : `https://${process.env.AUTH0_ISSUER || ''}`;
        console.log(`[auth][signin][auth0] Actual issuer URL to be used: ${issuerUrl}`);

        // Log the well-known configuration URL
        const wellKnownUrl = process.env.AUTH0_ISSUER
          ? (process.env.AUTH0_ISSUER.startsWith('https://')
              ? `${process.env.AUTH0_ISSUER}/.well-known/openid-configuration`
              : `https://${process.env.AUTH0_ISSUER}/.well-known/openid-configuration`)
          : 'not available';
        console.log(`[auth][signin][auth0] Well-known configuration URL: ${wellKnownUrl}`);
      }

      // Get the sign-in URL from Auth.js v5
      console.log(`[auth][signin] Calling signIn with provider: ${provider}, redirectTo: ${validCallbackUrl}`);

      // Create a custom state parameter that includes the client origin
      const stateParam = effectiveClientOrigin ? {
        clientOrigin: effectiveClientOrigin,
        callbackUrl: validCallbackUrl
      } : undefined;

      const signInUrl = await signIn(provider, {
        redirectTo: validCallbackUrl,
        state: stateParam ? JSON.stringify(stateParam) : undefined
      });

      console.log(`[auth][signin] Redirecting to: ${signInUrl}`);

      // Create a redirect response
      return NextResponse.redirect(signInUrl);
    } catch (error: unknown) {
      // If this is a redirect error from Auth.js, handle it
      if (isAuthRedirectError(error)) {
        console.log('[auth][signin] Handling NEXT_REDIRECT:', error.digest);

        // Extract the URL from the digest
        const redirectUrl = error.digest.split(';')[2];
        if (redirectUrl) {
          return NextResponse.redirect(redirectUrl);
        }

        // If we can't extract the URL, throw the error to let Next.js handle it
        throw error;
      }

      console.error('[auth][signin] Error during sign-in:', error);

      // Add more detailed error logging for Auth0
      if (provider === 'auth0') {
        console.error('[auth][signin][auth0] Auth0 sign-in error:');
        if (error instanceof Error) {
          console.error(`[auth][signin][auth0] Error name: ${error.name}`);
          console.error(`[auth][signin][auth0] Error message: ${error.message}`);
          console.error(`[auth][signin][auth0] Error stack: ${error.stack}`);
        }
      }

      // Redirect to the error page for other errors
      return NextResponse.redirect(
        new URL(`/auth-error?error=SignInError&message=${encodeURIComponent(
          error instanceof Error ? error.message : 'Unknown error'
        )}`, request.url)
      );
    }
  } catch (error: unknown) {
    // If this is a redirect error from Auth.js, handle it
    if (isAuthRedirectError(error)) {
      console.log('[auth][signin] Handling NEXT_REDIRECT in outer catch:', error.digest);

      // Extract the URL from the digest
      const redirectUrl = error.digest.split(';')[2];
      if (redirectUrl) {
        return NextResponse.redirect(redirectUrl);
      }

      // If we can't extract the URL, throw the error to let Next.js handle it
      throw error;
    }

    console.error('[auth][signin] Unexpected error:', error);

    // Redirect to the error page
    return NextResponse.redirect(
      new URL(`/auth-error?error=UnexpectedError&message=${encodeURIComponent(
        error instanceof Error ? error.message : 'Unknown error'
      )}`, request.url)
    );
  }
}

// Add a POST handler that does the same thing as the GET handler
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ provider: string }> }
) {
  console.log('[auth][signin] POST request received');
  // Just call the GET handler with the same request and params
  return GET(request, { params });
}

// Add an OPTIONS handler for CORS preflight requests
export async function OPTIONS(
  request: NextRequest
) {
  const origin = request.headers.get('origin') || '';

  const response = new NextResponse(null, { status: 204 });

  // Add CORS headers
  if (origin) {
    response.headers.set('Access-Control-Allow-Origin', origin);
    response.headers.set('Access-Control-Allow-Credentials', 'true');
  } else {
    response.headers.set('Access-Control-Allow-Origin', '*');
  }
  response.headers.set('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization, Origin, Cache-Control, Pragma');
  response.headers.set('Access-Control-Max-Age', '86400');

  return response;
}
