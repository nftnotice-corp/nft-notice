import { Button } from 'components/Button';
import { Layout } from 'components/Layout';
import { Loading } from 'components/Loading';
import { ModalType } from 'constants/modal';
import { useMutateConfirmSubscribe } from 'hooks/useMutateConfirmSubscribe';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { ModalService } from 'services/ModalService';

const ConfirmationPage = () => {
  const router = useRouter();
  const { isError, isLoading, data, confirmSubscribe } = useMutateConfirmSubscribe();

  useEffect(() => {
    if (router.query.token) {
      confirmSubscribe(router.query.token as string);
    }
  }, [confirmSubscribe, router, router.query.token]);

  useEffect(() => {
    if (isError) {
      ModalService.show(ModalType.Alert, {
        title: '문제가 발생 했습니다. 다시 구독 신청해주세요.',
        onConfirm: () => router.replace('/'),
      });
    }
  }, [isError, router]);

  useEffect(() => {
    if (data && !isLoading) {
      ModalService.show(ModalType.Alert, {
        title: '구독이 완료 되었습니다.',
        onConfirm: () => router.replace('/'),
      });
    }
  }, [data, isLoading, router]);

  return (
    <Layout>
      <div className="flex items-center justify-center">
        <img
          className="w-10 h-auto"
          alt="logo"
          src="https://user-images.githubusercontent.com/22593217/171372114-49693c06-8e2a-4502-aee7-d6b79d2f983a.jpeg"
        />
        <h1 className="text-right font-bold text-primary mr-2 text-5xl">NFT</h1>
        <h1 className="text-right font-bold text-5xl">NOTICE</h1>
        <img
          className="w-10 h-auto"
          alt="logo"
          src="https://user-images.githubusercontent.com/22593217/171372114-49693c06-8e2a-4502-aee7-d6b79d2f983a.jpeg"
        />
      </div>
      <div className="mt-40 flex flex-col items-center justify-center">
        <Loading width="100px" height="100px" />
        <p className="my-10">
          {router.query.token ? '메일 확인 중입니다. 잠시만 기다려주세요.' : '잘못된 경로입니다.'}
        </p>
        {!router.query.token && <Button type="button" label="홈으로" onClick={() => router.replace('/')} />}
      </div>
    </Layout>
  );
};

export default ConfirmationPage;
