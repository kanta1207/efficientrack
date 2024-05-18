import { ClerkLoaded, ClerkLoading, SignIn } from '@clerk/nextjs';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';
export default function Page() {
  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      <div className="h-full px-4 lg:flex lg:flex-col lg:items-center lg:justify-center">
        <div className="space-y-4 pt-16 text-center">
          <h1 className="text-[#2E2A47 text-3xl font-bold">Welcome Back!</h1>
          <p className="text-base text-[#7E8CA0]">
            Log in to create account or sign in to existing account.
          </p>
        </div>
        <div className="mt-8 flex items-center justify-center">
          <ClerkLoaded>
            <SignIn path="/sign-in" />
          </ClerkLoaded>
          <ClerkLoading>
            <Loader2 className="animate-spin text-muted-foreground" />
          </ClerkLoading>
        </div>
      </div>
      <div className="hidden h-full lg:flex lg:items-center lg:justify-center">
        <Image src="/logo.svg" height={100} width={100} alt="logo" />
      </div>
    </div>
  );
}
