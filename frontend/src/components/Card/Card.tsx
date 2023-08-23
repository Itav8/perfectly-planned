import "./Card.css";
interface CardInfoProps {
  cardTitle?: string;
  cardDate?: string;
  cardStatus?: boolean;
}
export const Card = (props: CardInfoProps) => {
  return (
    <div className="card">
      <div className="card__content">
        <h3 className="card__title">
          {props.cardTitle ? props.cardTitle : null}
        </h3>
        <p>{props.cardStatus ? props.cardStatus : null}</p>
        <p className="card__date">{props.cardDate ? props.cardDate : null}</p>
      </div>
    </div>
  );
};
