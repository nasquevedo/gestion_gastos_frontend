export const Modal = ({ children }) => {
    return (
       <div className="modal-backdrop" role="dialog" aria-modal="true">
            <section className="modal-sheet">
                { children }
            </section>
        </div>
    );
}