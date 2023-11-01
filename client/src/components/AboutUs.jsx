import React from "react";
export default function AboutUs() {
  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">About Us</h1>

      <div className="mb-8">
        <h2 className="text-xl font-bold mb-2">Our Mission</h2>
        <p className="text-gray-700">
          We are on a mission to revolutionize the way teams manage their
          projects. We understand the challenges that come with juggling
          multiple tasks, deadlines, and team members. That is why we have
          created a powerful and intuitive project tracking platform that
          empowers teams to collaborate seamlessly and achieve their goals with
          ease.
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-bold mb-2">Our Vision</h2>
        <p className="text-gray-700">
          We envision a world where every project, no matter the size or
          complexity, can be efficiently managed and completed on time. Our
          platform is designed to bring clarity, transparency, and efficiency to
          the project management process, enabling teams to focus on what they
          do best - creating exceptional work.
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-bold mb-2">What Sets Us Apart</h2>
        <ul className="list-disc pl-4">
          <li className="text-gray-700 mb-2">
            <strong>Cutting-Edge Technology</strong>: We leverage the latest
            advancements in technology to provide you with a robust and reliable
            project tracking experience. Our platform is built with a
            user-centric approach, ensuring an intuitive and user-friendly
            interface.
          </li>
          <li className="text-gray-700 mb-2">
            <strong>Unparalleled Support</strong>: We believe in providing
            exceptional support to our users. Our dedicated team is always ready
            to assist you with any questions or concerns you may have. Your
            success is our priority.
          </li>
        </ul>
        <p>
          If you have any questions or suggestions, please feel free to contact
          us using the information on the Contact Us page.
        </p>
      </div>
      <div>
        <p>
          Our goal is to provide a space for users to showcase their work,
          collaborate with peers, and foster a community of innovation.
        </p>
        <p>
          If you have any questions or suggestions, please feel free to contact
          us using the information on the Contact Us page.
        </p>
      </div>
    </div>
  );
}