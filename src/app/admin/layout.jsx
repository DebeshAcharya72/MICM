export const metadata = {
  title: 'Admin CMS | Madhusudan Institute of Co-operative Management (MICM)',
};

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-100">
      {children}
    </div>
  );
}
