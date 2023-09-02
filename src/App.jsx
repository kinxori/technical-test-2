import UserFilter from "./components/UserFilter";
import bgImg from "./assets/kinxori-background-for-assets-template.png";

export default function App() {
  return (
    <section className="relative ">
      <img src={bgImg} className="fixed z-[-1000] w-screen h-screen object-cover " />
      <div className="border-box p-10 flex flex-col gap-5">
        <div className="flex flex-col gap-3 text-justify">
          <h1 className="font-[rubik] font-bold text-[60px] text-left underline">Hey there!</h1>
          <p>
            Welcome, this is my second #technicalTest I've had to complete for a Frontend JR role!
          </p>
          <p>
            The main purpose of this project was to test <b className="italic">Array Methods</b>.
            For this example there was 3 main points to complete:
          </p>
          <ul className="list-disc pl-8">
            <li>Remove repeated contacts</li>
            <li>Sorting contacts by number of calls</li>
            <li>Sorting contacts by call history</li>
          </ul>
        </div>
        <UserFilter />
      </div>
    </section>
  );
}
