import Nav from "@/app/components/nav";
import Hero from "@/app/components/hero";
import Features from "@/app/components/features";
import Steps from "@/app/components/steps";
import Join from "@/app/components/join";
import Footer from "@/app/components/footer";

export default function Home() {
  return (
    <main className={`flex flex-col items-center w-full`}>
      <Nav />
      <Hero />
      <Features />
      <Steps />
      <Join />
      <Footer />
    </main>
  );
}
