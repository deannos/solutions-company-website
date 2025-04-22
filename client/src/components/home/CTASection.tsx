import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertContactMessageSchema } from "@shared/schema";
import { z } from "zod";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

const contactFormSchema = insertContactMessageSchema.extend({
  email: z.string().email("Please enter a valid email address"),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function CTASection() {
  const [isContactDialogOpen, setIsContactDialogOpen] = useState(false);
  const [isConsultationDialogOpen, setIsConsultationDialogOpen] =
    useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      phone: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    try {
      const response = await apiRequest("POST", "/api/contact", data);
      if (response.ok) {
        toast({
          title: "Message Sent",
          description:
            "Thank you for contacting us. We'll get back to you soon.",
          variant: "default",
        });
        setIsContactDialogOpen(false);
        setIsConsultationDialogOpen(false);
        form.reset();
      }
    } catch (error) {
      toast({
        title: "Error",
        description:
          "There was a problem sending your message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <section className="py-20 bg-gradient-to-r from-[#000000] to-[#333333] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Accelerate Your Digital Journey?
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
            Partner with DWS to unlock innovation and drive business
            transformation that delivers tangible results.
          </p>
          <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-6">
            <button
              className="bg-[#E31937] text-white px-8 py-3 rounded-full font-medium hover:bg-red-700 transition-colors"
              onClick={() => setIsContactDialogOpen(true)}
              id="contact"
            >
              Contact Us
            </button>
            <button
              className="border-2 border-[#00A0DF] text-[#00A0DF] px-8 py-3 rounded-full font-medium hover:bg-[#00A0DF] hover:text-black transition-colors"
              onClick={() => setIsConsultationDialogOpen(true)}
            >
              Schedule a Consultation
            </button>
          </div>
        </div>
      </section>

      {/* Contact Dialog */}
      <Dialog open={isContactDialogOpen} onOpenChange={setIsContactDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Contact Us</DialogTitle>
            <DialogDescription>
              Fill out the form below and our team will get back to you shortly.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  placeholder="Your name"
                  {...form.register("name")}
                />
                {form.formState.errors.name && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.name.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Your email"
                  {...form.register("email")}
                />
                {form.formState.errors.email && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.email.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  placeholder="Your company"
                  {...form.register("company")}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  placeholder="Your phone number"
                  {...form.register("phone")}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message *</Label>
                <Textarea
                  id="message"
                  placeholder="How can we help you?"
                  rows={4}
                  {...form.register("message")}
                />
                {form.formState.errors.message && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.message.message}
                  </p>
                )}
              </div>
            </div>

            <DialogFooter>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Consultation Dialog */}
      <Dialog
        open={isConsultationDialogOpen}
        onOpenChange={setIsConsultationDialogOpen}
      >
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Schedule a Consultation</DialogTitle>
            <DialogDescription>
              Tell us about your business challenges and our experts will
              schedule a personalized consultation.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="consultation-name">Full Name *</Label>
                <Input
                  id="consultation-name"
                  placeholder="Your name"
                  {...form.register("name")}
                />
                {form.formState.errors.name && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.name.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="consultation-email">Email *</Label>
                <Input
                  id="consultation-email"
                  type="email"
                  placeholder="Your email"
                  {...form.register("email")}
                />
                {form.formState.errors.email && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.email.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="consultation-company">Company</Label>
                <Input
                  id="consultation-company"
                  placeholder="Your company"
                  {...form.register("company")}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="consultation-phone">Phone</Label>
                <Input
                  id="consultation-phone"
                  placeholder="Your phone number"
                  {...form.register("phone")}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="consultation-message">
                  Business Challenges *
                </Label>
                <Textarea
                  id="consultation-message"
                  placeholder="Describe your business challenges and preferred consultation time"
                  rows={4}
                  {...form.register("message")}
                />
                {form.formState.errors.message && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.message.message}
                  </p>
                )}
              </div>
            </div>

            <DialogFooter>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Schedule Consultation"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
