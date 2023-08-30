import "./Card.css";
interface CardInfoProps {
  cardTitle?: string;
  cardDate?: string;
  cardStatus?: boolean;
  cardTheme?: string;
  cardBudget?: number;
  cardGuest?: number;
  cardVenue?: string;
  cardRegistry?: string;
  cardPlanner?: boolean;
  cardPhotographer?: string;
  children?: React.ReactNode;
}
export const Card = (props: CardInfoProps) => {
  return (
    <div className="card">
      <div className="card__content">
        <h3 className="card__title">
          {props.cardTitle ? props.cardTitle : null}
        </h3>
        <p className="card__date">{props.cardDate ? props.cardDate : null}</p>
        <p>{props.cardBudget ? props.cardBudget : null}</p>
        <p>{props.cardTheme ? props.cardTheme : null}</p>
        <p>{props.cardGuest ? props.cardGuest : null}</p>
        <p>{props.cardVenue ? props.cardVenue : null}</p>
        <p>{props.cardRegistry ? props.cardRegistry : null}</p>
        <p>{props.cardPlanner ? props.cardPlanner : null}</p>
        <p>{props.cardPhotographer ? props.cardPhotographer : null}</p>
        <p>{props.cardStatus ? props.cardStatus : null}</p>
      </div>
    </div>
  );
};
