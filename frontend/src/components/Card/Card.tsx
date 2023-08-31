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
  onClick?: () => void;
}

export const Card = (props: CardInfoProps) => {
  return (
    <div className="card" onClick={props.onClick}>
      <div className="card__content">
        {props.cardTitle ? (
          <h3 className="card__title">{props.cardTitle}</h3>
        ) : null}
        {props.cardDate ? <p className="card__date">{props.cardDate}</p> : null}
        {props.cardBudget ? <p>{props.cardBudget}</p> : null}
        {props.cardTheme ? <p>{props.cardTheme}</p> : null}
        {props.cardGuest ? <p>{props.cardGuest}</p> : null}
        {props.cardVenue ? <p>{props.cardVenue}</p> : null}
        {props.cardRegistry ? <p>{props.cardRegistry}</p> : null}
        {props.cardPlanner ? <p>{props.cardPlanner}</p> : null}
        {props.cardPhotographer ? <p>{props.cardPhotographer}</p> : null}
        {props.cardStatus ? <p>{props.cardStatus}</p> : null}
        {props.children}
      </div>
    </div>
  );
};
