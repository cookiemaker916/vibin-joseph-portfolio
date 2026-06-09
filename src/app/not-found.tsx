import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-obsidian text-white px-6 text-center">
      <h2 className="text-6xl md:text-8xl font-display font-bold text-crimson mb-6 tracking-tighter">
        404
      </h2>
      <p className="text-xl text-metallic mb-10 max-w-md font-sans">
        The elite blueprint you are looking for does not exist or has been relocated.
      </p>
      <Link 
        href="/" 
        className="px-8 py-4 bg-crimson text-white font-bold rounded-full overflow-hidden transition-all shadow-[0_0_20px_rgba(225,29,72,0.3)] hover:shadow-[0_0_40px_rgba(225,29,72,0.6)]"
      >
        Return to Headquarters
      </Link>
    </div>
  );
}
