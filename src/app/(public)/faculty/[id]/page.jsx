import PageComponent from '@/views/FacultyProfile';

export async function generateMetadata({ params }) {
  const rawId = params?.id ? decodeURIComponent(params.id) : '';
  const formattedName = rawId
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  return {
    title: `${formattedName || 'Faculty Profile'} | Madhusudan Institute of Co-operative Management (MICM)`,
    description: `Academic and professional profile of faculty member at Madhusudan Institute of Co-operative Management (MICM), Bhubaneswar.`,
  };
}

export default function Page({ params }) {
  return <PageComponent facultyId={params?.id} />;
}
