import Link from "next/link";

export default function Home() {
  return (
    <>
      <h1 className="text-indigo-700 text-7xl">Hola mundo</h1>
      <Link href="/menu">Menu</Link>
    </>
  );
}
