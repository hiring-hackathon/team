import Sidebar from "@/components/core/Sidebar";
import Chatbot from "../../components/core/chatBot";

export default function Chat() {
  return (
    <main style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'black' }}>
      <div > {/* Fixed width for Sidebar */}
        <Sidebar />
      </div>
      <div style={{ flex: 1 }}> {/* Chatbot takes up the remaining space */}
        <Chatbot />
      </div>
    </main>
  );
}
