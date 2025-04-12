import React from 'react';
import Card from './components/Card'; 
import Header from './components/Header';
import { members } from './mockData/member';

const MemberList = () => {
  return (
    <>
    <Header />
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "0.5rem",
        padding: "1rem",
        textAlign: "center"
      }}
    >
      {members.map((member) => (
        <Card key={member.id} member={member} />
      ))}
    </div>
    </>
  );
};

export default MemberList;