import React from 'react';
import Campaign from './common/campaignCard';

function Test() {
  return (
    <section style={{
      display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '100px',
    }}
    >
      <Campaign loading={false} id={1} title="Help the people in need" description="we give the best offers to people in need to provide them with the best life anyone could live." imgSrc="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" categoryIcon="https://i.ibb.co/xsCwNkK/image-3.png" />
      <Campaign loading={false} id={1} title="Help the people in need" description="we give the best offers to people in need to provide them with the best life anyone could live." imgSrc="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" categoryIcon="https://i.ibb.co/xsCwNkK/image-3.png" />
      <Campaign loading={false} id={1} title="Help the people in need" description="we give the best offers to people in need to provide them with the best life anyone could live." imgSrc="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" categoryIcon="https://i.ibb.co/xsCwNkK/image-3.png" />
    </section>
  );
}

export default Test;
