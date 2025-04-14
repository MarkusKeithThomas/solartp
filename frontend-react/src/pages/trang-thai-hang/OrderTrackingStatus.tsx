import { JSX } from "react";
import {
  FaRegFileAlt,
  FaMoneyCheckAlt,
  FaTruck,
  FaBoxOpen,
  FaStar,
} from "react-icons/fa";
import "../../styles/ordertrackingstatus.css";
import { OrderStatus } from "../../type/order";

type Step = {
  label: string;
  icon: JSX.Element;
  status: OrderStatus;
};

const steps: Step[] = [
  {
    label: `Đơn Hàng Đã Đặt`,
    icon: <FaRegFileAlt />,
    status: OrderStatus.PLACED,
  },
  {
    label: "Xác nhận Shop",
    icon: <FaMoneyCheckAlt />,
    status: OrderStatus.CONFIRMED,
  },
  {
    label: "Chờ Lấy Hàng Shipper",
    icon: <FaTruck />,
    status: OrderStatus.WAITING_FOR_PICKUP,
  },
  {
    label: "Đang Giao",
    icon: <FaBoxOpen />,
    status: OrderStatus.DELIVERING,
  },
  {
    label: "Đơn Hàng Hoàn Thành",
    icon: <FaStar />,
    status: OrderStatus.COMPLETED,
  },
];
export interface OrderTrackingProps {
  orderCode: string;
  status: OrderStatus;
}

export function OrderTrackingStatus({ orderCode, status }: OrderTrackingProps) {
  const statusIndex = steps.findIndex((s) => s.status === status);

  return (
    <div className="d-flex justify-content-between align-items-center my-4 position-relative">
      {steps.map((step, index) => {
        const isDone = index <= statusIndex;

        return (
          <div
            key={step.status}
            className="text-center flex-fill position-relative justify-items-center align-items-center"
          >
            <div
              className={`rounded-circle mx-auto mb-2 d-flex justify-content-center align-items-center ${
                isDone ? "bg-success text-white" : "bg-light text-secondary"
              }`}
              style={{ width: 50, height: 50, fontSize: 20 }}
            >
              {step.icon}
            </div>
            <div
              style={{
                fontWeight: isDone ? "bold" : "normal",
                color: isDone ? "#198754" : "#6c757d",
              }}
            >
              {step.label}
            </div>

            {/* Dòng nối giữa các bước */}
            {index < steps.length - 1 && (
              <div
                className="position-absolute"
                style={{
                  top: 25,
                  left: "calc(50% + 25px)",
                  width: "calc(100% - 25px)",
                  height: 3,
                  backgroundColor: index < statusIndex ? "#198754" : "#dee2e6",
                  zIndex: -1,
                }}
              ></div>
            )}
          </div>
        );
      })}
    </div>
  );
}
