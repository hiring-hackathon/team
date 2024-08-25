"use client";
import { useState, useRef, useEffect } from "react";
import {
  Box,
  TextField,
  Paper,
  Typography,
  IconButton,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import ReactMarkdown from "react-markdown"
import Navbar from "@/components/layout/nav";

export default function Chatbot() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi! I'm AI assistant ask me about any of your transcripts?",
    },
  ]);
  const [message, setMessage] = useState("");
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);
  const messagesEndRef = useRef(null);

  
  useEffect(() => {
    if (typeof window !== "undefined") {
      recognitionRef.current = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = "en-US";
      
      // Add your event listeners and logic for speech recognition here
      recognitionRef.current.onresult = (event) => {
        setMessage(event.results[0][0].transcript);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);


  const sendMessage = async () => {

      setMessages((messages) => [
        ...messages,
        { role: "user", content: message },
        { role: "assistant", content: "" },
      ]);

      setMessage("");
      const response = fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify([...messages, { role: "user", content: message}]),
      }).then(async (res) => {
        const reader = res.body.getReader();
        const decoder = new TextDecoder();

        let result = "";
        return reader.read().then(function processText({ done, value }) {
          if (done) {
            return result;
          }
          const text = decoder.decode(value || new Uint8Array(), {
            stream: true,
          });
          setMessages((messages) => {
            let lastMessage = messages[messages.length - 1];
            let otherMessages = messages.slice(0, messages.length - 1);
            return [
              ...otherMessages,
              { ...lastMessage, content: lastMessage.content + text },
            ];
          });
          return reader.read().then(processText);
        });
      });
      scrollToBottom();
    }



  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);



 const handleVoiceInput = () => {
    const recognition = recognitionRef.current;
    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      setIsListening(true);
      recognition.start();
    }
  };
  
  return(
    <div>
        <Navbar/>
    <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      background: "#f5f5f5",
      padding: 3,
    }}
  >
  <Typography
    variant="h3"
    sx={{
      textAlign: "center",
      mb: 3,
      fontWeight: "bold",
      color: "#f5f5f5", 
      textShadow: "3px 3px 8px rgba(0, 0, 0, 1)", 
      letterSpacing: "1.5px", 
      lineHeight: "1.4", 
      fontFamily: "'Montserrat', sans-serif", 
      padding: "2px 5px", 
    }}
  >
    AI Assistant 
  </Typography>




    
    <Paper
      elevation={2} // Reduced elevation for a softer shadow
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 3,
        backgroundColor: "#1f2a38", // Darker background for contrast
        borderRadius: "20px",
        width: "80%",
        maxWidth: "600px",
        height: "75dvh",
        boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.4)", // Softer, more cohesive shadow
      }}
    >
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          padding: 2,
          mb: 2,
          "&::-webkit-scrollbar": {
            width: "2px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#007bff",
            borderRadius: "10px",
          },
        }}
      >
        {messages.map((message, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              justifyContent: message.role === "user" ? "flex-end" : "flex-start",
              mb: 1,
            }}
          >
            <Paper
              elevation={2}
              sx={{
                padding: "10px 15px",
                borderRadius: "15px",
                backgroundColor: message.role === "user" ? "#007aff" : "#2c3e50", 
                color: message.role === "user" ? "#ffffff" : "#ffffff", 
                maxWidth: "70%",
                wordWrap: "break-word",
              }}
            >
              <ReactMarkdown>{message.content}</ReactMarkdown>
            </Paper>
          </Box>
        ))}
        <div ref={messagesEndRef} />
      </Box>
      
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          borderRadius: "20px",
          padding: "10px",
          mt: "auto",
          border: "1px solid #34495e" 
        }}
      >
        <TextField
          fullWidth
          placeholder="Type your message..."
          variant="outlined"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          sx={{
            backgroundColor: "#1e2a38", 
            borderRadius: "20px",
            mr: 1,
            "& fieldset": { border: "none" },
            color: "#ffffff",
            "& input": { color: "#ffffff" },
          }}
        />
        <IconButton
        onClick={handleVoiceInput}
        sx={{
          backgroundColor: "#007bff",
          color: "#ffffff",
          borderRadius: "50%",
          padding: "10px",
          ml: 1,
        }}
      >
        {isListening ? <MicIcon /> : <MicOffIcon />}
      </IconButton>
        <IconButton
          onClick={sendMessage}
          sx={{
            backgroundColor: "#007bff",
            color: "#ffffff",
            borderRadius: "50%",
            padding: "10px",
            ml: 1,
          }}
        >
          <SendIcon />
        </IconButton>
      </Box>
    </Paper>
  </Box>
  </div>
)
}