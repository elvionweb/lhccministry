import React from "react";
import MinistryCard from "../components/ministries/MinistryCard";
import MinistryChatSupport from "../components/ministries/MinistryChatSupport";
import { motion } from "framer-motion";

// Updated ministries data to include meeting details, leader info, whatsapp links, and images.
// Please update the placeholder data (images, numbers, and names) with your actual data.
const ministriesData = [
  {
    id: 1,
    name: "Choir Ministry",
    description:
      "The choir ministry was created as a replica of the Levites in the Bible to worship God through songs, it ministry dedicated to serve God in the aspect of music in line with the vision of liberating souls and as a mediator from God to man through music.",
    meetingDay: "Saturdays",
    time: "4:00 PM - 6:00 PM",
    leaderName: "Mr Emmanuel",
    leaderContact: "+2347060482851",
    whatsappLink:
      "https://wa.me/2347060482851?text=Hello,%20I%20want%20to%20join%20the%20Choir%20Ministry",
    image: "/lhcc30.jpeg",
  },
  {
    id: 2,
    name: "Youth Ministry",
    description:
      "For easy access of the youth body. To give informations and other messages that concerns the youth. Also to bring the youth together in the fear and nurture of the Lord.",
    meetingDay: "Fridays",
    time: "6:00 PM - 8:00 PM",
    leaderName: "Pastor Sarah Smith",
    leaderContact: "+2349034253688",
    whatsappLink:
      "https://wa.me/2349034253688?text=Hello,%20I%20want%20to%20join%20the%20Youth%20Ministry",
    image: "/DandM1.jpeg",
  },
  {
    id: 3,
    name: "Women’s Ministry",
    description:
      "For easy accessibility of all women of liberty house through visitation and through media.. Easy organisation of all the women for any particular reasons/purpose as concerns to the ministry if need arises. communicating and getting to know them and their families.",
    meetingDay: "Tuesdays",
    time: "10:00 AM - 12:00 PM",
    leaderName: "Mrs. Jane Doe",
    leaderContact: "+23481130469141",
    whatsappLink:
      "https://wa.me/23481130469141?text=Hello,%20I%20want%20to%20join%20the%20Women's%20Ministry",
    image: "/DandM2.jpeg",
  },
  {
    id: 4,
    name: "Men Ministry",
    description:
      "to know every men of liberty House Christian Center and their families deeply and to help them becoming a good fathers.",
    meetingDay: "Saturdays",
    time: "2:00 PM - 5:00 PM",
    leaderName: "Mr. Tech Lead",
    leaderContact: "+2347035062863",
    whatsappLink:
      "https://wa.me/2347035062863?text=Hello,%20I%20want%20to%20join%20the%20Media%20&%20Tech%20Team",
    image: "/DandM6.jpeg",
  },
  {
    id: 5,
    name: "Teenagers Ministry",
    description:
      "To bring together not just the teenager's of liberty house alone but also teenager from other locality as well, giving them a platform to express themselves through music without feeling shy or suppressed by fear.",
    meetingDay: "Last Saturday of Month",
    time: "9:00 AM - 1:00 PM",
    leaderName: "Evangelist Mark",
    leaderContact: "+2347072749650",
    whatsappLink:
      "https://wa.me/2347072749650?text=Hello,%20I%20want%20to%20join%20the%20Outreach%20Ministry",
    image: "/DandM5.jpeg",
  },
  {
    id: 6,
    name: "Prayer Bond",
    description:
      "Liberty House Spiritual Gatekeeper (Prayer Band) was created to build consistent, united, and targeted prayer within the church and beyond. It's basically the special forces of the church prayer life.",
    meetingDay: "Wednesdays",
    time: "10:00 PM - 2:00 AM",
    leaderName: "Mr Uyi",
    leaderContact: "+2347065278962",
    whatsappLink:
      "https://wa.me/2347065278962?text=Hello,%20I%20want%20to%20join%20the%20Prayer%20Bond",
    image: "/DandM4.jpeg",
  },
  {
    id: 7,
    name: "Teaching Ministry",
    description:
      "To help the members of the church get deeper understanding of the word (Bible) and to know what it all entails. Making them to know how to be  a better Father, Mothers, Youths, Teenager's and children according to Biblical expectations of them. Also giving them a platform to ask question that troubles them or giving them major concerns and been able to prove them with answer that will Leave them smiling.",
    meetingDay: "Sundays",
    time: "9:00 AM - 11:30 AM",
    leaderName: "Mrs. Emma",
    leaderContact: "+2348033552118",
    whatsappLink:
      "https://wa.me/2348033552118?text=Hello,%20I%20want%20to%20join%20the%20Children%20Ministry",
    image: "/DandM5.jpeg",
  },
  {
    id: 8,
    name: "Evangelism Ministry",
    description:
      "Dedicated individuals who are passionate about sharing the gospel of Jesus Christ with others. We believe that everyone deserves to hear the good news of salvation and we work tirelessly to spread the message of hope, love, and redemption.",
    time: "9:00 AM - 11:30 AM",
    leaderName: "Mrs. Emma",
    leaderContact: "+2347052269264",
    whatsappLink:
      "https://wa.me/2347052269264?text=Hello,%20I%20want%20to%20join%20the%20Evangelism%20Ministry",
    image: "/DandM.jpeg",
  },
];

const Ministries = () => {
  return (
    <div
      className="overflow-hidden bg-accent pt-22 md:pt-26 pb-16 max-w-8xl mx-auto px-4"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/lhcc10.jpeg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="absolute inset-0 bg-black/20"></div>
      <motion.h1
        initial={{ opacity: 0, y: -100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          ease: "easeOut",
        }}
        viewport={{ once: true }}
        className=" relative z-10 text-3xl md:text-5xl sm:text-4xl font-bold text-white text-center mb-2 font-heading"
      >
        Ministries
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{
          duration: 0.8,
          ease: "easeOut",
        }}
        viewport={{ once: true }}
        className="relative z-10 text-center text-gray-50 max-w-3xl mx-auto mb-6 md:mb-10 sm:mb-8 md:text-xl font-body"
      >
        We believe every member has a place to serve. Explore our ministriesnand
        discover where you can grow, serve, and make impact.
      </motion.p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {ministriesData.map((ministry) => (
          <MinistryCard key={ministry.id} ministry={ministry} />
        ))}
      </div>

      {/* Chat Support Section */}
      <MinistryChatSupport />
    </div>
  );
};

export default Ministries;
