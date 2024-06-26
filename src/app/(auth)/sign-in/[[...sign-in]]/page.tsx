import Image from 'next/image';
export default function Page() {
  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      <div className="h-full px-4 lg:flex lg:flex-col lg:items-center lg:justify-center">
        <div className="mt-8 flex items-center justify-center"></div>
      </div>
      <div className="hidden h-full lg:flex lg:items-center lg:justify-center">
        <Image src="/logo.svg" height={100} width={100} alt="logo" />
      </div>
    </div>
  );
}
