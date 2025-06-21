import { ReactNode, useEffect, MouseEventHandler } from "react";

interface BackdropProps {
  children: ReactNode;
  onClick: MouseEventHandler<HTMLDivElement>;
}

const Backdrop: React.FC<BackdropProps> = ({ children, onClick }) => {
  useEffect(() => {
    document.body.style.overflowY = "hidden";
    return () => {
      document.body.style.overflowY = "";
    };
  }, []);

  return (
    <div
      onClick={onClick}
      className="fixed z-10 left-0 top-0 w-full h-full bg-black/70 flex items-center justify-center"
    >
      {children}
    </div>
  );
};

export default Backdrop;
