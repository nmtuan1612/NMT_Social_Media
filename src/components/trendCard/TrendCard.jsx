import React from "react";
import "./TrendCard.scss";
import { TrendData } from "../../Data";

const TrendCard = () => {
  return (
    <div className='TrendCard box__shadow'>
      <h3>Trends for you</h3>

      {TrendData.map((trend, id) => (
        <div className='trend' key={id}>
          <span>#{trend.name}</span>
          <span>{trend.shares}k shares</span>
        </div>
      ))}
    </div>
  );
};

export default TrendCard;
