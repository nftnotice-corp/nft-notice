import { Button } from 'components/Button';
import { Loading } from 'components/Loading';
import { SelectProjects } from 'components/SelectProjects';
import { ModalType } from 'constants/modal';
import { useMutateSubscribeUpdate } from 'hooks/useMutateSubscribeUpdate';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import { ModalService } from 'services/ModalService';

interface SubscribeProjectsUpdateProps {
  email: string;
}

export const SubscribeProjectsUpdate = ({ email }: SubscribeProjectsUpdateProps) => {
  const router = useRouter();

  const [projectItemIds, setProjectItemIds] = useState<number[]>([]);
  const [proposeProjects, setProposeProjects] = useState<string>('');

  const { subscribeUpdate, isLoading: isLoadingMutate } = useMutateSubscribeUpdate(() => {
    ModalService.show(ModalType.Alert, {
      title: '구독 수정이 완료 되었습니다.',
      onConfirm: () => window.location.reload(),
    });
  });

  const handleUpdate = useCallback(async () => {
    const optionProjects = proposeProjects.split(',');

    if (projectItemIds.length === 0 && !proposeProjects) {
      ModalService.show(ModalType.Alert, {
        title: '최소 한개 이상의 프로젝트를 선택해주세요.',
      });
      return;
    }

    await subscribeUpdate({ email, projectIds: projectItemIds, optionProjects });
  }, [email, projectItemIds, proposeProjects, subscribeUpdate]);

  const handleLogOut = useCallback(() => {
    router.push('/logout');
  }, [router]);

  return (
    <>
      <p className="font-bold text-center my-5">{`이메일: ${email}`}</p>
      <SelectProjects
        className="mt-8 w-full"
        onChange={setProjectItemIds}
        onChangeProposeProjects={setProposeProjects}
      />
      <div className="flex justify-between mt-5 gap-5">
        <Button
          className="flex-grow"
          type="button"
          disabled={isLoadingMutate}
          label={isLoadingMutate ? <Loading color="black" height="2rem" width="2rem" /> : '구독 변경'}
          onClick={handleUpdate}
        />
        <Button
          className="flex-grow border-primary bg-white"
          type="button"
          disabled={isLoadingMutate}
          label={isLoadingMutate ? <Loading color="black" height="2rem" width="2rem" /> : '로그아웃'}
          onClick={handleLogOut}
        />
      </div>
    </>
  );
};
