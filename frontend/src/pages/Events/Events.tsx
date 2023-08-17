import { useState } from "react";

export const Events = () => {
  const [weddingForm, setWeddingForm] = useState({
    weddingName: "",
    weddingDate: "",
    weddingTheme: "",
    weddingBudget: 0,
    weddingGuest: 0,
    weddingVenue: "",
    weddingDecorations: "",
    weddingRegistry: "",
  });
  const [isWeddingPlanner, setWeddingPlanner] = useState(false);
  const [isWeddingPhotographer, setWeddingPhotographer] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false)

  const handleFormChange = (event) => {
    const value = event.target.value;
    const inputName = event.target.name;

    setWeddingForm({
      ...weddingForm,
      [inputName]: value,
    });
  };

  const handleChange = (event) => {
    const checked = event.target.checked

    setIsCompleted(checked)
    setWeddingPhotographer(checked)
    setWeddingPlanner(checked)
  }

  return (
    <>
      <div>
        <h1>Events Page</h1>
        <h2>Wedding Form</h2>
      </div>
      <div>
        <form>
          <label>
            Wedding Name:
            <input
              type="text"
              name="weddingName"
              value={weddingForm.weddingName}
              onChange={handleFormChange}
            />
          </label>
          <label>
            Wedding Date:
            <input
              type="date"
              name="weddingDate"
              value={weddingForm.weddingDate}
              onChange={handleFormChange}
            />
          </label>
          <label>
            Wedding Theme:
            <input
              type="text"
              name="weddingTheme"
              value={weddingForm.weddingTheme}
              onChange={handleFormChange}
            />
          </label>
          <label>
            Wedding Budget:
            <input
              type="number"
              name="weddingBudget"
              value={weddingForm.weddingBudget}
              onChange={handleFormChange}
            />
          </label>
          <label>
            Wedding Guests:
            <input
              type="number"
              name="weddingGuest"
              value={weddingForm.weddingGuest}
              onChange={handleFormChange}
            />
          </label>
          <label>
            Wedding Venue:
            <input
              type="text"
              name="weddingVenue"
              value={weddingForm.weddingVenue}
              onChange={handleFormChange}
            />
          </label>
          <label>
            Wedding Decorations:
            <input
              type="text"
              name="weddingDecorations"
              value={weddingForm.weddingDecorations}
              onChange={handleFormChange}
            />
          </label>
          <label>
            Wedding Registry:
            <input
              type="text"
              name="weddingRegistry"
              value={weddingForm.weddingRegistry}
              onChange={handleFormChange}
            />
          </label>
          <label>
            Wedding Planner:
            <input
              type="checkbox"
              name="weddingPlanner"
              checked={isWeddingPlanner}
              onChange={handleChange}
            />
          </label>
          <label>
            Wedding Photographer:
            <input
              type="checkbox"
              name="weddingPhotographer"
              checked={isWeddingPhotographer}
              onChange={handleChange}
            />
          </label>
          <label>
            Completed:
            <input
              type="checkbox"
              name="isCompleted"
              checked={isCompleted}
              onChange={handleChange}
            />
          </label>
        </form>
      </div>
    </>
  );
};
