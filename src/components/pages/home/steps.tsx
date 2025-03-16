import Step from "@/components/pages/home/step";
import { PrimaryToSecondary2 } from "@/lib";
import { TStep } from "@/types/home";

export default function Steps() {
  const stepsList: TStep[] = [
    {
      index: 1,
      title: "Request a Delivery",
      description: "You book a delivery on your green route dashboard.",
    },
    {
      index: 2,
      title: "We Pick It Up",
      description:
        "A nearby delivery partner picks up your package swiftly and securely.",
    },
    {
      index: 3,
      title: "Track in Real-Time",
      description:
        "Monitor the status of your delivery on your green route dashboard.",
    },
    {
      index: 4,
      title: "Delivered to Your Doorstep",
      description:
        "A trained green route courier would deliver your package directly to your doorstep",
    },
  ];
  return (
    <section className={`w-full max-w-[85%] space-y-10 py-16`}>
      <div>
        <h2 className={`text-lp-secondaryTwo md:text-lg`}>HOW IT WORKS</h2>
        <h1
          className={`w-full text-3xl font-bold sm:text-4xl lg:text-6xl ${PrimaryToSecondary2}`}
        >
          Get started in 4 easy steps
        </h1>
      </div>
      <div className={`flex flex-col gap-8`}>
        {stepsList.map((feature) => (
          <Step
            key={feature.title}
            index={feature.index}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
    </section>
  );
}
