import { useContext, useEffect, useState } from "react";

import { AuthContext } from "../../hooks/useAuth/useAuth";

interface GuestInviteProps {
  initialValue?: string;
  onSubmit?: () => void;
}

interface EmailForm {
  email?: string;
  subject: string;
  message: string;
}

export const GuestInviteForm = (props: GuestInviteProps) => {
  const { userId } = useContext(AuthContext);

  const [emailForm, setEmailForm] = useState<EmailForm>({
    email: props.initialValue || "",
    subject: "You're invited!",
    message: "You're cordially invited to my wedding.",
  });

  const handleFormChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = event?.target.value;
    const inputName = event.target.name;

    setEmailForm({
      ...emailForm,
      [inputName]: value,
    });
  };

  const handleInvite = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const inviteGuest = `${import.meta.env.VITE_API_URL}/guest/invite`;
    const messageData = {
      email: emailForm.email,
      subject: emailForm.subject,
      message: emailForm.message,
    };

    const fetchConfig = {
      method: "post",
      body: JSON.stringify(messageData),
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const inviteResponse = await fetch(inviteGuest, fetchConfig);

      if (inviteResponse.ok) {
        setEmailForm({
          email: "",
          subject: "",
          message: "",
        });

        if (props.onSubmit) props.onSubmit();
      }
    } catch (error) {
      console.log("Error inviting guest", error);
    }
  };

  useEffect(() => {}, [userId]);

  return (
    <div>
      <h1>Email</h1>
      <form className="guest-invite__form" onSubmit={handleInvite}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={emailForm.email}
            onChange={handleFormChange}
          />
        </div>
        <div>
          <label htmlFor="subject">Subject:</label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={emailForm.subject}
            onChange={handleFormChange}
          />
        </div>
        <div>
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            value={emailForm.message}
            onChange={handleFormChange}
          />
        </div>
        <div>
          <button className="guest-invite__button">Send</button>
        </div>
      </form>
    </div>
  );
};
