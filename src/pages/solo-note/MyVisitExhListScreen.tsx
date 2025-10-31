import React from 'react';
import Header from '~/components/Header';
import PageFrame from '~/components/PageFrame';
import MyVisitExhList from '~/features/solo-note/component/MyVisitExhList';

const MyVisitExhListScreen = () => {
  return (
    <PageFrame>
      {/* header */}
      <Header title={'Art Diary'} needColor />

      {/* body */}
      <MyVisitExhList />
    </PageFrame>
  );
};

export default MyVisitExhListScreen;
