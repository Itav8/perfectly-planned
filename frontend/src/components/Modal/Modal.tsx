import "./Modal.css";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Modal = (props: ModalProps) => {
  return (
    <dialog className="modal" open={props.open}>
      <div className="modal__content">
        <div className="modal__close" onClick={props.onClose}>
          X
        </div>
        {props.children}
        {/* <div className="modal__footer">
          <button onClick={props.onClose}>Close</button>
        </div> */}
      </div>
    </dialog>
  );
};
