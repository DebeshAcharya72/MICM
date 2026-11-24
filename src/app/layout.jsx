import '../index.css';

export const metadata = {
  title: 'Madhusudan Institute of Co-operative Management (MICM), Bhubaneswar',
  description: 'A premier Management Institute established in 1955-56, promoted by National Council for Cooperative Training (NCCT), Ministry of Cooperation, Govt. of India. AICTE Approved & BPUT Affiliated.',
  icons: {
    icon: '/micm-logo.png',
    shortcut: '/micm-logo.png',
    apple: '/micm-logo.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white text-slate-800 antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
