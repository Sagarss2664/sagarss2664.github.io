import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MessageCircle, Send, X, Bot, Mail, Github, Linkedin, Youtube, Twitter, ExternalLink } from "lucide-react";
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

  const profile = useMemo(() => getProfile(), []);
  const projects = useMemo(() => getProjects(), []);
  const skills = useMemo(() => getSkills(), []);
  const education = useMemo(() => getEducation(), []);
  const certificates = useMemo(() => getCertificates(), []);
  const contact = useMemo(() => getContact(), []);
  const socials = useMemo(() => getSocialLinks(), []);

  useEffect(() => {
    if (!open) return;
    if (messages.length === 0) {
      setMessages([
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content:
            `Hi! I'm Sagar Shegunashi's assistant. Ask me about his skills, projects, education, or how to contact him.`,
        },
      ]);
    }
  }, [open]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

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

    if (/(email|gmail|contact|reach|message|send (a )?message)/.test(text)) {
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

    if (/skill|stack|tech|tools/.test(text)) {
      const top = skills.slice(0, 10).map((s: Skill) => s.name).join(", ");
      return reply(`Key skills: ${top}. Tap a skill to see related projects.`, { kind: "skills", payload: skills });
    }

    if (/project|work|portfolio/.test(text)) {
      return reply("Here are Sagar Shegunashi's projects. Swipe to explore.", {
        kind: "projects",
        payload: projects,
      });
    }

    if (/certificates?|achiev/.test(text)) {
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

    if (/resume|cv/.test(text)) {
      return reply("Here is a quick resume preview.", { kind: "resume", payload: `${window.location.origin}/resume.pdf#toolbar=1&view=FitH` });
    }

    return reply(
      "I can help with Sagar's profile, skills, projects, certificates, resume, or contact details. For other questions, send a quick message below.",
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
      {/* Floating Button */}
      <button
        aria-label="Open AI Chatbot"
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300 focus:outline-none focus:ring-2 focus:ring-accent"
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
                  <SheetDescription className="sr-only">Chat assistant to explore Sagar’s profile, skills, projects, and contact options.</SheetDescription>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setOpen(false)} aria-label="Close">
                  <X className="w-4 h-4" />
                </Button>
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
                />
                <Button onClick={sendMessage}>
                  <Send className="w-4 h-4 mr-1" />
                  Send
                </Button>
              </div>
              <div className="mt-2 text-[11px] text-muted-foreground">
                For non-profile questions, I’ll offer a quick contact option.
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default ChatbotFab;
