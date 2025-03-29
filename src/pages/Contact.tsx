
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

const Contact = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast.success("Your message has been sent! We'll respond shortly.");
    form.reset();
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="pt-24 flex-grow">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-hospital-800 mb-4">
              Contact Us
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Have questions or need assistance? Our team is here to help you with any inquiries you may have.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-2xl font-display font-bold text-hospital-700 mb-6">Send Us a Message</h2>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Full Names" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input placeholder="youremail@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subject</FormLabel>
                        <FormControl>
                          <Input placeholder="How can we help you?" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Please provide details about your inquiry..." 
                            className="min-h-[150px]" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit" className="w-full bg-hospital-600 hover:bg-hospital-700">
                    Send Message <Send className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </Form>
            </div>
            
            <div>
              <div className="bg-gradient-to-r from-hospital-50 to-mint-50 p-8 rounded-xl shadow-sm mb-8">
                <h2 className="text-2xl font-display font-bold text-hospital-700 mb-6">Contact Information</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <MapPin className="h-6 w-6 text-hospital-500 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-gray-900">Location</h3>
                      <p className="text-gray-600">123 Healthcare Avenue, Medical District<br />Nairobi, Kenya</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <Phone className="h-6 w-6 text-hospital-500 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-gray-900">Phone</h3>
                      <p className="text-gray-600">Main: +254 700 520 008<br />Emergency: +254 733 443 224</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <Mail className="h-6 w-6 text-hospital-500 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-gray-900">Email</h3>
                      <p className="text-gray-600">info@medicareplus.com<br />appointments@medicareplus.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <Clock className="h-6 w-6 text-hospital-500 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-gray-900"> Open Hours</h3>
                      <p className="text-gray-600">
                        {/* Monday - Friday: 8:00 AM - 8:00 PM<br />
                        Saturday: 9:00 AM - 5:00 PM<br />
                        Sunday: 10:00 AM - 2:00 PM<br /> */}
                        <span className="text-hospital-600 font-medium">Emergency Care : 24/7</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>             
              
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
