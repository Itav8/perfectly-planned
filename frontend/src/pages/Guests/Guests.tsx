import { useState, useEffect, useContext } from "react";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { GuestForm } from "./GuestForm";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { AuthContext } from "../../hooks/useAuth/useAuth";
interface Guest {
  guest_id: number;
  first_name: string;
  last_name: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zipcode: string;
  phone_number: string;
  email: string;
  status: "pending" | "attending" | "declined";
  bride_guest: boolean;
  groom_guest: boolean;
  bridesmaid_guest: boolean;
  groomsmen_guest: boolean;
  event_type: string;
}

const columns: GridColDef[] = [
  {
    field: "invite",
    headerName: "Invite",
    width: 150,
    // This needs to be updated onClick to hit /guest/invite endpoint
    renderCell: (params) => {
      console.log("PARAMS", params);
      console.log("Params per row", params.row);
      return <button>Invite</button>;
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
  { field: "bridesmaid_guest", headerName: "Bridesmaid Guest", width: 180 },
  { field: "groomsmen_guest", headerName: "Groomsmen Guest", width: 180 },
  { field: "event_type", headerName: "Event Type", width: 150 },
];

export const Guests = () => {
  const { userId } = useContext(AuthContext);

  const [guests, setGuests] = useState<Guest[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchGuests = async () => {
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
  };

  useEffect(() => {
    fetchGuests();
  }, [userId]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <h1>Guests</h1>
      <Button variant="contained" onClick={openModal}>
        Add Guest
      </Button>

      <Dialog open={isModalOpen} onClose={closeModal}>
        <DialogTitle>Add Guest</DialogTitle>
        <DialogContent>
          <GuestForm
            onSubmit={() => {
              fetchGuests();
              closeModal();
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModal} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <div style={{ height: 300, width: "100%" }}>
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
