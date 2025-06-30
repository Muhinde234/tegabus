import { MailOpen, MapPin, Phone } from "lucide-react";
import Container from "./container";
import {Button} from "../ui/button";
import { Input } from "./inputField";
import { Textarea } from "@/components/ui/textarea"

const Contact = () => {
  return (
    <div id="#contact ">
    
      <div className="  text-center mt-8 mb-16 sm:mt-20 md:mt-24">
        <h1 className="text-2xl sm:text-3xl font-extrabold">Get In Touch</h1>
      </div>

  
      <Container className="flex flex-col lg:flex-row justify-between items-start gap-12">
        
       
        <div className="flex flex-col gap-4 w-full lg:w-1/2 items-center text-center lg:items-start lg:text-left">
          <h1 className="text-lime-400 font-bold">CONTACT US</h1>
          <h1 className="text-2xl">Get In Touch with Us</h1>
          <form className="flex flex-col gap-4 mt-4 w-full max-w-md">
          
            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                type="text"
                placeholder="Your Name"
                className="border border-lime-400 rounded-md p-2 w-full"
              />
              <Input
                type="text"
                placeholder="Phone No"
                className="border border-lime-400 rounded-md p-2 w-full"
              />
            </div>

           
            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                type="text"
                placeholder="E-mail Address"
                className="border border-lime-400 rounded-md p-2 w-full"
              />
              <Input
                type="text"
                placeholder="Subject"
                className="border border-lime-400 rounded-md p-2 w-full"
              />
            </div>

           
            <Textarea
              placeholder="Message"
              className="border border-lime-400 rounded-md p-2 min-h-[120px] w-full"
            ></Textarea>

         
            <Button variant="ghost" className="bg-lime-400">
                
              Send Message
            </Button>
        
          </form>
        </div>

       
        <div className="w-full lg:w-1/2 flex flex-col items-center text-center lg:items-start lg:text-left">
          <p className="text-lg max-w-md">
            For inquiries, feedback, or assistance, feel free to reach out.
            We’re here to ensure your travel experience is smooth and enjoyable.
          </p>

          <div className="flex flex-col gap-8 mt-8 w-full max-w-md">
            <div className="space-y-6">

           
              <div className="flex gap-4 border-b border-dashed border-lime-400 pb-4">
                <Phone size={50} className="text-lime-400 hover:text-white hover:bg-lime-400 rounded-full p-3 transition" />
                <div className="flex flex-col gap-1">
                  <h1 className="text-gray-700 font-medium">Call us anytime</h1>
                  <p>(+250) 780 396 766</p>
                </div>
              </div>

              <div className="flex gap-4 border-b border-dashed border-lime-400 pb-4">
                <MailOpen size={50} className="text-lime-400 hover:text-white hover:bg-lime-400 rounded-full p-3 transition" />
                <div className="flex flex-col gap-1">
                  <h1 className="text-gray-700 font-medium">Email Us</h1>
                  <p>support@Tegabus.com</p>
                </div>
              </div>

            
              <div className="flex gap-4 border-b border-dashed border-lime-400 pb-4">
                <MapPin size={50} className="text-lime-400 hover:text-white hover:bg-lime-400 rounded-full p-3 transition" />
                <div className="flex flex-col gap-1">
                  <h1 className="text-gray-700 font-medium">Our Location</h1>
                  <p>Kigali, Rwanda</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Contact;
