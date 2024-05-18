import { UserButton } from '@clerk/nextjs';

export default function Home() {
  return (
    <div>
      <h1>Authenticated route</h1>
      <UserButton afterSignOutUrl="/" />
    </div>
  );
}
