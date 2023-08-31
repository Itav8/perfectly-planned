import { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../hooks/useAuth/useAuth";
import { Card } from "../../components/Card/Card";
import { Modal } from "../../components/Modal/Modal";
import { WeddingForm } from "./WeddingForm";

import "./Event.css";

export interface Wedding {
  wedding_id?: number;
  wedding_name: string;
  wedding_date: string;
  wedding_theme: string;
  wedding_budget: number;
  wedding_guest: number;
  wedding_venue: string;
  wedding_decorations: string;
  wedding_registry: string;
  wedding_planner: boolean;
  wedding_photographer: string;
  completed: boolean;
}

export const Events = () => {
  const { userId } = useContext(AuthContext);

  const [weddings, setWeddings] = useState<Wedding[]>([]);
  const [selectedWedding, setSelectedWedding] = useState<Wedding>();
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  /*
    TODO: Dynamic Dropdown Form Selection
    [
      {
        name: "Wedding",
        component: <WeddingForm />
      }
    ]
  */

  const fetchWeddings = useCallback(async () => {
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
  }, [userId]);

  useEffect(() => {
    if (userId) {
      fetchWeddings();
    }
  }, [fetchWeddings, userId]);

  return (
    <div>
      <h1>Events</h1>
      <button
        onClick={() => {
          setIsEventModalOpen(true);
        }}
      >
        + Add Event
      </button>

      {isEventModalOpen ? (
        <Modal
          open={isEventModalOpen}
          onClose={() => {
            setIsEventModalOpen(false);
          }}
        >
          <WeddingForm
            type="create"
            onSubmit={() => {
              setIsEventModalOpen(false);
            }}
          />
        </Modal>
      ) : null}
      {selectedWedding ? (
        <Modal
          open={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedWedding(undefined);
          }}
        >
          <WeddingForm
            type="edit"
            initialValues={selectedWedding}
            onSubmit={() => {
              fetchWeddings();
              setIsEditModalOpen(false);
              setSelectedWedding(undefined);
            }}
          />
        </Modal>
      ) : null}

      <div className="event__card">
        {weddings.map((wedding, index) => (
          <Card
            onClick={() => {
              setIsEditModalOpen(true);
              setSelectedWedding(wedding);
            }}
            key={index}
            cardTitle={wedding.wedding_name}
            cardDate={wedding.wedding_date}
            cardStatus={wedding.completed}
            cardTheme={wedding.wedding_theme}
            cardBudget={wedding.wedding_budget}
            cardGuest={wedding.wedding_guest}
            cardVenue={wedding.wedding_venue}
            cardRegistry={wedding.wedding_registry}
            cardPlanner={wedding.wedding_planner}
            cardPhotographer={wedding.wedding_photographer}
          />
        ))}
      </div>
    </div>
  );
};
