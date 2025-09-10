
// import { useEffect, useMemo, useRef, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { MessageCircle, Send, X, Bot, Mail, Github, Linkedin, Youtube, Twitter, ExternalLink, Mic, Volume2 } from "lucide-react";
// import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { useTheme } from "@/contexts/ThemeContext";
// import { useToast } from "@/hooks/use-toast";
// import { sendEmail } from "@/utils/sendEmail";
// import {
//   getProfile,
//   getProjects,
//   getSkills,
//   getEducation,
//   getCertificates,
//   getContact,
//   getSocialLinks,
//   Project,
//   Skill,
//   Education,
//   Certificate,
//   SocialLink,
// } from "@/services/storageService";

// interface ChatMessage {
//   id: string;
//   role: "assistant" | "user";
//   content: string;
//   cta?: "contact";
//   kind?: "projects" | "certificates" | "skills" | "resume" | "socials" | "contact-form" | "email" | "education-link";
//   payload?: any[] | string;
// }

// // Speech recognition types
// declare global {
//   interface Window {
//     webkitSpeechRecognition: any;
//     SpeechRecognition: any;
//   }
// }

// interface SpeechRecognitionEvent extends Event {
//   results: SpeechRecognitionResultList;
//   resultIndex: number;
// }

// interface SpeechRecognitionResultList {
//   [index: number]: SpeechRecognitionResult;
//   length: number;
// }

// interface SpeechRecognitionResult {
//   [index: number]: SpeechRecognitionAlternative;
//   length: number;
//   isFinal: boolean;
// }

// interface SpeechRecognitionAlternative {
//   transcript: string;
//   confidence: number;
// }

// const ChatbotFab = () => {
//   const [open, setOpen] = useState(false);
//   const [input, setInput] = useState("");
//   const [messages, setMessages] = useState<ChatMessage[]>([]);
//   const [typing, setTyping] = useState(false);
//   const { theme } = useTheme();
//   const navigate = useNavigate();
//   const listRef = useRef<HTMLDivElement>(null);
//   const { toast } = useToast();
//   const [formStatusById, setFormStatusById] = useState<Record<string, 'idle' | 'sending' | 'sent' | 'error'>>({});
  
//   // Voice assistance states
//   const [isListening, setIsListening] = useState(false);
//   const [isSpeaking, setIsSpeaking] = useState(false);
//   const [speechSupported, setSpeechSupported] = useState(false);
//   const recognitionRef = useRef<any>(null);
//   const synthesisRef = useRef<SpeechSynthesis | null>(null);

//   const profile = useMemo(() => getProfile(), []);
//   const projects = useMemo(() => getProjects(), []);
//   const skills = useMemo(() => getSkills(), []);
//   const education = useMemo(() => getEducation(), []);
//   const certificates = useMemo(() => getCertificates(), []);
//   const contact = useMemo(() => getContact(), []);
//   const socials = useMemo(() => getSocialLinks(), []);

//   // Check if speech recognition and synthesis are supported
//   useEffect(() => {
//     const speechRecognitionSupported = 
//       'SpeechRecognition' in window || 'webkitSpeechRecognition' in window;
//     const speechSynthesisSupported = 'speechSynthesis' in window;
    
//     setSpeechSupported(speechRecognitionSupported && speechSynthesisSupported);
    
//     if (speechRecognitionSupported) {
//       const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//       recognitionRef.current = new SpeechRecognition();
//       recognitionRef.current.continuous = false;
//       recognitionRef.current.interimResults = true;
//       recognitionRef.current.lang = 'en-US';
      
//       recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
//         const transcript = Array.from(event.results)
//           .map(result => result[0])
//           .map(result => result.transcript)
//           .join('');
        
//         setInput(transcript);
        
//         // Check if this is the final result (user stopped speaking)
//         const isFinal = event.results[0].isFinal;
//         if (isFinal && transcript.trim().length > 0) {
//           // Auto-submit after a brief delay
//           setTimeout(() => {
//             sendMessageFromVoice(transcript);
//           }, 500);
//         }
//       };
      
//       recognitionRef.current.onend = () => {
//         setIsListening(false);
//       };
      
//       recognitionRef.current.onerror = (event: any) => {
//         console.error('Speech recognition error', event.error);
//         setIsListening(false);
//         toast({
//           title: "Speech recognition error",
//           description: `Error: ${event.error}`,
//           variant: "destructive"
//         });
//       };
//     }
    
//     if (speechSynthesisSupported) {
//       synthesisRef.current = window.speechSynthesis;
      
//       // Preload voices
//       setTimeout(() => {
//         const voices = synthesisRef.current?.getVoices();
//         console.log("Available voices:", voices?.map(v => v.name));
//       }, 1000);
//     }
//   }, [toast]);

//   useEffect(() => {
//     if (!open) return;
//     if (messages.length === 0) {
//       setMessages([
//         {
//           id: crypto.randomUUID(),
//           role: "assistant",
//           content: "Hi! I'm Sagar Shegunashi's assistant. Ask me about his skills, projects, education, or how to contact him.",
//         },
//       ]);
//     }
//   }, [open]);

//   useEffect(() => {
//     listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
//   }, [messages, open]);

//   // Toggle speech recognition
//   const toggleListening = () => {
//     if (isListening) {
//       recognitionRef.current.stop();
//       setIsListening(false);
//     } else {
//       try {
//         recognitionRef.current.start();
//         setIsListening(true);
//         setInput(""); // Clear input when starting to listen
//       } catch (error) {
//         console.error("Speech recognition start error:", error);
//         toast({
//           title: "Microphone access needed",
//           description: "Please allow microphone access to use voice input.",
//           variant: "destructive"
//         });
//       }
//     }
//   };

//   // Speak text using text-to-speech with female voice
//   const speakText = (text: string) => {
//     if (!synthesisRef.current) return;
    
//     // Cancel any ongoing speech
//     synthesisRef.current.cancel();
    
//     const utterance = new SpeechSynthesisUtterance(text);
    
//     // Try to find a female voice
//     const voices = synthesisRef.current.getVoices();
//     const femaleVoice = voices.find(voice => 
//       voice.name.includes('Female') || 
//       voice.name.includes('Woman') || 
//       voice.name.includes('Zira') || 
//       voice.name.includes('Samantha') ||
//       voice.name.includes('Karen') || // Australian female voice
//       voice.name.includes('Tessa') || // South African female voice
//       voice.name.includes('Veena') || // Indian English female voice
//       voice.name.includes('Raveena') // Indian English female voice
//     );
    
//     if (femaleVoice) {
//       utterance.voice = femaleVoice;
//     }
    
//     utterance.rate = 0.9;
//     utterance.pitch = 1.1; // Slightly higher pitch for female voice
//     utterance.volume = 0.8;
    
//     utterance.onstart = () => setIsSpeaking(true);
//     utterance.onend = () => setIsSpeaking(false);
//     utterance.onerror = () => setIsSpeaking(false);
    
//     synthesisRef.current.speak(utterance);
//   };

//   // Stop speaking
//   const stopSpeaking = () => {
//     if (synthesisRef.current) {
//       synthesisRef.current.cancel();
//       setIsSpeaking(false);
//     }
//   };

//   const handleContactCTA = () => {
//     setOpen(false);
//     navigate("/", { replace: false });
//     setTimeout(() => {
//       const el = document.getElementById("contact");
//       el?.scrollIntoView({ behavior: "smooth" });
//     }, 200);
//   };

//   const answerQuestion = (q: string): ChatMessage => {
//     const text = q.toLowerCase();

//     const reply = (
//       content: string,
//       options?: { cta?: "contact"; kind?: ChatMessage["kind"]; payload?: ChatMessage["payload"] }
//     ): ChatMessage => ({
//       id: crypto.randomUUID(),
//       role: "assistant",
//       content,
//       cta: options?.cta,
//       kind: options?.kind,
//       payload: options?.payload,
//     });

//     if (/(who are you|what's your name|your name|name\??)/.test(text)) {
//       return reply(`His name is ${profile.name}. I'm his AI assistant, here to help.`);
//     }

//     if (/(current|currently|doing now|up to|status|what's up|what are you up to)/.test(text)) {
//       return reply(`${profile.name} is in his final year and actively open to work opportunities.`);
//     }

//     if (/(email|gmail|contact|reach|message|send (a )?message|like)/.test(text)) {
//       return reply(`You can contact ${profile.name} at ${contact.email}. Compose a message below or use quick links.`, { kind: "contact-form" });
//     }

//     if (/(gmail app|open gmail|compose)/.test(text)) {
//       return reply(`Quick links to contact ${profile.name}`, { kind: "email", payload: contact.email });
//     }

//     if (/(social|linkedin|github|youtube|twitter|\bx\b)/.test(text)) {
//       return reply("Social profiles:", { kind: "socials", payload: socials });
//     }

//     if (/(where|location|based)/.test(text)) {
//       return reply(`${profile.name} is based in ${contact.location || profile.location || "Bengaluru"}.`);
//     }

//     if (/(better|best|strong|expert|proficient).*(skill|tools|stack)|\bhtml\b|\bcss\b|\bjava\b/.test(text)) {
//       return reply("Strongest skills: HTML, CSS, and Java. Also experienced with JavaScript and UI/UX.");
//     }

//     if (/interest|hobbies?/.test(text)) {
//       return reply("Top interests: Web Development, Software Development, and Jr Software Engineer roles.");
//     }

//     if (/skill|skills|stack|skull|skulls|his learnings|tech|tools/.test(text)) {
//       const top = skills.slice(0, 10).map((s: Skill) => s.name).join(", ");
//       return reply(`Key skills: ${top}. Tap a skill to see related projects.`, { kind: "skills", payload: skills });
//     }

//     if (/project|work|portfolio/.test(text)) {
//       return reply("Here are Sagar Shegunashi's projects. Swipe to explore.", {
//         kind: "projects",
//         payload: projects,
//       });
//     }

//     if (/certificates?|certificates|certi|Certification|Certifications|achiev/.test(text)) {
//       return reply("Certificates — swipe to see all.", {
//         kind: "certificates",
//         payload: certificates,
//       });
//     }

//     if (/education|college|degree|stud|branch|graduate|graduation|when started|start year|end year/.test(text)) {
//       const e = education[0] as Education | undefined;
//       if (e) {
//         const start = new Date(e.startDate).toLocaleString("en-US", { month: "short", year: "numeric" });
//         const end = new Date(e.endDate).toLocaleString("en-US", { month: "short", year: "numeric" });
//         const maps = `https://www.google.com/maps?q=${encodeURIComponent(e.institution + ' Bangalore')}`;
//         return reply(`${e.degree} in ${e.field} at ${e.institution} (${start}–${end}).`, { kind: "education-link", payload: maps });
//       }
//       return reply("Education details are not available right now.");
//     }
    
//     if(/hi|hello|hey|greetings|sup|yo|good morning|good afternoon|good evening/.test(text)) {
//       const greetings = ["Hi", "Hello", "Hey", "Greetings", "Yo"];
//       const greet = greetings[Math.floor(Math.random() * greetings.length)];
//       return reply(`${greet}! Ask me anything about Sagar Shegunashi's skills, projects, or contact info.`);
//     }

//     if (text.length > 200) {
//       return reply("That's quite a long message! Could you please shorten it or ask something specific about Sagar?");
//     }
    
//     if (/(wife)/.test(text)) {
//       return reply("Nimmi 🩵.");
//     }
    
//     if (/resume|cv|resame|rezume|bio|biodata|Bio-data|Bio/.test(text)) {
//       return reply("Here is a quick resume preview.", { kind: "resume", payload: `${window.location.origin}/resume.pdf#toolbar=1&view=FitH` });
//     }
    
//     if (/thank|Thanks|Thank you|Okay|ok|OK|k|K/.test(text)) {
//       return reply("You're welcome! Feel free to ask anything else about Sagar.");
//     }
    
//     return reply(
//       "I can help with Sagar Shegunashi's profile, skills, projects, certificates, resume, or contact details. For other questions, send a quick message below.",
//       { cta: "contact" }
//     );
//   };

//   const streamAssistantMessage = (msg: ChatMessage) => {
//     const newId = crypto.randomUUID();
//     const base: ChatMessage = { ...msg, id: newId, content: "" };
//     setMessages((prev) => [...prev, base]);
//     setTyping(true);

//     const text = msg.content || "";
//     let i = 0;
//     const interval = setInterval(() => {
//       i += 1;
//       setMessages((prev) => prev.map((m) => (m.id === newId ? { ...m, content: text.slice(0, i) } : m)));
//       if (i >= text.length) {
//         clearInterval(interval);
//         setTyping(false);
        
//         // Speak the response when it's complete
//         if (speechSupported) {
//           speakText(text);
//         }
//       }
//     }, 18);
//   };

//   const showProjectsForSkill = (skillName: string) => {
//     const filtered = projects.filter((p) => p.tags?.some((t) => t.toLowerCase() === skillName.toLowerCase()));
//     if (filtered.length > 0) {
//       streamAssistantMessage({
//         id: crypto.randomUUID(),
//         role: "assistant",
//         content: `Projects using ${skillName}:`,
//         kind: "projects",
//         payload: filtered,
//       });
//     } else {
//       streamAssistantMessage({
//         id: crypto.randomUUID(),
//         role: "assistant",
//         content: `No projects found for ${skillName}. More projects coming soon. For more details, contact me.`,
//         cta: "contact",
//       });
//     }
//   };

//   const sendMessage = () => {
//     const trimmed = input.trim();
//     if (!trimmed) return;
//     const userMsg: ChatMessage = { id: crypto.randomUUID(), role: "user", content: trimmed };
//     setMessages((prev) => [...prev, userMsg]);
//     setInput("");
//     const aiMsg = answerQuestion(trimmed);
//     // slight delay for more natural feel
//     setTimeout(() => streamAssistantMessage(aiMsg), 250);
//   };

//   // Send message from voice input
//   const sendMessageFromVoice = (transcript: string) => {
//     const userMsg: ChatMessage = { id: crypto.randomUUID(), role: "user", content: transcript };
//     setMessages((prev) => [...prev, userMsg]);
//     setInput("");
//     const aiMsg = answerQuestion(transcript);
//     // slight delay for more natural feel
//     setTimeout(() => streamAssistantMessage(aiMsg), 250);
//   };

//   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === "Enter") {
//       e.preventDefault();
//       sendMessage();
//     }
//   };

//   const SocialIcon = ({ platform, className = "w-4 h-4" }: { platform: string; className?: string }) => {
//     const p = platform.toLowerCase();
//     if (p.includes("github")) return <Github className={className} />;
//     if (p.includes("linkedin")) return <Linkedin className={className} />;
//     if (p.includes("youtube")) return <Youtube className={className} />;
//     if (p.includes("twitter") || p === "x") return <Twitter className={className} />;
//     if (p.includes("mail") || p.includes("email") || p.includes("gmail")) return <Mail className={className} />;
//     return <ExternalLink className={className} />;
//   };

//   const gmailComposeFor = (email: string) => `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}`;

//   return (
//     <>
//       {/* Floating Button */}
//       <button
//         aria-label="Open AI Chatbot"
//         onClick={() => setOpen(true)}
//         className="fixed bottom-6 right-6 z-50 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300 focus:outline-none focus:ring-2 focus:ring-accent"
//         style={{
//           width: 56,
//           height: 56,
//           background:
//             theme === "dark"
//               ? "linear-gradient(135deg, hsl(var(--accent)), hsl(var(--primary)))"
//               : "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)))",
//         }}
//       >
//         <Bot className="w-6 h-6 text-white mx-auto" />
//       </button>

//       <Sheet open={open} onOpenChange={setOpen}>
//         <SheetContent side="right" className="w-[min(480px,100vw)] h-[100svh] p-0 flex flex-col">
//           <div className="flex h-full flex-col">
//             <SheetHeader className="px-4 py-3 border-b border-white/10">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <SheetTitle>Ask about Sagar</SheetTitle>
//                   <SheetDescription className="sr-only">Chat assistant to explore Sagar's profile, skills, projects, and contact options.</SheetDescription>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   {/* Voice controls */}
//                   {speechSupported && (
//                     <>
//                       <Button
//                         variant="ghost"
//                         size="icon"
//                         onClick={isSpeaking ? stopSpeaking : () => speakText(messages.filter(m => m.role === 'assistant').pop()?.content || '')}
//                         disabled={messages.filter(m => m.role === 'assistant').length === 0}
//                         aria-label={isSpeaking ? "Stop speaking" : "Read last message"}
//                       >
//                         <Volume2 className={`w-4 h-4 ${isSpeaking ? "text-accent animate-pulse" : ""}`} />
//                       </Button>
//                       <Button
//                         variant={isListening ? "default" : "ghost"}
//                         size="icon"
//                         onClick={toggleListening}
//                         aria-label={isListening ? "Stop listening" : "Start voice input"}
//                       >
//                         <Mic className={`w-4 h-4 ${isListening ? "animate-pulse" : ""}`} />
//                       </Button>
//                     </>
//                   )}
//                   <Button variant="ghost" size="icon" onClick={() => setOpen(false)} aria-label="Close">
//                     <X className="w-4 h-4" />
//                   </Button>
//                 </div>
//               </div>
//             </SheetHeader>

//             {/* Messages */}
//             <div ref={listRef} className="flex-1 overflow-y-auto p-4 space-y-3">
//               {messages.map((m) => (
//                 <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
//                   <div
//                     className={`${m.kind ? "w-full" : "max-w-[85%]"} rounded-2xl px-3 py-2 text-sm whitespace-pre-wrap ${
//                       m.role === "user"
//                         ? "bg-accent text-white"
//                         : theme === "dark"
//                         ? "bg-white/10 text-white"
//                         : "bg-white text-foreground shadow"
//                     }`}
//                   >
//                     <div>{m.content}</div>

//                     {m.kind === "projects" && Array.isArray(m.payload) && (
//                       <div className="mt-3 -mx-1">
//                         <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory pb-2">
//                           {(m.payload as Project[]).map((p) => (
//                             <a
//                               key={p.id}
//                               href={p.url || p.github || "#"}
//                               target="_blank"
//                               rel="noopener noreferrer"
//                               className="snap-start min-w-[220px] bg-background/30 rounded-xl border border-white/10 hover:border-accent/50 transition-colors p-3"
//                             >
//                               <div className="h-24 w-full rounded-lg overflow-hidden mb-2 bg-muted">
//                                 <img src={p.image || "/placeholder.svg"} alt={p.title} loading="lazy" className="w-full h-full object-cover" />
//                               </div>
//                               <div className="font-medium text-sm line-clamp-1">{p.title}</div>
//                               <div className="text-xs text-muted-foreground line-clamp-2">{p.description}</div>
//                             </a>
//                           ))}
//                         </div>
//                       </div>
//                     )}

//                     {m.kind === "certificates" && Array.isArray(m.payload) && (
//                       <div className="mt-3 -mx-1">
//                         <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory pb-2">
//                           {(m.payload as Certificate[]).map((c) => (
//                             <div key={c.id} className="snap-start min-w-[220px] bg-background/30 rounded-xl border border-white/10 p-3">
//                               <div className="h-24 w-full rounded-lg overflow-hidden mb-2 bg-muted">
//                                 <img src={c.image || "/placeholder.svg"} alt={c.title} loading="lazy" className="w-full h-full object-cover" />
//                               </div>
//                               <div className="font-medium text-sm line-clamp-1">{c.title}</div>
//                               <div className="text-xs text-muted-foreground line-clamp-1">{c.issuer}</div>
//                             </div>
//                           ))}
//                         </div>
//                       </div>
//                     )}

//                     {m.kind === "skills" && Array.isArray(m.payload) && (
//                       <div className="mt-3">
//                         <div className="flex flex-wrap gap-2">
//                           {(m.payload as Skill[]).map((s) => (
//                             <Button
//                               key={s.id}
//                               size="sm"
//                               variant="secondary"
//                               onClick={() => showProjectsForSkill(s.name)}
//                               className="rounded-full"
//                               aria-label={`Show projects using ${s.name}`}
//                             >
//                               {s.name}
//                             </Button>
//                           ))}
//                         </div>
//                       </div>
//                     )}

//                     {m.kind === "socials" && Array.isArray(m.payload) && (
//                       <div className="mt-3">
//                         <div className="flex flex-wrap gap-2">
//                           {(m.payload as SocialLink[]).map((s) => (
//                             <a
//                               key={s.id}
//                               href={s.url}
//                               target="_blank"
//                               rel="noopener noreferrer"
//                               className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 hover:border-accent/50 transition-colors"
//                             >
//                               <SocialIcon platform={s.platform} />
//                               <span className="text-xs">{s.platform}</span>
//                             </a>
//                           ))}
//                         </div>
//                       </div>
//                     )}

//                     {m.kind === "email" && typeof m.payload === "string" && (
//                       <div className="mt-3 flex flex-wrap gap-2">
//                         <a
//                           href={gmailComposeFor(m.payload)}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent text-white hover:opacity-90"
//                         >
//                           <Mail className="w-4 h-4" /> Gmail
//                         </a>
//                         <a
//                           href={`mailto:${m.payload}`}
//                           className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10"
//                         >
//                           <Mail className="w-4 h-4" /> Email
//                         </a>
//                       </div>
//                     )}

//                     {m.kind === "education-link" && typeof m.payload === "string" && (
//                       <div className="mt-3">
//                         <a
//                           href={m.payload as string}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent text-white hover:opacity-90"
//                         >
//                           <ExternalLink className="w-4 h-4" /> Open College Location
//                         </a>
//                       </div>
//                     )}

//                     {m.kind === "resume" && typeof m.payload === "string" && (
//                       <div className="mt-3">
//                         <div className="rounded-lg overflow-hidden border border-white/10 bg-background/30">
//                           <iframe src={m.payload as string} title="Resume preview" className="w-full h-64" loading="lazy" />
//                         </div>
//                         <div className="mt-2 flex gap-3">
//                           <a href="/resume.pdf" download className="text-xs underline">Download PDF</a>
//                           <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="text-xs underline">Open full</a>
//                         </div>
//                       </div>
//                     )}

//                     {m.kind === "contact-form" && (
//                       <form
//                         className="mt-3 space-y-2"
//                         onSubmit={async (e) => {
//                           e.preventDefault();
//                           setFormStatusById((prev) => ({ ...prev, [m.id]: 'sending' }));
//                           try {
//                             await sendEmail(e as any);
//                             setFormStatusById((prev) => ({ ...prev, [m.id]: 'sent' }));
//                             toast({ title: 'Message sent!', description: 'Thanks for reaching out.' });
//                           } catch (err) {
//                             setFormStatusById((prev) => ({ ...prev, [m.id]: 'error' }));
//                             toast({ title: 'Failed to send', description: 'Please try again.', variant: 'destructive' });
//                             console.error('EmailJS error (chat):', err);
//                           }
//                         }}
//                       >
//                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
//                           <Input name="from_name" placeholder="Your name" required />
//                           <Input name="reply_to" type="email" placeholder="Your email (optional)" />
//                         </div>
//                         <Textarea name="message" placeholder="Type your message..." required />
//                         <div className="flex items-center gap-2">
//                           <Button type="submit" size="sm" disabled={formStatusById[m.id] === 'sending'}>
//                             <Send className="w-4 h-4 mr-1" />
//                             {formStatusById[m.id] === 'sending' ? 'Sending...' : 'Send message'}
//                           </Button>
//                           {formStatusById[m.id] === 'sent' && (
//                             <span className="text-xs text-green-500">Sent!</span>
//                           )}
//                           {formStatusById[m.id] === 'error' && (
//                             <span className="text-xs text-red-500">Failed. Try again.</span>
//                           )}
//                         </div>
//                       </form>
//                     )}

//                     {m.cta === "contact" && (
//                       <div className="mt-2">
//                         <Button size="sm" variant="outline" onClick={handleContactCTA}>
//                           <Mail className="w-4 h-4 mr-2" /> Contact
//                         </Button>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               ))}

//               {typing && (
//                 <div className="flex justify-start">
//                   <div className="max-w-[85%] rounded-2xl px-3 py-2 text-sm bg-white/10 text-white">
//                     <div className="flex space-x-1">
//                       <div className="w-2 h-2 rounded-full bg-white animate-bounce"></div>
//                       <div className="w-2 h-2 rounded-full bg-white animate-bounce" style={{ animationDelay: '0.2s' }}></div>
//                       <div className="w-2 h-2 rounded-full bg-white animate-bounce" style={{ animationDelay: '0.4s' }}></div>
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {messages.length === 0 && !typing && (
//                 <div className="text-sm text-muted-foreground">Start a conversation…</div>
//               )}
//             </div>

//             {/* Input */}
//             <div className="p-3 pb-[env(safe-area-inset-bottom)] border-t border-white/10 sticky bottom-0 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
//               <div className="flex items-center gap-2">
//                 <Input
//                   value={input}
//                   onChange={(e) => setInput(e.target.value)}
//                   onKeyDown={handleKeyDown}
//                   placeholder="Ask about skills, projects, contact…"
//                   disabled={typing}
//                 />
//                 {speechSupported && (
//                   <Button 
//                     type="button" 
//                     variant={isListening ? "default" : "outline"} 
//                     size="icon" 
//                     onClick={toggleListening}
//                     disabled={typing}
//                     aria-label={isListening ? "Stop listening" : "Start voice input"}
//                     className={isListening ? "animate-pulse" : ""}
//                   >
//                     <Mic className="w-4 h-4" />
//                   </Button>
//                 )}
//                 <Button onClick={sendMessage} disabled={typing || !input.trim()}>
//                   <Send className="w-4 h-4 mr-1" />
//                   Send
//                 </Button>
//               </div>
//               <div className="mt-2 text-[11px] text-muted-foreground">
//                 {speechSupported 
//                   ? "Click the microphone icon to use voice input. I'll automatically respond when you stop speaking."
//                   : "For non-profile questions, I'll offer a quick contact option."
//                 }
//                 {isListening && (
//                   <span className="ml-2 text-accent animate-pulse">Listening...</span>
//                 )}
//               </div>
//             </div>
//           </div>
//         </SheetContent>
//       </Sheet>
//     </>
//   );
// };

// export default ChatbotFab;
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MessageCircle, Send, X, Bot, Mail, Github, Linkedin, Youtube, Twitter, ExternalLink, Mic, Volume2 } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useTheme } from "@/contexts/ThemeContext";
import { useToast } from "@/hooks/use-toast";
import { sendEmail } from "@/utils/sendEmail";
import {
  getProfile,
  getProjects,
  getSkills,
  getEducation,
  getCertificates,
  getContact,
  getSocialLinks,
  Project,
  Skill,
  Education,
  Certificate,
  SocialLink,
} from "@/services/storageService";

interface ChatMessage {
  id: string;
  role: "assistant" | "user";
  content: string;
  cta?: "contact";
  kind?: "projects" | "certificates" | "skills" | "resume" | "socials" | "contact-form" | "email" | "education-link";
  payload?: any[] | string;
}

// Speech recognition types
declare global {
  interface Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
  }
}

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognitionResultList {
  [index: number]: SpeechRecognitionResult;
  length: number;
}

interface SpeechRecognitionResult {
  [index: number]: SpeechRecognitionAlternative;
  length: number;
  isFinal: boolean;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

const ChatbotFab = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [typing, setTyping] = useState(false);
  const { theme } = useTheme();
  const navigate = useNavigate();
  const listRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const [formStatusById, setFormStatusById] = useState<Record<string, 'idle' | 'sending' | 'sent' | 'error'>>({});
  
  // Voice assistance states
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const recognitionRef = useRef<any>(null);
  const synthesisRef = useRef<SpeechSynthesis | null>(null);

  // Welcome animation states
  const [showWelcome, setShowWelcome] = useState(true);
  const [welcomeShrinking, setWelcomeShrinking] = useState(false);

  const profile = useMemo(() => getProfile(), []);
  const projects = useMemo(() => getProjects(), []);
  const skills = useMemo(() => getSkills(), []);
  const education = useMemo(() => getEducation(), []);
  const certificates = useMemo(() => getCertificates(), []);
  const contact = useMemo(() => getContact(), []);
  const socials = useMemo(() => getSocialLinks(), []);

  // Welcome animation effect
  useEffect(() => {
    const welcomeTimer = setTimeout(() => {
      setWelcomeShrinking(true);
      
      const hideTimer = setTimeout(() => {
        setShowWelcome(false);
      }, 1000);
      
      return () => clearTimeout(hideTimer);
    }, 3000);
    
    return () => clearTimeout(welcomeTimer);
  }, []);

  // Check if speech recognition and synthesis are supported
  useEffect(() => {
    const speechRecognitionSupported = 
      'SpeechRecognition' in window || 'webkitSpeechRecognition' in window;
    const speechSynthesisSupported = 'speechSynthesis' in window;
    
    setSpeechSupported(speechRecognitionSupported && speechSynthesisSupported);
    
    if (speechRecognitionSupported) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';
      
      recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = Array.from(event.results)
          .map(result => result[0])
          .map(result => result.transcript)
          .join('');
        
        setInput(transcript);
        
        // Check if this is the final result (user stopped speaking)
        const isFinal = event.results[0].isFinal;
        if (isFinal && transcript.trim().length > 0) {
          // Auto-submit after a brief delay
          setTimeout(() => {
            sendMessageFromVoice(transcript);
          }, 500);
        }
      };
      
      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
      
      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
        toast({
          title: "Speech recognition error",
          description: `Error: ${event.error}`,
          variant: "destructive"
        });
      };
    }
    
    if (speechSynthesisSupported) {
      synthesisRef.current = window.speechSynthesis;
      
      // Preload voices
      setTimeout(() => {
        const voices = synthesisRef.current?.getVoices();
        console.log("Available voices:", voices?.map(v => v.name));
      }, 1000);
    }
  }, [toast]);

  useEffect(() => {
    if (!open) return;
    if (messages.length === 0) {
      setMessages([
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: "Hi! I'm Sagar Shegunashi's assistant. Ask me about his skills, projects, education, or how to contact him.",
        },
      ]);
    }
  }, [open]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  // Toggle speech recognition
  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
        setInput(""); // Clear input when starting to listen
      } catch (error) {
        console.error("Speech recognition start error:", error);
        toast({
          title: "Microphone access needed",
          description: "Please allow microphone access to use voice input.",
          variant: "destructive"
        });
      }
    }
  };

  // Speak text using text-to-speech with female voice
  const speakText = (text: string) => {
    if (!synthesisRef.current) return;
    
    // Cancel any ongoing speech
    synthesisRef.current.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Try to find a female voice
    const voices = synthesisRef.current.getVoices();
    const femaleVoice = voices.find(voice => 
      voice.name.includes('Female') || 
      voice.name.includes('Woman') || 
      voice.name.includes('Zira') || 
      voice.name.includes('Samantha') ||
      voice.name.includes('Karen') || // Australian female voice
      voice.name.includes('Tessa') || // South African female voice
      voice.name.includes('Veena') || // Indian English female voice
      voice.name.includes('Raveena') // Indian English female voice
    );
    
    if (femaleVoice) {
      utterance.voice = femaleVoice;
    }
    
    utterance.rate = 0.9;
    utterance.pitch = 1.1; // Slightly higher pitch for female voice
    utterance.volume = 0.8;
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    
    synthesisRef.current.speak(utterance);
  };

  // Stop speaking
  const stopSpeaking = () => {
    if (synthesisRef.current) {
      synthesisRef.current.cancel();
      setIsSpeaking(false);
    }
  };

  const handleContactCTA = () => {
    setOpen(false);
    navigate("/", { replace: false });
    setTimeout(() => {
      const el = document.getElementById("contact");
      el?.scrollIntoView({ behavior: "smooth" });
    }, 200);
  };

  const answerQuestion = (q: string): ChatMessage => {
    const text = q.toLowerCase();

    const reply = (
      content: string,
      options?: { cta?: "contact"; kind?: ChatMessage["kind"]; payload?: ChatMessage["payload"] }
    ): ChatMessage => ({
      id: crypto.randomUUID(),
      role: "assistant",
      content,
      cta: options?.cta,
      kind: options?.kind,
      payload: options?.payload,
    });

    if (/(who are you|what's your name|your name|name\??)/.test(text)) {
      return reply(`His name is ${profile.name}. I'm his AI assistant, here to help.`);
    }

    if (/(current|currently|doing now|up to|status|what's up|what are you up to)/.test(text)) {
      return reply(`${profile.name} is in his final year and actively open to work opportunities.`);
    }

    if (/(email|gmail|contact|reach|message|send (a )?message|like)/.test(text)) {
      return reply(`You can contact ${profile.name} at ${contact.email}. Compose a message below or use quick links.`, { kind: "contact-form" });
    }

    if (/(gmail app|open gmail|compose)/.test(text)) {
      return reply(`Quick links to contact ${profile.name}`, { kind: "email", payload: contact.email });
    }

    if (/(social|linkedin|github|youtube|twitter|\bx\b)/.test(text)) {
      return reply("Social profiles:", { kind: "socials", payload: socials });
    }

    if (/(where|location|based)/.test(text)) {
      return reply(`${profile.name} is based in ${contact.location || profile.location || "Bengaluru"}.`);
    }

    if (/(better|best|strong|expert|proficient).*(skill|tools|stack)|\bhtml\b|\bcss\b|\bjava\b/.test(text)) {
      return reply("Strongest skills: HTML, CSS, and Java. Also experienced with JavaScript and UI/UX.");
    }

    if (/interest|hobbies?/.test(text)) {
      return reply("Top interests: Web Development, Software Development, and Jr Software Engineer roles.");
    }

    if (/skill|skills|stack|skull|skulls|his learnings|tech|tools/.test(text)) {
      const top = skills.slice(0, 10).map((s: Skill) => s.name).join(", ");
      return reply(`Key skills: ${top}. Tap a skill to see related projects.`, { kind: "skills", payload: skills });
    }

    if (/project|work|portfolio/.test(text)) {
      return reply("Here are Sagar Shegunashi's projects. Swipe to explore.", {
        kind: "projects",
        payload: projects,
      });
    }

    if (/certificates?|certificates|certi|Certification|Certifications|achiev/.test(text)) {
      return reply("Certificates — swipe to see all.", {
        kind: "certificates",
        payload: certificates,
      });
    }

    if (/education|college|degree|stud|branch|graduate|graduation|when started|start year|end year/.test(text)) {
      const e = education[0] as Education | undefined;
      if (e) {
        const start = new Date(e.startDate).toLocaleString("en-US", { month: "short", year: "numeric" });
        const end = new Date(e.endDate).toLocaleString("en-US", { month: "short", year: "numeric" });
        const maps = `https://www.google.com/maps?q=${encodeURIComponent(e.institution + ' Bangalore')}`;
        return reply(`${e.degree} in ${e.field} at ${e.institution} (${start}–${end}).`, { kind: "education-link", payload: maps });
      }
      return reply("Education details are not available right now.");
    }
    
    if(/hi|hello|hey|greetings|sup|yo|good morning|good afternoon|good evening/.test(text)) {
      const greetings = ["Hi", "Hello", "Hey", "Greetings", "Yo"];
      const greet = greetings[Math.floor(Math.random() * greetings.length)];
      return reply(`${greet}! Ask me anything about Sagar Shegunashi's skills, projects, or contact info.`);
    }

    if (text.length > 200) {
      return reply("That's quite a long message! Could you please shorten it or ask something specific about Sagar?");
    }
    
    if (/(wife)/.test(text)) {
      return reply("Nimmi 🩵.");
    }
    
    if (/resume|cv|resame|rezume|bio|biodata|Bio-data|Bio/.test(text)) {
      return reply("Here is a quick resume preview.", { kind: "resume", payload: `${window.location.origin}/resume.pdf#toolbar=1&view=FitH` });
    }
    
    if (/thank|Thanks|Thank you|Okay|ok|OK|k|K/.test(text)) {
      return reply("You're welcome! Feel free to ask anything else about Sagar.");
    }
    
    return reply(
      "I can help with Sagar Shegunashi's profile, skills, projects, certificates, resume, or contact details. For other questions, send a quick message below.",
      { cta: "contact" }
    );
  };

  const streamAssistantMessage = (msg: ChatMessage) => {
    const newId = crypto.randomUUID();
    const base: ChatMessage = { ...msg, id: newId, content: "" };
    setMessages((prev) => [...prev, base]);
    setTyping(true);

    const text = msg.content || "";
    let i = 0;
    const interval = setInterval(() => {
      i += 1;
      setMessages((prev) => prev.map((m) => (m.id === newId ? { ...m, content: text.slice(0, i) } : m)));
      if (i >= text.length) {
        clearInterval(interval);
        setTyping(false);
        
        // Speak the response when it's complete
        if (speechSupported) {
          speakText(text);
        }
      }
    }, 18);
  };

  const showProjectsForSkill = (skillName: string) => {
    const filtered = projects.filter((p) => p.tags?.some((t) => t.toLowerCase() === skillName.toLowerCase()));
    if (filtered.length > 0) {
      streamAssistantMessage({
        id: crypto.randomUUID(),
        role: "assistant",
        content: `Projects using ${skillName}:`,
        kind: "projects",
        payload: filtered,
      });
    } else {
      streamAssistantMessage({
        id: crypto.randomUUID(),
        role: "assistant",
        content: `No projects found for ${skillName}. More projects coming soon. For more details, contact me.`,
        cta: "contact",
      });
    }
  };

  const sendMessage = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    const userMsg: ChatMessage = { id: crypto.randomUUID(), role: "user", content: trimmed };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    const aiMsg = answerQuestion(trimmed);
    // slight delay for more natural feel
    setTimeout(() => streamAssistantMessage(aiMsg), 250);
  };

  // Send message from voice input
  const sendMessageFromVoice = (transcript: string) => {
    const userMsg: ChatMessage = { id: crypto.randomUUID(), role: "user", content: transcript };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    const aiMsg = answerQuestion(transcript);
    // slight delay for more natural feel
    setTimeout(() => streamAssistantMessage(aiMsg), 250);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  };

  const SocialIcon = ({ platform, className = "w-4 h-4" }: { platform: string; className?: string }) => {
    const p = platform.toLowerCase();
    if (p.includes("github")) return <Github className={className} />;
    if (p.includes("linkedin")) return <Linkedin className={className} />;
    if (p.includes("youtube")) return <Youtube className={className} />;
    if (p.includes("twitter") || p === "x") return <Twitter className={className} />;
    if (p.includes("mail") || p.includes("email") || p.includes("gmail")) return <Mail className={className} />;
    return <ExternalLink className={className} />;
  };

  const gmailComposeFor = (email: string) => `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}`;

  return (
    <>
      {/* Welcome Animation - Positioned at bottom right */}
      {showWelcome && (
        <div 
          className={`fixed bottom-6 right-6 z-50 flex items-center justify-center transition-all duration-1000 ${
            welcomeShrinking 
              ? "scale-0 opacity-0 translate-y-10" 
              : "scale-100 opacity-100"
          }`}
          style={{
            transitionTimingFunction: welcomeShrinking ? "cubic-bezier(0.4, 0, 1, 1)" : "cubic-bezier(0, 0, 0.2, 1)"
          }}
        >
          <div className="flex flex-col items-center">
            <div className="mb-2 flex justify-center">
              <img 
                src="src/components/robot.gif" 
                alt="Welcome Robot" 
                className={`w-35 h-35 object-contain transition-all duration-1000 ${
                  welcomeShrinking ? "scale-50" : "scale-100"
                }`}
                onError={(e) => {
                  // Fallback to static icon if GIF fails to load
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='50' height='50' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M12 8V4H8'/%3E%3Crect width='16' height='12' x='4' y='8' rx='2'/%3E%3Cpath d='M2 14h2'/%3E%3Cpath d='M20 14h2'/%3E%3Cpath d='M15 13v2'/%3E%3Cpath d='M9 13v2'/%3E%3C/svg%3E";
                }}
              />
            </div>
            <div className={`text-center transition-all duration-500 ${welcomeShrinking ? "opacity-0 h-0" : "opacity-100 h-auto"}`}>
              <h2 className="text-sm font-bold mb-1 text-foreground">Hi, I'm Sagar's Assistant!</h2>
              <p className="text-xs text-muted-foreground">Welcome to the portfolio. Ask me anything!</p>
            </div>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        aria-label="Open AI Chatbot"
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-40 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300 focus:outline-none focus:ring-2 focus:ring-accent"
        style={{
          width: 56,
          height: 56,
          background:
            theme === "dark"
              ? "linear-gradient(135deg, hsl(var(--accent)), hsl(var(--primary)))"
              : "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)))",
        }}
      >
        <Bot className="w-6 h-6 text-white mx-auto" />
      </button>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="right" className="w-[min(480px,100vw)] h-[100svh] p-0 flex flex-col">
          <div className="flex h-full flex-col">
            <SheetHeader className="px-4 py-3 border-b border-white/10">
              <div className="flex items-center justify-between">
                <div>
                  <SheetTitle>Ask about Sagar</SheetTitle>
                  <SheetDescription className="sr-only">Chat assistant to explore Sagar's profile, skills, projects, and contact options.</SheetDescription>
                </div>
                <div className="flex items-center gap-2">
                  {/* Voice controls */}
                  {speechSupported && (
                    <>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={isSpeaking ? stopSpeaking : () => speakText(messages.filter(m => m.role === 'assistant').pop()?.content || '')}
                        disabled={messages.filter(m => m.role === 'assistant').length === 0}
                        aria-label={isSpeaking ? "Stop speaking" : "Read last message"}
                      >
                        <Volume2 className={`w-4 h-4 ${isSpeaking ? "text-accent animate-pulse" : ""}`} />
                      </Button>
                      <Button
                        variant={isListening ? "default" : "ghost"}
                        size="icon"
                        onClick={toggleListening}
                        aria-label={isListening ? "Stop listening" : "Start voice input"}
                      >
                        <Mic className={`w-4 h-4 ${isListening ? "animate-pulse" : ""}`} />
                      </Button>
                    </>
                  )}
                  <Button variant="ghost" size="icon" onClick={() => setOpen(false)} aria-label="Close">
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </SheetHeader>

            {/* Messages */}
            <div ref={listRef} className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((m) => (
                <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`${m.kind ? "w-full" : "max-w-[85%]"} rounded-2xl px-3 py-2 text-sm whitespace-pre-wrap ${
                      m.role === "user"
                        ? "bg-accent text-white"
                        : theme === "dark"
                        ? "bg-white/10 text-white"
                        : "bg-white text-foreground shadow"
                    }`}
                  >
                    <div>{m.content}</div>

                    {m.kind === "projects" && Array.isArray(m.payload) && (
                      <div className="mt-3 -mx-1">
                        <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory pb-2">
                          {(m.payload as Project[]).map((p) => (
                            <a
                              key={p.id}
                              href={p.url || p.github || "#"}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="snap-start min-w-[220px] bg-background/30 rounded-xl border border-white/10 hover:border-accent/50 transition-colors p-3"
                            >
                              <div className="h-24 w-full rounded-lg overflow-hidden mb-2 bg-muted">
                                <img src={p.image || "/placeholder.svg"} alt={p.title} loading="lazy" className="w-full h-full object-cover" />
                              </div>
                              <div className="font-medium text-sm line-clamp-1">{p.title}</div>
                              <div className="text-xs text-muted-foreground line-clamp-2">{p.description}</div>
                            </a>
                          ))}
                        </div>
                      </div>
                    )}

                    {m.kind === "certificates" && Array.isArray(m.payload) && (
                      <div className="mt-3 -mx-1">
                        <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory pb-2">
                          {(m.payload as Certificate[]).map((c) => (
                            <div key={c.id} className="snap-start min-w-[220px] bg-background/30 rounded-xl border border-white/10 p-3">
                              <div className="h-24 w-full rounded-lg overflow-hidden mb-2 bg-muted">
                                <img src={c.image || "/placeholder.svg"} alt={c.title} loading="lazy" className="w-full h-full object-cover" />
                              </div>
                              <div className="font-medium text-sm line-clamp-1">{c.title}</div>
                              <div className="text-xs text-muted-foreground line-clamp-1">{c.issuer}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {m.kind === "skills" && Array.isArray(m.payload) && (
                      <div className="mt-3">
                        <div className="flex flex-wrap gap-2">
                          {(m.payload as Skill[]).map((s) => (
                            <Button
                              key={s.id}
                              size="sm"
                              variant="secondary"
                              onClick={() => showProjectsForSkill(s.name)}
                              className="rounded-full"
                              aria-label={`Show projects using ${s.name}`}
                            >
                              {s.name}
                            </Button>
                          ))}
                        </div>
                      </div>
                    )}

                    {m.kind === "socials" && Array.isArray(m.payload) && (
                      <div className="mt-3">
                        <div className="flex flex-wrap gap-2">
                          {(m.payload as SocialLink[]).map((s) => (
                            <a
                              key={s.id}
                              href={s.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 hover:border-accent/50 transition-colors"
                            >
                              <SocialIcon platform={s.platform} />
                              <span className="text-xs">{s.platform}</span>
                            </a>
                          ))}
                        </div>
                      </div>
                    )}

                    {m.kind === "email" && typeof m.payload === "string" && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        <a
                          href={gmailComposeFor(m.payload)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent text-white hover:opacity-90"
                        >
                          <Mail className="w-4 h-4" /> Gmail
                        </a>
                        <a
                          href={`mailto:${m.payload}`}
                          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10"
                        >
                          <Mail className="w-4 h-4" /> Email
                        </a>
                      </div>
                    )}

                    {m.kind === "education-link" && typeof m.payload === "string" && (
                      <div className="mt-3">
                        <a
                          href={m.payload as string}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent text-white hover:opacity-90"
                        >
                          <ExternalLink className="w-4 h-4" /> Open College Location
                        </a>
                      </div>
                    )}

                    {m.kind === "resume" && typeof m.payload === "string" && (
                      <div className="mt-3">
                        <div className="rounded-lg overflow-hidden border border-white/10 bg-background/30">
                          <iframe src={m.payload as string} title="Resume preview" className="w-full h-64" loading="lazy" />
                        </div>
                        <div className="mt-2 flex gap-3">
                          <a href="/resume.pdf" download className="text-xs underline">Download PDF</a>
                          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="text-xs underline">Open full</a>
                        </div>
                      </div>
                    )}

                    {m.kind === "contact-form" && (
                      <form
                        className="mt-3 space-y-2"
                        onSubmit={async (e) => {
                          e.preventDefault();
                          setFormStatusById((prev) => ({ ...prev, [m.id]: 'sending' }));
                          try {
                            await sendEmail(e as any);
                            setFormStatusById((prev) => ({ ...prev, [m.id]: 'sent' }));
                            toast({ title: 'Message sent!', description: 'Thanks for reaching out.' });
                          } catch (err) {
                            setFormStatusById((prev) => ({ ...prev, [m.id]: 'error' }));
                            toast({ title: 'Failed to send', description: 'Please try again.', variant: 'destructive' });
                            console.error('EmailJS error (chat):', err);
                          }
                        }}
                      >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          <Input name="from_name" placeholder="Your name" required />
                          <Input name="reply_to" type="email" placeholder="Your email (optional)" />
                        </div>
                        <Textarea name="message" placeholder="Type your message..." required />
                        <div className="flex items-center gap-2">
                          <Button type="submit" size="sm" disabled={formStatusById[m.id] === 'sending'}>
                            <Send className="w-4 h-4 mr-1" />
                            {formStatusById[m.id] === 'sending' ? 'Sending...' : 'Send message'}
                          </Button>
                          {formStatusById[m.id] === 'sent' && (
                            <span className="text-xs text-green-500">Sent!</span>
                          )}
                          {formStatusById[m.id] === 'error' && (
                            <span className="text-xs text-red-500">Failed. Try again.</span>
                          )}
                        </div>
                      </form>
                    )}

                    {m.cta === "contact" && (
                      <div className="mt-2">
                        <Button size="sm" variant="outline" onClick={handleContactCTA}>
                          <Mail className="w-4 h-4 mr-2" /> Contact
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {typing && (
                <div className="flex justify-start">
                  <div className="max-w-[85%] rounded-2xl px-3 py-2 text-sm bg-white/10 text-white">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 rounded-full bg-white animate-bounce"></div>
                      <div className="w-2 h-2 rounded-full bg-white animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 rounded-full bg-white animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                </div>
              )}

              {messages.length === 0 && !typing && (
                <div className="text-sm text-muted-foreground">Start a conversation…</div>
              )}
            </div>

            {/* Input */}
            <div className="p-3 pb-[env(safe-area-inset-bottom)] border-t border-white/10 sticky bottom-0 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <div className="flex items-center gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about skills, projects, contact…"
                  disabled={typing}
                />
                {speechSupported && (
                  <Button 
                    type="button" 
                    variant={isListening ? "default" : "outline"} 
                    size="icon" 
                    onClick={toggleListening}
                    disabled={typing}
                    aria-label={isListening ? "Stop listening" : "Start voice input"}
                    className={isListening ? "animate-pulse" : ""}
                  >
                    <Mic className="w-4 h-4" />
                  </Button>
                )}
                <Button onClick={sendMessage} disabled={typing || !input.trim()}>
                  <Send className="w-4 h-4 mr-1" />
                  Send
                </Button>
              </div>
              <div className="mt-2 text-[11px] text-muted-foreground">
                {speechSupported 
                  ? "Click the microphone icon to use voice input. I'll automatically respond when you stop speaking."
                  : "For non-profile questions, I'll offer a quick contact option."
                }
                {isListening && (
                  <span className="ml-2 text-accent animate-pulse">Listening...</span>
                )}
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default ChatbotFab;
