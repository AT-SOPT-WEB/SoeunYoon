// Card.jsx

import style from './Card.module.css';

const Card = ({ member }) => {
    return (
      <div className={style.card}>
        <h2>{member.name}</h2>
        <p>GitHub: {member.github}</p>
        <p>English Name: {member.englishName}</p>
      </div>
    );
  };

export default Card;