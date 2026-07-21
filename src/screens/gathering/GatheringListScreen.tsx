import React, {useState} from 'react';
import {FlatList} from 'react-native';
import {PlusCircle} from 'lucide-react-native';
import * as S from './GatheringListScreen.style';
import GatheringCard from '~/components/gathering/GatheringCard';
import {Gathering} from '~/types/gathering';
import PageFrame from '~/components/common/PageFrame';
import Header from '~/components/common/Header';
import JoinGatheringModal from '~/components/gathering/modals/JoinGatheringModal';
import CreateGatheringModal from '~/components/gathering/modals/CreateGatheringModal';
import {
  useCreateGathering,
  useFetchGatheringList,
  useJoinGathering,
} from '~/api/gathering/gathering';
import LoadingModal from '~/components/modal/LoadingModal';
import {useApiErrorToast} from '~/components/hook/useApiErrorToast';

const GatheringListScreen = () => {
  const [visibleJoin, setVisibleJoin] = useState<boolean>(false);
  const [visibleCreate, setVisibleCreate] = useState<boolean>(false);
  const [code, setCode] = useState<string>('');
  const [gatheringName, setGatheringName] = useState<string>('');

  const {data, isLoading, isError} = useFetchGatheringList();

  const {
    mutateAsync: createGathering,
    isPending,
    isError: isErrorCreate,
  } = useCreateGathering();

  const {
    mutateAsync: joinGathering,
    isPending: isPendingJoin,
    isError: isErrorJoin,
  } = useJoinGathering();

  useApiErrorToast(isError);
  useApiErrorToast(isErrorCreate);
  useApiErrorToast(isErrorJoin);

  console.log('data:', data);

  const gatherings = data ?? [];

  const onJoinSubmit = async () => {
    await joinGathering(code);
    setVisibleJoin(false);
  };

  const onCreateGatheringSubmit = async () => {
    await createGathering(gatheringName);
    setVisibleCreate(false);
  };

  return (
    <PageFrame>
      <LoadingModal isLoading={isLoading || isPending || isPendingJoin} />
      <Header
        title={'Group Talk'}
        subTitle={'친구들과 수다 떨며 나누는 감상 공유방'}>
        <S.ButtonRow>
          <S.JoinButton onPress={() => setVisibleJoin(true)}>
            <S.JoinText>🔑 참여코드 </S.JoinText>
          </S.JoinButton>

          <S.CreateButton onPress={() => setVisibleCreate(true)}>
            <PlusCircle color="#fff" size={24} strokeWidth={2.5} />
          </S.CreateButton>
        </S.ButtonRow>
      </Header>

      <S.SectionTitle>내가 참여 중인 모임 ({gatherings.length})</S.SectionTitle>

      <FlatList
        data={gatherings}
        keyExtractor={item => item.id.toString()}
        renderItem={({item, index}: {item: Gathering; index: number}) => (
          <GatheringCard key={index} gathering={item} />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 30}}
      />

      <JoinGatheringModal
        visible={visibleJoin}
        joinGroupCode={code}
        joinGroupError={'error'}
        onChangeCode={(text: string) => setCode(text)}
        onClose={() => {
          setVisibleJoin(false);
        }}
        onSubmit={onJoinSubmit}
      />

      <CreateGatheringModal
        visible={visibleCreate}
        newGatheringName={gatheringName}
        onChangeName={(text: string) => setGatheringName(text)}
        onClose={() => {
          setVisibleCreate(false);
        }}
        onSubmit={onCreateGatheringSubmit}
      />
    </PageFrame>
  );
};

export default GatheringListScreen;
