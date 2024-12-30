import React from "react";
import FormCard from "../../components/FormCard";
const backgroundImageStyle = {
  backgroundImage: "url(/path/to/your/image.jpg)",
  backgroundSize: "cover",
  backgroundPosition: "center",
};
export const Home = () => {
  // <div style={backgroundImageStyle}></div>;
  return (
    <>
      <div
        className="min-h-screen flex bg-blue-300 justify-center flex-col"
        style={{
          backgroundImage: "url(../src/assets/svg/Messagingfun-cuate.svg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundBlendMode: "multiply",
        }}
      >
        <div className="justify-self-center">
          <FormCard title="Your space to connect and share. 💬" buttonText="Join Conversation" />
        </div>
        <div className="">
          <p className="text-center mt-3">
            <a href="https://storyset.com/people" className="text-gray-300">
              People illustrations by Storyset
            </a>
          </p>
        </div>
      </div>
    </>
  );
};
