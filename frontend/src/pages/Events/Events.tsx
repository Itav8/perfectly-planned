import { useContext, useEffect, useState } from "react";
import { Card } from "../../components/Card/Card";
import { WeddingForm } from "./WeddingForm";
import { AuthContext } from "../../hooks/useAuth/useAuth";
import { Modal } from "../../components/Modal/Modal";

interface Wedding {
  wedding_name: string;
  wedding_date: string;
  completed: boolean;
}

export const Events = () => {
  const { userId } = useContext(AuthContext);

  const [weddings, setWeddings] = useState<Wedding[]>([]);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  /*
    TODO: Dynamic Dropdown Form Selection
    [
      {
        name: "Wedding",
        component: <WeddingForm />
      }
    ]
  */

  useEffect(() => {
    const fetchWeddings = async () => {
      const weddingListUrl = `${
        import.meta.env.VITE_API_URL
      }/wedding/list/${userId}`;

      try {
        const getWeddingResponse = await fetch(weddingListUrl);

        if (getWeddingResponse.ok) {
          const weddingData = await getWeddingResponse.json();
          setWeddings(weddingData);
        }
      } catch (error) {
        console.log("Wedding List Error:", error);
      }
    };
    fetchWeddings();
  }, [userId]);

  return (
    <div>
      <h1>Events</h1>
      <button
        onClick={() => {
          setIsEventModalOpen(true);
        }}
      >
        Add Event
      </button>
      {isEventModalOpen ? (
        <Modal
          open={isEventModalOpen}
          onClose={() => {
            setIsEventModalOpen(false);
          }}
        >
          <WeddingForm
            onSubmit={() => {
              setIsEventModalOpen(false);
            }}
          />
        </Modal>
      ) : null}

      {weddings.map((wedding, index) => (
        <Card
          key={index}
          cardTitle={wedding.wedding_name}
          cardDate={wedding.wedding_date}
          cardStatus={wedding.completed}
        />
      ))}
    </div>
  );
};
