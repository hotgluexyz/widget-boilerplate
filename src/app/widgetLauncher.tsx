import { useHotglue } from "@hotglue/widget";

export default function WidgetLauncher() {
    const { openWidget } = useHotglue();
    
    const generateUUID = () => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    };
  return (
    <div>
      <button onClick={() => openWidget(generateUUID())}>Open Widget</button>
    </div>
  );
}