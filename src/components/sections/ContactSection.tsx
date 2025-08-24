import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { sendContactEmail } from '@/utils/sendEmail';
import { useToast } from "@/hooks/use-toast";
import { Mail, MapPin, Phone, Send, CheckCircle2, Calendar, Clock } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

const ContactSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setIsSuccess(false);
    
    try {
      await sendContactEmail(e);
      
      setIsSuccess(true);
      toast({
        title: "Message sent successfully!",
        description: "Thank you for your message. I'll get back to you soon.",
      });
      
      // Reset form
      const form = e.target as HTMLFormElement;
      form.reset();
      
    } catch (error) {
      console.error("Email sending error:", error);
      
      toast({
        title: "Failed to send message",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <SectionHeading
          title="Get in Touch"
          subtitle="Have a question or want to work together? Send me a message."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <motion.div
            className="glass-card rounded-lg p-6 h-full"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-6 text-foreground">Contact Information</h3>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-primary/10 p-3 rounded-full mr-4">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Email</h4>
                  <p className="text-muted-foreground">sagarshegunasi2664@gmail.com</p>
                  <a 
                    href="mailto:sagarshegunasi2664@gmail.com" 
                    className="text-primary hover:underline mt-1 inline-block"
                  >
                    Send an email
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-primary/10 p-3 rounded-full mr-4">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Phone</h4>
                  <p className="text-muted-foreground">+91 8904646173</p>
                  <a 
                    href="tel:+918904646173" 
                    className="text-primary hover:underline mt-1 inline-block"
                  >
                    Call now
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-primary/10 p-3 rounded-full mr-4">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Location</h4>
                  <p className="text-muted-foreground">India</p>
                  <p className="text-muted-foreground">Open to remote work</p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-border">
              <h4 className="font-semibold text-foreground mb-3 flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                Response Time
              </h4>
              <p className="text-muted-foreground">
                I typically respond to emails within 24 hours. For urgent matters, 
                please call or use the contact form.
              </p>
            </div>

            <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/10">
              <h4 className="font-semibold text-foreground mb-2 flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                Availability
              </h4>
              <p className="text-muted-foreground text-sm">
                Currently available for freelance projects and full-time opportunities. 
                Let's discuss how I can help bring your ideas to life!
              </p>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            className="glass-card rounded-lg p-6 h-full relative"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            {isSuccess && (
              <motion.div 
                className="absolute inset-0 bg-background/90 backdrop-blur-sm flex items-center justify-center rounded-lg z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <motion.div 
                  className="text-center p-6"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                >
                  <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-foreground mb-2">Message Sent!</h3>
                  <p className="text-muted-foreground mb-4">
                    Thank you for your message. I've sent a confirmation to your email.
                  </p>
                  <Button onClick={() => setIsSuccess(false)}>
                    Send Another Message
                  </Button>
                </motion.div>
              </motion.div>
            )}
            
            <h3 className="text-2xl font-bold mb-6 text-foreground">Send a Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="from_name" className="text-foreground">Your Name *</Label>
                <Input
                  id="from_name"
                  name="from_name"
                  type="text"
                  required
                  disabled={isSubmitting}
                  placeholder="Enter your full name"
                  className="bg-background/50"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="reply_to" className="text-foreground">Your Email *</Label>
                <Input
                  id="reply_to"
                  name="reply_to"
                  type="email"
                  required
                  disabled={isSubmitting}
                  placeholder="Enter your email address"
                  className="bg-background/50"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message" className="text-foreground">Message *</Label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  disabled={isSubmitting}
                  placeholder="Tell me about your project or question..."
                  className="bg-background/50 resize-none"
                />
              </div>
              
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full py-3 mt-2"
                  size="lg"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </>
                  )}
                </Button>
              </motion.div>
              
              <p className="text-xs text-muted-foreground mt-4 text-center">
                * Required fields. You'll receive a confirmation email after submitting.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;