import { useState, useContext } from "react";
import { AuthContext } from "../../hooks/useAuth/useAuth";
import { Wedding } from "./Events";

interface WeddingFormProps {
  onSubmit: () => void;
  type: "create" | "edit";
  initialValues?: Wedding;
}

export const WeddingForm = (props: WeddingFormProps) => {
  const { userId } = useContext(AuthContext);

  const [weddingForm, setWeddingForm] = useState<Wedding>(
    props.type === "edit" && props.initialValues
      ? props.initialValues
      : {
          wedding_name: "",
          wedding_date: "",
          wedding_theme: "",
          wedding_budget: 0,
          wedding_guest: 0,
          wedding_venue: "",
          wedding_decorations: "",
          wedding_registry: "",
          wedding_planner: false,
          wedding_photographer: "",
          completed: false,
        }
  );

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    // Keyof casts it to a type that corresponds to the keys of the 'WeddingForm' type. This is done to ensure type safety when accessing properties
    // of the 'WeddingForm' object later.
    const inputName = event.target.name as keyof Wedding;
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

    const weddingUrl = `${import.meta.env.VITE_API_URL}/wedding/create`;

    const weddingData = {
      wedding_name: weddingForm.wedding_name,
      wedding_date: weddingForm.wedding_date,
      wedding_theme: weddingForm.wedding_theme,
      wedding_budget: weddingForm.wedding_budget,
      wedding_guest: weddingForm.wedding_guest,
      wedding_venue: weddingForm.wedding_venue,
      wedding_decorations: weddingForm.wedding_decorations,
      wedding_registry: weddingForm.wedding_registry,
      wedding_planner: weddingForm.wedding_planner,
      wedding_photographer: weddingForm.wedding_photographer,
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
          wedding_name: "",
          wedding_date: "",
          wedding_theme: "",
          wedding_budget: 0,
          wedding_guest: 0,
          wedding_venue: "",
          wedding_decorations: "",
          wedding_registry: "",
          wedding_planner: false,
          wedding_photographer: "",
          completed: false,
        });

        props.onSubmit();
      }
    } catch (error) {
      console.log("Wedding Form Error:", error);
    }
  };

  const handleEditSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
    weddingId: number | undefined
  ) => {
    event.preventDefault();

    const editWeddingUrl = `${
      import.meta.env.VITE_API_URL
    }/wedding/edit/${weddingId}`;

    const editedWeddingData = {
      wedding_name: weddingForm.wedding_name,
      wedding_date: weddingForm.wedding_date,
      wedding_theme: weddingForm.wedding_theme,
      wedding_budget: weddingForm.wedding_budget,
      wedding_guest: weddingForm.wedding_guest,
      wedding_venue: weddingForm.wedding_venue,
      wedding_decorations: weddingForm.wedding_decorations,
      wedding_registry: weddingForm.wedding_registry,
      wedding_planner: weddingForm.wedding_planner,
      wedding_photographer: weddingForm.wedding_photographer,
      completed: weddingForm.completed,
      account_uid: userId,
    };

    const fetchConfig = {
      method: "put",
      body: JSON.stringify(editedWeddingData),
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const editedResponse = await fetch(editWeddingUrl, fetchConfig);

      if (editedResponse.ok) {
        setWeddingForm({
          wedding_name: "",
          wedding_date: "",
          wedding_theme: "",
          wedding_budget: 0,
          wedding_guest: 0,
          wedding_venue: "",
          wedding_decorations: "",
          wedding_registry: "",
          wedding_planner: false,
          wedding_photographer: "",
          completed: false,
        });

        props.onSubmit();
      }
    } catch (error) {
      console.log("Error editing wedding:", error);
    }
  };

  return (
    <div className="guest-form__container">
      <h1>{props.type === "create" ? "Create Wedding" : "Edit Wedding"}</h1>
      <form
        className="guest-form"
        onSubmit={(event) => {
          if (props.type === "create") {
            handleSubmit(event);
          } else {
            handleEditSubmit(event, weddingForm.wedding_id);
          }
        }}
      >
        <div>
          <label htmlFor="wedding_name"> Wedding Name:</label>
          <input
            type="text"
            id="wedding_name"
            name="wedding_name"
            value={weddingForm.wedding_name}
            onChange={handleFormChange}
          />
        </div>
        <div>
          <label htmlFor="wedding_date">Wedding Date:</label>
          <input
            type="datetime-local"
            id="wedding_date"
            name="wedding_date"
            value={weddingForm.wedding_date}
            onChange={handleFormChange}
          />
        </div>
        <div>
          <label htmlFor="wedding_theme">Wedding Theme:</label>
          <input
            type="text"
            id="wedding_theme"
            name="wedding_theme"
            value={weddingForm.wedding_theme}
            onChange={handleFormChange}
          />
        </div>
        <div>
          <label htmlFor="wedding_budget">Wedding Budget:</label>
          <input
            type="number"
            id="wedding_budget"
            name="wedding_budget"
            value={weddingForm.wedding_budget}
            onChange={handleFormChange}
          />
        </div>
        <div>
          <label htmlFor="wedding_guest">Wedding Guests:</label>
          <input
            type="number"
            id="wedding_guest"
            name="wedding_guest"
            value={weddingForm.wedding_guest}
            onChange={handleFormChange}
          />
        </div>
        <div>
          <label htmlFor="wedding_venue">Wedding Venue:</label>
          <input
            type="text"
            id="wedding_venue"
            name="wedding_venue"
            value={weddingForm.wedding_venue}
            onChange={handleFormChange}
          />
        </div>
        <div>
          <label htmlFor="wedding_decorations">Wedding Decorations:</label>
          <input
            type="text"
            id="wedding_decorations"
            name="wedding_decorations"
            value={weddingForm.wedding_decorations}
            onChange={handleFormChange}
          />
        </div>
        <div>
          <label htmlFor="wedding_registry">Wedding Registry:</label>
          <input
            type="text"
            id="wedding_registry"
            name="wedding_registry"
            value={weddingForm.wedding_registry}
            onChange={handleFormChange}
          />
        </div>
        <div className="guest-form__checkbox">
          <label htmlFor="wedding_planner">Wedding Planner:</label>
          <input
            type="checkbox"
            id="wedding_planner"
            name="wedding_planner"
            checked={weddingForm.wedding_planner}
            onChange={handleFormChange}
          />
        </div>
        <div>
          <label htmlFor="wedding_photographer">Wedding Photographer:</label>
          <input
            type="text"
            id="wedding_photographer"
            name="wedding_photographer"
            value={weddingForm.wedding_photographer}
            onChange={handleFormChange}
          />
        </div>
        <div className="guest-form__checkbox">
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
  );
};
