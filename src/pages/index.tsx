import { Calendar, Layout } from '@/components';
import { monthString, year } from '@/utils';

export default function Home() {
  return (
    <Layout>
      <div className="container relative mx-auto p-4">
        <h1 className="font-bold text-xl md:text-3xl text-center">
          PT Sukses Solusindo Digital
        </h1>
        <div className="font-bold text-xl md:text-3xl text-center mt-1">
          {`${monthString} ${year}`}
        </div>
        <div className="mt-2">
          <Calendar />
        </div>
      </div>
    </Layout>
  );
}
