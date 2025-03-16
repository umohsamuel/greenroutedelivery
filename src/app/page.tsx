import Nav from "@/components/pages/home/nav";
import Hero from "@/components/pages/home/hero";
import Steps from "@/components/pages/home/steps";
import Join from "@/components/pages/home/join";
import Footer from "@/components/pages/home/footer";
import Features from "@/components/pages/home/features";

export default function Home() {
  return (
    <main className={`flex w-full flex-col items-center`}>
      <Nav />
      <Hero />
      <Features />
      <Steps />
      <Join />
      <Footer />
    </main>
  );
}
