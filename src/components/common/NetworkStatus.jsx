import { Wifi, WifiOff } from "lucide-react";
import useOnlineStatus from "../../hooks/useOnlineStatus";

function NetworkStatus() {
    const isOnline = useOnlineStatus();

    return (
        <div
            className={`
                fixed bottom-4 right-5 z-50
                flex items-center gap-2
                rounded-full
                px-3 py-2
                text-xs font-medium
                shadow-sm
                backdrop-blur
                transition-all duration-300
                ${
                    isOnline
                        ? "bg-white/90 text-gray-500"
                        : "bg-gray-900 text-white"
                }
            `}
            title={
                isOnline
                    ? "You're online"
                    : "You're offline"
            }
        >
            {isOnline ? (
                <Wifi size={14} />
            ) : (
                <WifiOff size={14} />
            )}

            <span>
                {isOnline ? "Online" : "Offline"}
            </span>
        </div>
    );
}

export default NetworkStatus;