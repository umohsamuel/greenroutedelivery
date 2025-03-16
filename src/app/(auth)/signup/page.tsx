import SignupClient from "./signup.client";

export default function Signup() {
  return (
    <div className="flex flex-col gap-9">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl leading-none font-bold lg:text-[40px]">
          Create your Account
        </h1>
        <p className="text-base font-normal text-[#252525] lg:text-lg">
          Kindly fill in the details below to proceed
        </p>
      </div>

      <div className="flex flex-col gap-6">
        <SignupClient />
      </div>
    </div>
  );
}
