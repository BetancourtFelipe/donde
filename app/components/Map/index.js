import dynamic from 'next/dynamic';

const map = dynamic(() => import('./Map'), {
  ssr: false,
});
export default map;
