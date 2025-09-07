import { useHotglue } from "@hotglue/widget";
import { v4 as uuidv4 } from 'uuid';
export default function WidgetLauncher({ setTenantIsLinked }: { setTenantIsLinked: (tenantIsLinked: boolean) => void }) {
    const { openWidget } = useHotglue();
    
    const handleOpenWidget = () => {
        openWidget(uuidv4(), {
          flow: "KvbIoB9YR",
          listener: {
            onConnectorLinked: () => {
              setTenantIsLinked(true)
            },
            onConnectorUnlinked: () => {
              setTenantIsLinked(false)
            }
          }
          });
      };
    return (
      <div>
        <button
      className={`
        bg-green-500 
        transition-all duration-100
        shadow-lg
        cursor-pointer 
        text-white 
        px-12 py-2 
        rounded-3xl
        hover:bg-green-500 
        hover:shadow-sm
        disabled:opacity-50`} 
      onClick={handleOpenWidget}>Connect Your Account</button>
    </div>
  );
}