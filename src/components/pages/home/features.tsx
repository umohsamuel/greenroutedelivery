import Feature from "@/components/pages/home/feature";
import { PrimaryToSecondary2 } from "@/lib";
import { TFeature } from "@/types/home";

export default function Features() {
  const featuresList: TFeature[] = [
    {
      icon: "/lp-icons/cash.svg",
      title: "Delivery Insurance",
      description:
        "All damages and loss incurred during transit would be covered by us.",
    },
    {
      icon: "/lp-icons/bike.svg",
      title: "Fast & Reliable",
      description: "Get your packages delivered on time, every time.",
    },
    {
      icon: "/lp-icons/package.svg",
      title: "Secure Deliveries",
      description: "Your package is handled with care and delivered safely.",
    },
    {
      icon: "/lp-icons/map.svg",
      title: "Real-Time Tracking",
      description: "Stay updated with live tracking and notifications.",
    },
  ];
  return (
    <section className={`w-full max-w-[85%] space-y-10 py-16`}>
      <div>
        <h2 className={`text-lp-secondaryTwo md:text-lg`}>OUR FEATURES</h2>
        <h1
          className={`w-full text-3xl font-bold sm:text-4xl lg:text-6xl ${PrimaryToSecondary2}`}
        >
          Why choose us?
        </h1>
      </div>
      <div className={`grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4`}>
        {featuresList.map((feature) => (
          <Feature
            key={feature.title}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
    </section>
  );
}
