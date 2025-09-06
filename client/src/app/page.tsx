import Link from "next/link";

export default function Home() {
  return (
    <div className="flex h-screen justify-center items-center">
      <div className="flex gap-2 items-center">
        <Link
          href={"/server"}
          className="bg-slate-950 py-4 px-8 rounded-full text-white border border-white hover:bg-slate-800 transition-colors duration-200"
        >
          Server
        </Link>
        <Link
          className="bg-white py-4 px-8  rounded-full text-slate-950 border border-slate-950 hover:bg-gray-100 transition-colors duration-200"
          href={"/client"}
        >
          Client
        </Link>
      </div>
    </div>
  );
}
