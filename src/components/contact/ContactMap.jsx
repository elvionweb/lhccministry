// src/components/contact/ContactMap.jsx
const ContactMap = () => {
  return (
    
    <div className="w-full h-84 pb-2 rounded-lg overflow-hidden shadow">
      <iframe
        title="Church Location"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2290.5454160131258!2d5.7007834670363104!3d6.380877847662354!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x10472bd4cb576f87%3A0xee6eca29558338da!2sLiberty%20House%20Christian%20Centre!5e0!3m2!1sen!2sng!4v1770369931050!5m2!1sen!2sng"
        className="w-full h-full border-0"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
    
    
  );
};

export default ContactMap;
