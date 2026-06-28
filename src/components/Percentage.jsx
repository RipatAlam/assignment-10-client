import React from "react";

const Percentage = () => {
  return (
    <section className="py-20 text-white bg-gradient-to-r from-gray-950 via-gray-900 to-gray-700 mt-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="text-cyan-400 font-semibold uppercase tracking-wider">
            Our Impact
          </span>

          <h2 className="mt-3 text-4xl md:text-5xl font-bold">
            Empowering Digital Learners Every Day
          </h2>

          <p className="mt-4 text-gray-300 max-w-2xl mx-auto">
            Thousands of learners trust Digital Life Lessons to gain practical
            digital skills, boost confidence, and achieve their goals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white/5 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 text-center hover:border-cyan-400 transition-all duration-300">
            <h3 className="text-5xl font-extrabold text-cyan-400 mb-4">90%</h3>
            <p className="text-gray-300">
              of employers say they are more likely to hire someone with a
              Digital Life Lessons certification.
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 text-center hover:border-cyan-400 transition-all duration-300">
            <h3 className="text-5xl font-extrabold text-cyan-400 mb-4">95%</h3>
            <p className="text-gray-300">
              of students say our courses equipped them with the practical
              skills they need in today's digital world.
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 text-center hover:border-cyan-400 transition-all duration-300">
            <h3 className="text-5xl font-extrabold text-cyan-400 mb-4">98%</h3>
            <p className="text-gray-300">
              of learners would recommend Digital Life Lessons to friends and
              colleagues.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Percentage;
