import { useState, useEffect, useContext, useCallback } from "react";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { AuthContext } from "../../hooks/useAuth/useAuth";
import { GuestForm } from "./GuestForm";
import { GuestInviteForm } from "./GuestInviteForm";
import { Modal } from "../../components/Modal/Modal";

import "./Guest.css";

export interface Guest {
  guest_id?: number;
  first_name: string;
  last_name: string;
  address_1: string;
  address_2: string;
  city: string;
  state: string;
  zipcode: string;
  phone_number: string;
  email: string;
  status: "pending" | "attending" | "declined";
  bride_guest: boolean;
  groom_guest: boolean;
  bridesmaids_guest: boolean;
  groomsmen_guest: boolean;
  event_type: string;
}

export const Guests = () => {
  const { userId } = useContext(AuthContext);

  const [guests, setGuests] = useState<Guest[]>([]);
  const [selectedGuest, setSelectedGuest] = useState<Guest>();
  const [selectedEmail, setSelectedEmail] = useState();
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const columns: GridColDef[] = [
    {
      field: "invite",
      headerName: "",
      width: 100,
      renderCell: (params) => {
        return (
          <button
            onClick={() => {
              setIsEmailModalOpen(true);
              setSelectedEmail(params.row.email);
            }}
          >
            Invite
          </button>
        );
      },
    },
    {
      field: "edit",
      headerName: "",
      width: 100,
      renderCell: (params) => {
        return (
          <button
            onClick={() => {
              setIsEditModalOpen(true);
              setSelectedGuest({
                guest_id: params.row.guest_id,
                first_name: params.row.first_name,
                last_name: params.row.last_name,
                address_1: params.row.address_1,
                address_2: params.row.address_2,
                city: params.row.city,
                state: params.row.state,
                zipcode: params.row.zipcode,
                phone_number: params.row.phone_number,
                email: params.row.email,
                status: params.row.status,
                bride_guest: params.row.bride_guest,
                groom_guest: params.row.groom_guest,
                bridesmaids_guest: params.row.bridesmaids_guest,
                groomsmen_guest: params.row.groomsmen_guest,
                event_type: params.row.event_type,
              });
            }}
          >
            Edit
          </button>
        );
      },
    },
    {
      field: "delete",
      headerName: "",
      width: 100,
      renderCell: (params) => {
        return (
          <button
            onClick={(e) => handleDelete(e, params.row.guest_id)}
            style={{ backgroundColor: "#b91c1e" }}
          >
            Delete
          </button>
        );
      },
    },
    { field: "first_name", headerName: "First Name", width: 150 },
    { field: "last_name", headerName: "Last Name", width: 150 },
    { field: "address_1", headerName: "Address 1", width: 200 },
    { field: "address_2", headerName: "Address 2", width: 150 },
    { field: "city", headerName: "City", width: 150 },
    { field: "state", headerName: "State", width: 100 },
    { field: "zipcode", headerName: "Zip Code", width: 120 },
    { field: "phone_number", headerName: "Phone Number", width: 150 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "status", headerName: "Status", width: 130 },
    { field: "bride_guest", headerName: "Bride Guest", width: 150 },
    { field: "groom_guest", headerName: "Groom Guest", width: 150 },
    { field: "bridesmaids_guest", headerName: "Bridesmaid Guest", width: 180 },
    { field: "groomsmen_guest", headerName: "Groomsmen Guest", width: 180 },
    { field: "event_type", headerName: "Event Type", width: 150 },
  ];

  const fetchGuests = useCallback(async () => {
    const guestlistUrl = `${import.meta.env.VITE_API_URL}/guest/list/${userId}`;

    try {
      const getGuestsResponse = await fetch(guestlistUrl);

      if (getGuestsResponse.ok) {
        const guestsData: Guest[] = await getGuestsResponse.json();

        const guestsWithIds = guestsData.map((guest) => ({
          ...guest,
          id: guest.guest_id,
        }));
        setGuests(guestsWithIds);
      }
    } catch (error) {
      console.log("Guest List Error:", error);
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      fetchGuests();
    }
  }, [fetchGuests, userId]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleDelete = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    guestId: number
  ) => {
    event.preventDefault();

    const deleteGuest = `${
      import.meta.env.VITE_API_URL
    }/guest/delete/${guestId}`;

    const fetchConfig = {
      method: "delete",
      headers: {
        "Content-Type": "application",
      },
    };

    try {
      const deleteGuestResponse = await fetch(deleteGuest, fetchConfig);

      if (deleteGuestResponse.ok) {
        console.log("Guest deleted successfully");
        fetchGuests();
      }
    } catch (error) {
      console.log("Error deleting guest", error);
    }
  };

  return (
    <div>
      <h1>Guests</h1>
      {isModalOpen ? (
        <Modal open={isModalOpen} onClose={closeModal}>
          <GuestForm
            type="create"
            onSubmit={() => {
              fetchGuests();
              closeModal();
            }}
          />
        </Modal>
      ) : null}
      {selectedGuest ? (
        <Modal
          open={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedGuest(undefined);
          }}
        >
          <GuestForm
            type="edit"
            initialValues={selectedGuest}
            onSubmit={() => {
              fetchGuests();
              setIsEditModalOpen(false);
              setSelectedGuest(undefined);
            }}
          />
        </Modal>
      ) : null}
      {isEmailModalOpen ? (
        <Modal
          open={isEmailModalOpen}
          onClose={() => {
            setIsEmailModalOpen(false);
          }}
        >
          <GuestInviteForm
            initialValue={selectedEmail}
            onSubmit={() => {
              setSelectedEmail(undefined);
              setIsEmailModalOpen(false);
            }}
          />
        </Modal>
      ) : null}
      <button className="guest__button" onClick={openModal}>
        Add Guest
      </button>
      <div className="guest__table" style={{ height: 500, width: "100%" }}>
        <DataGrid
          rows={guests}
          columns={columns}
          slots={{ toolbar: GridToolbar }}
          pageSizeOptions={[5, 10, 25, 100]}
        />
      </div>
    </div>
  );
};
