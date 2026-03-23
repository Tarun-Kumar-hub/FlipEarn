import React from "react";

const RocketIcon = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
    {/* SVG Paths */}
  </svg>
);

const CTA = ({
  badge = "Trusted by Millions",
  title = "Sell Your Social Accounts",
  highlight = "with Confidence ",
  description = "We are Leading  social media marketplace that connects brands with thier customers with our user-friendly interface.",
  buttonText = "Get Started Today",
  onClick,
}) => {
  return (
    <div className="max-w-5xl mx-auto px-4">
      <div className="p-px rounded-2xl bg-gradient-to-r from-purple-600/20 to-blue-500/30">
        <div className="flex flex-col items-center justify-center text-center py-12 md:py-16 rounded-[15px] bg-gradient-to-r from-[#F3EAFF] to-[#E1EFFF]">
          <div className="flex items-center justify-center bg-white px-3 py-1.5 shadow gap-1 rounded-full text-xs">
            <RocketIcon />
            <span className="bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent font-medium">
              {badge}
            </span>
          </div>

          <h2 className="text-2xl md:text-4xl font-medium mt-2 leading-[1.2]">
            {title} <br />
            <span className="bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
              {highlight}
            </span>
            & Earn Money
          </h2>

          <p className="text-slate-500 mt-2 max-w-lg max-md:text-sm">
            {description}
          </p>

          <button
            onClick={onClick}
            className="bg-gradient-to-r from-purple-600 to-blue-500 text-white text-sm px-5 py-2.5 rounded-xl font-medium mt-4 hover:scale-105 active:scale-95 transition-all duration-300"
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CTA;
