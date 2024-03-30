import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd } from '@fortawesome/free-solid-svg-icons';

import { useAxios } from '@/hooks';
import { useTestStore } from '@/stores';
import { TestButton } from '@/components/ui';

export const TestPage = () => {
  const { response: response1 } = useAxios({
    url: 'https://dummyjson.com/products/1',
    method: 'GET',
  });
  const { response: response2, sendData } = useAxios({
    url: 'https://dummyjson.com/products/2',
    method: 'GET',
  });

  const { setTestStore } = useTestStore();
  const navigate = useNavigate();

  return (
    <div className='flex flex-col justify-center items-center gap-4'>
      <p>{<FontAwesomeIcon icon={faAdd} className='text-red-300 w-4 h-4' />}</p>
      <h2>{response1?.data?.description}</h2>
      <TestButton
        className='w-40'
        labelText='hihi'
        onClick={() => {
          sendData();
          if (response2) {
            setTestStore(response2.data?.title);
            navigate('/test');
          }
        }}
      />
    </div>
  );
};
