import { useState, useContext } from "react";
import { AuthContext } from "../../hooks/useAuth/useAuth";

interface WeddingForm {
  weddingName: string;
  weddingDate: string;
  weddingTheme: string;
  weddingBudget: number;
  weddingGuest: number;
  weddingVenue: string;
  weddingDecorations: string;
  weddingRegistry: string;
  weddingPlanner: boolean;
  weddingPhotographer: string;
  completed: boolean;
}

export const WeddingForm = () => {
  const { userId } = useContext(AuthContext);

  const [weddingForm, setWeddingForm] = useState<WeddingForm>({
    weddingName: "",
    weddingDate: "",
    weddingTheme: "",
    weddingBudget: 0,
    weddingGuest: 0,
    weddingVenue: "",
    weddingDecorations: "",
    weddingRegistry: "",
    weddingPlanner: false,
    weddingPhotographer: "",
    completed: false,
  });

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    // Keyof casts it to a type that corresponds to the keys of the 'WeddingForm' type. This is done to ensure type safety when accessing properties
    // of the 'WeddingForm' object later.
    const inputName = event.target.name as keyof WeddingForm;
    const inputType = event.target.type;

    if (inputType === "checkbox") {
      setWeddingForm({
        ...weddingForm,
        [inputName]: !weddingForm[inputName],
      });
    } else {
      setWeddingForm({
        ...weddingForm,
        [inputName]: value,
      });
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const weddingUrl = `${
      import.meta.env.VITE_API_URL
    }/wedding/create`;

    const weddingData = {
      wedding_name: weddingForm.weddingName,
      wedding_date: weddingForm.weddingDate,
      wedding_theme: weddingForm.weddingTheme,
      wedding_budget: weddingForm.weddingBudget,
      wedding_guest: weddingForm.weddingGuest,
      wedding_venue: weddingForm.weddingVenue,
      wedding_decorations: weddingForm.weddingDecorations,
      wedding_registry: weddingForm.weddingRegistry,
      wedding_planner: weddingForm.weddingPlanner,
      wedding_photographer: weddingForm.weddingPhotographer,
      completed: weddingForm.completed,
      account_uid: userId,
    };

    const fetchConfig = {
      method: "post",
      body: JSON.stringify(weddingData),
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const weddingResponse = await fetch(weddingUrl, fetchConfig);

      if (weddingResponse.ok) {
        setWeddingForm({
          weddingName: "",
          weddingDate: "",
          weddingTheme: "",
          weddingBudget: 0,
          weddingGuest: 0,
          weddingVenue: "",
          weddingDecorations: "",
          weddingRegistry: "",
          weddingPlanner: false,
          weddingPhotographer: "",
          completed: false,
        });
      }
    } catch (error) {
      console.log("Wedding Form Error:", error);
    }
  };

  return (
    <div>
      <h1>Wedding Form</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="weddingName"> Wedding Name:</label>
            <input
              type="text"
              id="weddingName"
              name="weddingName"
              value={weddingForm.weddingName}
              onChange={handleFormChange}
            />
          </div>
          <div>
            <label htmlFor="weddingDate">Wedding Date:</label>
            <input
              type="datetime-local"
              id="weddingDate"
              name="weddingDate"
              value={weddingForm.weddingDate}
              onChange={handleFormChange}
            />
          </div>
          <div>
            <label htmlFor="weddingTheme">Wedding Theme:</label>
            <input
              type="text"
              id="weddingTheme"
              name="weddingTheme"
              value={weddingForm.weddingTheme}
              onChange={handleFormChange}
            />
          </div>
          <div>
            <label htmlFor="weddingBudget">Wedding Budget:</label>
            <input
              type="number"
              id="weddingBudget"
              name="weddingBudget"
              value={weddingForm.weddingBudget}
              onChange={handleFormChange}
            />
          </div>
          <div>
            <label htmlFor="weddingGuest">Wedding Guests:</label>
            <input
              type="number"
              id="weddingGuest"
              name="weddingGuest"
              value={weddingForm.weddingGuest}
              onChange={handleFormChange}
            />
          </div>
          <div>
            <label htmlFor="weddingVenue">Wedding Venue:</label>
            <input
              type="text"
              id="weddingVenue"
              name="weddingVenue"
              value={weddingForm.weddingVenue}
              onChange={handleFormChange}
            />
          </div>
          <div>
            <label htmlFor="weddingDecorations">Wedding Decorations:</label>
            <input
              type="text"
              id="weddingDecorations"
              name="weddingDecorations"
              value={weddingForm.weddingDecorations}
              onChange={handleFormChange}
            />
          </div>
          <div>
            <label htmlFor="weddingRegistry">Wedding Registry:</label>
            <input
              type="text"
              id="weddingRegistry"
              name="weddingRegistry"
              value={weddingForm.weddingRegistry}
              onChange={handleFormChange}
            />
          </div>
          <div>
            <label htmlFor="weddingPlanner">Wedding Planner:</label>
            <input
              type="checkbox"
              id="weddingPlanner"
              name="weddingPlanner"
              checked={weddingForm.weddingPlanner}
              onChange={handleFormChange}
            />
          </div>
          <div>
            <label htmlFor="weddingPhotographer">Wedding Photographer:</label>
            <input
              type="text"
              id="weddingPhotographer"
              name="weddingPhotographer"
              value={weddingForm.weddingPhotographer}
              onChange={handleFormChange}
            />
          </div>
          <div>
            <label htmlFor="completed">Completed:</label>
            <input
              type="checkbox"
              id="completed"
              name="completed"
              checked={weddingForm.completed}
              onChange={handleFormChange}
            />
          </div>
          <div>
            <button>Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};
