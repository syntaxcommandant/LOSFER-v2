import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export const metadata: Metadata = {
  title: 'LOSFER — Search. Match. Reclaim. | Smart Campus Lost & Found',
  description:
    'An intelligent campus lost & found platform that helps students report, match, verify and securely recover their belongings.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark h-full">
      <body className="min-h-screen flex flex-col bg-[#070b14] text-slate-100 antialiased selection:bg-cyan-500/30 selection:text-cyan-200">
        {/* Subtle Ambient Background Gradients */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-gradient-to-tr from-cyan-600/10 via-blue-600/10 to-indigo-600/5 blur-3xl" />
          <div className="absolute top-1/3 -left-40 h-[400px] w-[500px] rounded-full bg-cyan-500/5 blur-3xl" />
          <div className="absolute top-2/3 -right-40 h-[400px] w-[500px] rounded-full bg-blue-600/5 blur-3xl" />
        </div>

        {/* Global Navbar */}
        <Navbar />

        {/* Main Content Area */}
        <main className="flex-1 relative z-10">{children}</main>

        {/* Global Footer */}
        <Footer />
      </body>
    </html>
  );
}
