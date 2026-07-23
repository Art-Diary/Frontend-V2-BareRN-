import React, {useState} from 'react';
import {PlusCircle, Ticket} from 'lucide-react-native';
import Clipboard from '@react-native-clipboard/clipboard';

import * as S from './GatheringDetailScreen.style';
import {
  GatheringVisitedExhibition,
  GatheringDetail,
  GatheringMember,
} from '~/types/gathering';
import PageFrame from '~/components/common/PageFrame';
import WithBackFrame from '~/components/common/WithBackFrame';
import {RootStackNavigationProp} from '~/App';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import InviteCodeModal from '~/components/gathering/modals/InviteCodeModal';
import {useFetchGatheringDetailInfo} from '~/api/gathering/gathering';
import {RootStackParamList} from '~/navigationTypes';
import LoadingModal from '~/components/modal/LoadingModal';
import {useApiErrorToast} from '~/components/hook/useApiErrorToast';
import {DEFAULT_IMAGE} from '@env';

type Route = RouteProp<RootStackParamList, 'GatheringDetail'>;

const GatheringDetailScreen = () => {
  const {params} = useRoute<Route>();
  const navigation = useNavigation<RootStackNavigationProp>();
  const [visibleInvite, setVisibleInvite] = useState<boolean>(false);
  const [linkCopied, setLinkCopied] = useState<boolean>(false);

  const {data, isLoading, isError} = useFetchGatheringDetailInfo(
    params.gatheringId,
  );

  useApiErrorToast(isError);

  if (isError || !data) {
    return (
      <PageFrame>
        <WithBackFrame title="모임 정보" />
      </PageFrame>
    );
  }

  if (isLoading) {
    return (
      <PageFrame>
        <LoadingModal isLoading />
      </PageFrame>
    );
  }

  const gathering: GatheringDetail = data;

  const onAddExhibition = () => {
    navigation.navigate('GatheringAddExhibitionStep1', {
      gatheringId: gathering.id,
    });
  };

  const handleCopyLink = () => {
    Clipboard.setString(gathering.code);
    setLinkCopied(true);
  };

  const onPressExhibition = (item: GatheringVisitedExhibition) => {
    navigation.navigate('GatheringChat', {
      gatheringId: gathering.id,
      visitId: item.visitId,
    });
  };

  return (
    <PageFrame>
      <LoadingModal isLoading={isLoading} />
      <WithBackFrame title={gathering.name}>
        <S.AddButton onPress={onAddExhibition}>
          <Ticket size={21.5} color="#7eb5df" />
        </S.AddButton>
      </WithBackFrame>

      <S.MemberPanel>
        <S.MemberHeader>
          <S.MemberTitle>
            👥 함께하는 멤버 ({gathering.memberList.length})
          </S.MemberTitle>

          <S.InviteButton onPress={() => setVisibleInvite(true)}>
            <PlusCircle size={12} color="#7EB5DF" />
            <S.InviteButtonText>초대 코드 공유</S.InviteButtonText>
          </S.InviteButton>
        </S.MemberHeader>

        <InviteCodeModal
          visible={visibleInvite}
          inviteCode={gathering.code}
          linkCopied={linkCopied}
          onCopy={handleCopyLink}
          onClose={() => {
            setVisibleInvite(false);
            setLinkCopied(false);
          }}
        />

        <S.MemberList>
          {gathering.memberList.map(
            (member: GatheringMember, index: number) => (
              <S.MemberChip key={index}>
                <S.MemberCircle>
                  <S.MemberProfile
                    source={{
                      uri: member.profile ?? DEFAULT_IMAGE,
                    }}
                  />
                </S.MemberCircle>

                <S.MemberName>{member.nickname}</S.MemberName>
              </S.MemberChip>
            ),
          )}
        </S.MemberList>
      </S.MemberPanel>

      <S.SectionTitle>
        우리가 다녀온 전시회 ({gathering.visitedExhList.length})
      </S.SectionTitle>

      {gathering.visitedExhList.length === 0 ? (
        <S.EmptyContainer>
          <S.EmptyText>아직 같이 공유한 전시 티켓이 없습니다.</S.EmptyText>

          <S.EmptyButton onPress={onAddExhibition}>
            <S.EmptyButtonText>첫 전시 추가하기 🎫</S.EmptyButtonText>
          </S.EmptyButton>
        </S.EmptyContainer>
      ) : (
        <S.ExhibitionList
          data={gathering.visitedExhList}
          keyExtractor={(item: GatheringVisitedExhibition) =>
            item.visitId.toString()
          }
          showsVerticalScrollIndicator={false}
          renderItem={({item}: {item: GatheringVisitedExhibition}) => (
            <S.ExhibitionCard onPress={() => onPressExhibition(item)}>
              <S.ExhibitionImage
                source={{
                  uri: item.poster,
                }}
              />

              <S.ExhibitionContent>
                <S.ExhibitionTitle numberOfLines={1}>
                  {item.exhName}
                </S.ExhibitionTitle>

                <S.ExhibitionLocation>{item.gallery}</S.ExhibitionLocation>

                <S.ExhibitionFooter>
                  <S.ExhibitionDate>{item.visitDate}</S.ExhibitionDate>

                  <S.ChatBadge>
                    <S.ChatBadgeText>💬 수다 떨러가기</S.ChatBadgeText>
                  </S.ChatBadge>
                </S.ExhibitionFooter>
              </S.ExhibitionContent>
            </S.ExhibitionCard>
          )}
        />
      )}
    </PageFrame>
  );
};

export default GatheringDetailScreen;
