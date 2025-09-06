"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Global 404 handler: redirects any unmatched route to /error page
// Note: This preserves a 404 in the server response only if you keep custom handling.
// Since we immediately client-redirect, search engines may treat /error as canonical.
// Adjust if you need distinct 404 SEO behavior.
export default function NotFound() {
  const router = useRouter();
  useEffect(() => {
    // small timeout allows paint of minimal fallback if needed
    const t = setTimeout(() => router.replace('/error'), 50);
    return () => clearTimeout(t);
  }, [router]);
  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-cyan-300 font-mono">
      <p className="animate-pulse tracking-widest text-sm">REDIRECTING...</p>
    </div>
  );
}
