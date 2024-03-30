import { useNavigate } from 'react-router-dom';
import { useTestStore } from '@/stores';
import { TestButton } from '@/components/ui';

export const TestTestPage = () => {
  const { testStore, resetTestStore } = useTestStore();
  const navigate = useNavigate();

  return (
    <>
      <div
        role='presentation'
        className='flex justify-center m-10'
        onClick={() => {
          resetTestStore();
        }}
      >
        {testStore || 'clear item 🥲'}
      </div>
      <TestButton
        className='w-40'
        labelText='홈으로'
        onClick={() => navigate('/')}
      />
    </>
  );
};
