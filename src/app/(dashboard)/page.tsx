import Image from 'next/image';

export default function Home() {
  return (
    <div>
      <h1>Authenticated route</h1>
      <Image src="/logo.svg" alt="Vercel Logo" width={72} height={16} />
    </div>
  );
}
