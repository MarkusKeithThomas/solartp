import React from "react";

interface ButtonPrimaryProps {
  children: React.ReactNode;
  onClick?: () => void;
}

const ButtonPrimary: React.FC<ButtonPrimaryProps> = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-[#0D1117] text-white text-lg font-semibold px-8 py-3 rounded-full shadow-md transition-all duration-300 hover:bg-[#161B22] active:scale-95"
    >
      {children}
    </button>
  );
};

export default ButtonPrimary;