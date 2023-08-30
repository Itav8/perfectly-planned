import { useState, useContext } from "react";
import { AuthContext } from "../../hooks/useAuth/useAuth";
import "./Guest.css";
import { Guest } from "./Guests";

interface GuestFormProps {
  initialValues?: Guest;
  onSubmit: () => void;
  type: "edit" | "create";
}

export const GuestForm = (props: GuestFormProps) => {
  const { userId } = useContext(AuthContext);

  const [guestForm, setGuestForm] = useState<Guest>(
    props.type === "edit" && props.initialValues
      ? props.initialValues
      : {
          first_name: "",
          last_name: "",
          address_1: "",
          address_2: "",
          city: "",
          state: "",
          zipcode: "",
          phone_number: "",
          email: "",
          status: "pending",
          bride_guest: false,
          groom_guest: false,
          bridesmaids_guest: false,
          groomsmen_guest: false,
          event_type: "",
        }
  );

  const selectOptions = [
    { label: "Pending", value: "pending" },
    { label: "Attending", value: "attending" },
    { label: "Declined", value: "declined" },
  ];

  const handleFormChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const value = event?.target.value;
    const inputName = event.target.name as keyof Guest;
    const inputType = event.target.type;

    if (inputType === "checkbox") {
      setGuestForm({
        ...guestForm,
        [inputName]: !guestForm[inputName],
      });
    } else {
      setGuestForm({
        ...guestForm,
        [inputName]: value,
      });
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const guestUrl = `${import.meta.env.VITE_API_URL}/guest/create`;
    const {
      first_name,
      last_name,
      address_1,
      address_2,
      city,
      state,
      zipcode,
      phone_number,
      email,
      status,
      bride_guest,
      groom_guest,
      bridesmaids_guest,
      groomsmen_guest,
      event_type,
    } = guestForm;

    const guestData = {
      first_name,
      last_name,
      address_1,
      address_2,
      city,
      state,
      zipcode,
      phone_number,
      email,
      status,
      bride_guest,
      groom_guest,
      bridesmaids_guest,
      groomsmen_guest,
      event_type,
      account_uid: userId,
    };

    const fetchConfig = {
      method: "post",
      body: JSON.stringify(guestData),
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const guestResponse = await fetch(guestUrl, fetchConfig);

      if (guestResponse.ok) {
        setGuestForm({
          first_name: "",
          last_name: "",
          address_1: "",
          address_2: "",
          city: "",
          state: "",
          zipcode: "",
          phone_number: "",
          email: "",
          status: "pending",
          bride_guest: false,
          groom_guest: false,
          bridesmaids_guest: false,
          groomsmen_guest: false,
          event_type: "",
        });

        props.onSubmit();
      }
    } catch (error) {
      console.log("Guest Form Error:", error);
    }
  };

  const handleEditSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
    guestId: number | undefined
  ) => {
    event.preventDefault();

    const editGuestUrl = `${
      import.meta.env.VITE_API_URL
    }/guest/edit/${guestId}`;

    const editedGuestData = {
      first_name: guestForm.first_name,
      last_name: guestForm.last_name,
      address_1: guestForm.address_1,
      address_2: guestForm.address_2,
      city: guestForm.city,
      state: guestForm.state,
      zipcode: guestForm.zipcode,
      phone_number: guestForm.phone_number,
      email: guestForm.email,
      status: guestForm.status,
      bride_guest: guestForm.bride_guest,
      groom_guest: guestForm.groom_guest,
      bridesmaids_guest: guestForm.bridesmaids_guest,
      groomsmen_guest: guestForm.groomsmen_guest,
      event_type: guestForm.event_type,
      account_uid: userId,
    };

    const fetchConfig = {
      method: "put",
      body: JSON.stringify(editedGuestData),
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const editedResponse = await fetch(editGuestUrl, fetchConfig);

      if (editedResponse.ok) {
        setGuestForm({
          first_name: "",
          last_name: "",
          address_1: "",
          address_2: "",
          city: "",
          state: "",
          zipcode: "",
          phone_number: "",
          email: "",
          status: "pending",
          bride_guest: false,
          groom_guest: false,
          bridesmaids_guest: false,
          groomsmen_guest: false,
          event_type: "",
        });

        props.onSubmit();
      }
    } catch (error) {
      console.log("Error editing guest:", error);
    }
  };

  return (
    <div className="guest-form__container">
      <h1>Guest Form</h1>

      <form
        className="guest-form"
        onSubmit={(event) => {
          if (props.type === "create") {
            handleSubmit(event);
          } else {
            handleEditSubmit(event, guestForm.guest_id);
          }
        }}
      >
        <div>
          <label htmlFor="first_name">First Name:</label>
          <input
            type="text"
            id="first_name"
            name="first_name"
            value={guestForm.first_name}
            onChange={handleFormChange}
          />
        </div>
        <div>
          <label htmlFor="last_name">Last Name:</label>
          <input
            type="text"
            id="last_name"
            name="last_name"
            value={guestForm.last_name}
            onChange={handleFormChange}
          />
        </div>
        <div>
          <label htmlFor="address_1">Address 1:</label>
          <input
            type="text"
            id="address_1"
            name="address_1"
            value={guestForm.address_1}
            onChange={handleFormChange}
          />
        </div>
        <div>
          <label htmlFor="address_2">Address 2:</label>
          <input
            type="text"
            id="address_2"
            name="address_2"
            value={guestForm.address_2}
            onChange={handleFormChange}
          />
        </div>
        <div>
          <label htmlFor="city">City:</label>
          <input
            type="text"
            id="city"
            name="city"
            value={guestForm.city}
            onChange={handleFormChange}
          />
        </div>
        <div>
          <label htmlFor="state">State:</label>
          <input
            type="text"
            id="state"
            name="state"
            value={guestForm.state}
            onChange={handleFormChange}
          />
        </div>
        <div>
          <label htmlFor="zipcode">Zipcode:</label>
          <input
            type="text"
            id="zipcode"
            name="zipcode"
            value={guestForm.zipcode}
            onChange={handleFormChange}
          />
        </div>
        <div>
          <label htmlFor="phone_number">Phone Number:</label>
          <input
            type="text"
            id="phone_number"
            name="phone_number"
            value={guestForm.phone_number}
            onChange={handleFormChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={guestForm.email}
            onChange={handleFormChange}
          />
        </div>
        <div>
          <label htmlFor="status">Status:</label>
          <select
            id="status"
            name="status"
            value={guestForm.status || "pending"}
            onChange={handleFormChange}
          >
            {selectOptions.map((statusOption, index) => (
              <option key={index} value={statusOption.value}>
                {statusOption.label}
              </option>
            ))}
          </select>
        </div>
        <div className="guest-form__checkbox">
          <label htmlFor="bride_guest">Bride's Guest:</label>
          <input
            type="checkbox"
            id="bride_guest"
            name="bride_guest"
            checked={guestForm.bride_guest}
            onChange={handleFormChange}
          />
        </div>
        <div className="guest-form__checkbox">
          <label htmlFor="groom_guest">Groom's Guest:</label>
          <input
            type="checkbox"
            id="groom_guest"
            name="groom_guest"
            checked={guestForm.groom_guest}
            onChange={handleFormChange}
          />
        </div>
        <div className="guest-form__checkbox">
          <label htmlFor="bridesmaids_guest">Bridesmaid:</label>
          <input
            type="checkbox"
            id="bridesmaids_guest"
            name="bridesmaids_guest"
            checked={guestForm.bridesmaids_guest}
            onChange={handleFormChange}
          />
        </div>
        <div className="guest-form__checkbox">
          <label htmlFor="groomsmen_guest">Groomsmen:</label>
          <input
            type="checkbox"
            id="groomsmen_guest"
            name="groomsmen_guest"
            checked={guestForm.groomsmen_guest}
            onChange={handleFormChange}
          />
        </div>
        <div>
          <label htmlFor="event_type">Event:</label>
          <input
            type="text"
            id="event_type"
            name="event_type"
            value={guestForm.event_type}
            onChange={handleFormChange}
          />
        </div>
        <div>
          <button className="guest-form__button">Submit</button>
        </div>
      </form>
    </div>
  );
};
