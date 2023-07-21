import { Calendar } from '@/components';
import { monthString, year } from '@/utils';
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>SSD Calendar</title>
        <meta name="description" content="Assessment test SSD" />
      </Head>
      <div className="container relative mx-auto p-4">
        <h1 className="font-bold text-3xl text-center">
          PT Sukses Solusindo Digital
        </h1>
        <div className="font-bold text-3xl text-center mt-1">
          Calendar {`${monthString} ${year}`}
        </div>
        <div className="mt-2">
          <Calendar />
        </div>
      </div>
    </>
  );
}
