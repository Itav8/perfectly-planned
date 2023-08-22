interface CardInfoProps {
  cardTitle: string;
  cardDate: string;
  cardStatus: boolean;
}
export const Card = (props: CardInfoProps) => {
  return (
    <div>
      <h3>{props.cardTitle}</h3>
      <p>{props.cardDate}</p>
      <p>{props.cardStatus}</p>
    </div>
  );
};
