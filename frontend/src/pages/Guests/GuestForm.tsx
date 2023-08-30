import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../hooks/useAuth/useAuth";
import "./Guest.css";

interface GuestForm {
  firstName: string;
  lastName: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zipcode: string;
  phoneNumber: string;
  email: string;
  status: "pending" | "attending" | "declined";
  brideGuest: boolean;
  groomGuest: boolean;
  bridesmaidGuest: boolean;
  groomsmenGuest: boolean;
  eventType: string;
}

interface GuestFormProps {
  values?: GuestForm;
  onSubmit: () => void;
  type: "edit" | "create";
}

export const GuestForm = (props: GuestFormProps) => {
  const { userId } = useContext(AuthContext);

  const [guestForm, setGuestForm] = useState<GuestForm>({
    firstName: "",
    lastName: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zipcode: "",
    phoneNumber: "",
    email: "",
    status: "pending",
    brideGuest: false,
    groomGuest: false,
    bridesmaidGuest: false,
    groomsmenGuest: false,
    eventType: "",
  });

  const selectOptions = [
    { label: "Pending", value: "pending" },
    { label: "Attending", value: "attending" },
    { label: "Declined", value: "declined" },
  ];

  useEffect(() => {
    if (props.type === "edit" && props.values) {
      setGuestForm(props.values);
    }
  }, [props.values, props.type]);

  const handleFormChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const value = event?.target.value;
    const inputName = event.target.name as keyof GuestForm;
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

    const guestData = {
      first_name: guestForm.firstName,
      last_name: guestForm.lastName,
      address_1: guestForm.address1,
      address_2: guestForm.address2,
      city: guestForm.city,
      state: guestForm.state,
      zipcode: guestForm.zipcode,
      phone_number: guestForm.phoneNumber,
      email: guestForm.email,
      status: guestForm.status,
      bride_guest: guestForm.brideGuest,
      groom_guest: guestForm.groomGuest,
      bridesmaids_guest: guestForm.bridesmaidGuest,
      groomsmen_guest: guestForm.groomsmenGuest,
      event_type: guestForm.eventType,
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
          firstName: "",
          lastName: "",
          address1: "",
          address2: "",
          city: "",
          state: "",
          zipcode: "",
          phoneNumber: "",
          email: "",
          status: "pending",
          brideGuest: false,
          groomGuest: false,
          bridesmaidGuest: false,
          groomsmenGuest: false,
          eventType: "",
        });

        props.onSubmit();
      }
    } catch (error) {
      console.log("Guest Form Error:", error);
    }
  };

  const handleEditSubmit = () => {
    console.log("HERE");
  };
  console.log("GUEST FORM PROPS", props);
  return (
    <div className="guest-form__container">
      <h1>Guest Form</h1>

      <form
        className="guest-form"
        onSubmit={(event) => {
          if (props.type === "create") {
            handleSubmit(event);
          } else {
            handleEditSubmit();
          }
        }}
      >
        <div>
          <label htmlFor="firstName"> First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={guestForm.firstName || ""}
            onChange={handleFormChange}
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={guestForm.lastName || ""}
            onChange={handleFormChange}
          />
        </div>
        <div>
          <label htmlFor="address1">Address 1:</label>
          <input
            type="text"
            id="address1"
            name="address1"
            value={guestForm.address1 || ""}
            onChange={handleFormChange}
          />
        </div>
        <div>
          <label htmlFor="address2">Address 2:</label>
          <input
            type="text"
            id="address2"
            name="address2"
            value={guestForm.address2 || ""}
            onChange={handleFormChange}
          />
        </div>
        <div>
          <label htmlFor="city">City:</label>
          <input
            type="text"
            id="city"
            name="city"
            value={guestForm.city || ""}
            onChange={handleFormChange}
          />
        </div>
        <div>
          <label htmlFor="state">State:</label>
          <input
            type="text"
            id="state"
            name="state"
            value={guestForm.state || ""}
            onChange={handleFormChange}
          />
        </div>
        <div>
          <label htmlFor="zipcode">Zipcode:</label>
          <input
            type="text"
            id="zipcode"
            name="zipcode"
            value={guestForm.zipcode || ""}
            onChange={handleFormChange}
          />
        </div>
        <div>
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={guestForm.phoneNumber || ""}
            onChange={handleFormChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={guestForm.email || ""}
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
          <label htmlFor="brideGuest">Bride's Guest:</label>
          <input
            type="checkbox"
            id="brideGuest"
            name="brideGuest"
            checked={guestForm.brideGuest || false}
            onChange={handleFormChange}
          />
        </div>
        <div className="guest-form__checkbox">
          <label htmlFor="groomGuest">Groom's Guest:</label>
          <input
            type="checkbox"
            id="groomGuest"
            name="groomGuest"
            checked={guestForm.groomGuest || false}
            onChange={handleFormChange}
          />
        </div>
        <div className="guest-form__checkbox">
          <label htmlFor="bridesmaidGuest">Bridesmaid:</label>
          <input
            type="checkbox"
            id="bridesmaidGuest"
            name="bridesmaidGuest"
            checked={guestForm.bridesmaidGuest || false}
            onChange={handleFormChange}
          />
        </div>
        <div className="guest-form__checkbox">
          <label htmlFor="groomsmenGuest">Groomsmen:</label>
          <input
            type="checkbox"
            id="groomsmenGuest"
            name="groomsmenGuest"
            checked={guestForm.groomsmenGuest || false}
            onChange={handleFormChange}
          />
        </div>
        <div>
          <label htmlFor="eventType">Event:</label>
          <input
            type="text"
            id="eventType"
            name="eventType"
            value={guestForm.eventType || ""}
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
