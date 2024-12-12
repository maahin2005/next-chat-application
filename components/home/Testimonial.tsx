import React from "react";
import Image from "next/image";

type Testimonial = {
  quote: string;
  feedback: string;
  name: string;
  position: string;
  image: string;
};

const Testimonials: React.FC = () => {
  const testimonials: Testimonial[] = [
    {
      quote: "Incredible Experience",
      feedback:
        "We had an incredible experience working with Mixland and were impressed they made such a big difference in only three weeks. Our team is so grateful for the wonderful improvements they made and their ability to get familiar with the concept so quickly.",
      name: "Wade Warren",
      position: "CEO, ABC Corporation",
      image: "https://via.placeholder.com/50", // Replace with actual image URL
    },
    {
      quote: "Dependable, Responsive, Professional",
      feedback:
        "Fermin Apps has collaborated with Mixland team for several projects such as Photo Sharing Apps and Custom Social Networking Apps. The experience has been pleasant, professional, and exceeding our expectations. The team is always thinking beyond.",
      name: "Esther Howard",
      position: "CEO, ABC Corporation",
      image: "https://via.placeholder.com/50", // Replace with actual image URL
    },
  ];

  return (
    <div className="bg-gradient-to-r from-contractColor-light to-contractColor-dark text-white p-10 py-16">
      <h2 className="text-center text-5xl font-semibold mb-8 font-kanit">
        Our blessed client said about us{" "}
        <span role="img" aria-label="heart emoji">
          😍
        </span>
      </h2>
      <div className="flex flex-col md:flex-row justify-center gap-8 max-w-5xl mx-auto">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="bg-white text-gray-800 p-6 rounded-lg shadow-lg max-w-md"
          >
            <h3 className="text-xl font-semibold text-orange-500 mb-4">
              &ldquo;{testimonial.quote}&ldquo;
            </h3>
            <p className="mb-6">{testimonial.feedback}</p>
            <div className="flex items-center">
              <Image
                width={20}
                height={20}
                src={testimonial.image}
                alt={testimonial.name}
                className=" rounded-full mr-4"
              />
              <div>
                <h4 className="font-semibold">{testimonial.name}</h4>
                <p className="text-sm text-gray-600">{testimonial.position}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
