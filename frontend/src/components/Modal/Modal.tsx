import "./Modal.css"
interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Modal = (props: ModalProps) => {
  return (
    <dialog className="modal" open={props.open}>
      <div onClick={props.onClose}>X</div>
      {props.children}
      <button onClick={props.onClose}>CLOSE</button>
    </dialog>
  );
};
