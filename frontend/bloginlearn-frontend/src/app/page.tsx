import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      Home page <br />
      <Link href={'/login'}>Login</Link><br />
      <Link href={'/signup'}>Signup</Link>
    </div>
  );
}
