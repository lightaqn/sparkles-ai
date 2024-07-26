"use client";
import React, { useState, useEffect, Suspense, useRef } from "react";
import emailjs from "@emailjs/browser";
import { Canvas } from "@react-three/fiber";
import Robot from "@/models/robot";
import { useAlert } from "@/lib/hooks/useAlert";
import Loader from "@/components/Loader";
import Alert from "@/components/Alert";

type Props = {};

const Contact = (props: Props) => {
  const formRef = useRef<any>();
  const [isLoading, setIsLoading] = useState(false);
  const [currentAnimation, setCurrentAnimation] = useState("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const { alert, showAlert, hideAlert } = useAlert();

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFocus = () => {
    setCurrentAnimation("walk");
  };
  const handleBlur = () => {
    setCurrentAnimation("idle");
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    setCurrentAnimation("run");

    await emailjs
      .send(
        "process.env.EMAILJS_SERVICE_ID",
        "process.env.EMAILJS_TEMPLATE_ID",
        {
          from_name: form.name,
          to_name: "",
          from_email: form.email,
          to_email: "",
          message: form.message,
        },
        "process.env.EMAILJS_PUBLIC_KEY"
      )
      .then(() => {
        setIsLoading(false);
        showAlert({
          show: true,
          text: "Message sent successfully",
          type: "success",
        });

        setTimeout(() => {
          hideAlert({});
          setCurrentAnimation("idle");
          setForm({ name: "", email: "", message: "" });
        }, 3000);
      })
      .catch((error) => {
        setIsLoading(false);
        setCurrentAnimation("idle");
        console.error(error);
        showAlert({
          show: true,
          text: "Message sending failed",
          type: "danger",
        });
      });
  };

  const adjustRobot = () => {
    let scale = [0.2, 0.2, 0.2];
    let position = [0, 0, 0];
    let rotation = [0.7, -Math.PI / 2, 0];

    return [scale, position, rotation];
  };

  const [robotScale, robotPosition, robotRotation] = adjustRobot();

  return (
    <div className="flex flex-col min-h-screen w-full items-center justify-center">
      <div>{alert.show && <Alert {...alert} />}</div>
      <div className="flex h-[50vh] w-[80vw] mt-10 p-10 items-center justify-center">
        <form
          className="w-full h-full flex flex-col space-y-6 items-center justify-center"
          ref={formRef}
          onSubmit={handleSubmit}
        >
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className="inputBox"
            placeholder="...Name"
          />
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className="inputBox"
            placeholder="...Enter your email"
          />
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            onFocus={handleFocus}
            className="inputBox h-56 pt-5"
            rows={5}
            placeholder="...Type your message here"
          ></textarea>
          <button
            disabled={isLoading}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className="h-28 text-4xl w-full bg-gray-800 text-white outline-none border-2 border-gray-500 rounded-2xl px-4 text-center shaddow-lg hover:text-gray-400 hover:transition-transform hover:duration-200 hover:ease-in-out"
          >
            {isLoading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
      <div className="h-[50vh] flex items-center justify-center w-full">
        <Canvas
          className="flex w-full h-full"
          camera={{ position: [0, 0.5, 10], fov: 100, near: 0.1, far: 1000 }}
        >
          <directionalLight intensity={2.5} position={[0, 0, 1]} />
          <ambientLight intensity={0.5} />
          <Suspense fallback={<Loader />}>
            <Robot
              currentAnimation={currentAnimation}
              setCurrentAnimation={setCurrentAnimation}
              position={robotPosition}
              rotation={robotRotation}
              scale={robotScale}
            />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
};

export default Contact;
