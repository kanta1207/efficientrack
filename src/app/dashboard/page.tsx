import Image from 'next/image';
import { redirect } from 'next/navigation';

import { auth } from '@/auth';

export default async function Home() {
  const session = await auth();

  if (!session?.user) {
    redirect('/api/auth/signin?callbackUrl=/');
  }

  return (
    <>
      <p>{session.user.id}</p>
      <p>{session.user.name}</p>
      <p>{session.user.email}</p>
      <Image width={500} height={500} alt="user image" src={session.user.image ?? ''} />
    </>
  );
}
